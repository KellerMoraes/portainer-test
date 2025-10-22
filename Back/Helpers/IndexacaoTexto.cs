using System.Text;
using MongoDB.Bson;

public static class IndexacaoHelper
{
    public static string ExtrairTexto(BsonValue? conteudo)
    {
        if (conteudo == null || conteudo.IsBsonNull)
            return string.Empty;

        var textos = new List<string>();

        void Extrair(BsonValue node)
        {
            if (node == null || node.IsBsonNull)
                return;

            if (node.IsBsonDocument)
            {
                var doc = node.AsBsonDocument;

                // Se for um componente com "conteudo" tiptap
                if (doc.Contains("conteudo") && doc["conteudo"].IsBsonDocument)
                    ExtrairConteudoTipTap(doc["conteudo"]);

                // Se tiver filhos, percorre
                if (doc.Contains("filhos") && doc["filhos"].IsBsonArray)
                {
                    foreach (var filho in doc["filhos"].AsBsonArray)
                        Extrair(filho);
                }
            }
            else if (node.IsBsonArray)
            {
                foreach (var item in node.AsBsonArray)
                    Extrair(item);
            }
        }

        void ExtrairConteudoTipTap(BsonValue tiptapNode)
        {
            if (tiptapNode == null || tiptapNode.IsBsonNull)
                return;

            if (tiptapNode.IsBsonDocument)
            {
                var doc = tiptapNode.AsBsonDocument;

                // texto direto
                if (doc.Contains("text") && doc["text"].IsString)
                    textos.Add(doc["text"].AsString);

                // conteúdo aninhado
                if (doc.Contains("content") && doc["content"].IsBsonArray)
                {
                    bool isParagraphOrHeading = doc.Contains("type") &&
                                                (doc["type"] == "paragraph" || doc["type"] == "heading");

                    if (isParagraphOrHeading)
                    {
                        // Agrupar textos do mesmo bloco
                        var bloco = new StringBuilder();
                        foreach (var child in doc["content"].AsBsonArray)
                            bloco.Append(ExtrairTextoDoNo(child));

                        if (bloco.Length > 0)
                            textos.Add(bloco.ToString());
                    }
                    else
                    {
                        foreach (var child in doc["content"].AsBsonArray)
                            ExtrairConteudoTipTap(child);
                    }
                }
            }
            else if (tiptapNode.IsBsonArray)
            {
                foreach (var item in tiptapNode.AsBsonArray)
                    ExtrairConteudoTipTap(item);
            }
        }

        string ExtrairTextoDoNo(BsonValue node)
        {
            if (node == null || node.IsBsonNull)
                return string.Empty;

            if (node.IsBsonDocument)
            {
                var doc = node.AsBsonDocument;
                var sb = new StringBuilder();

                if (doc.Contains("text") && doc["text"].IsString)
                    sb.Append(doc["text"].AsString);

                if (doc.Contains("content") && doc["content"].IsBsonArray)
                {
                    foreach (var c in doc["content"].AsBsonArray)
                        sb.Append(ExtrairTextoDoNo(c));
                }

                return sb.ToString();
            }
            else if (node.IsBsonArray)
            {
                var sb = new StringBuilder();
                foreach (var c in node.AsBsonArray)
                    sb.Append(ExtrairTextoDoNo(c));
                return sb.ToString();
            }

            return string.Empty;
        }

        // Começa no nível principal da página
        Extrair(conteudo);

        // Junta blocos com espaço entre eles
        return string.Join(" ", textos)
                     .Replace("  ", " ") // normaliza espaços duplos
                     .Trim();
    }
}
