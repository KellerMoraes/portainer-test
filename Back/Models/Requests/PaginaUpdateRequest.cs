using System.Text.Json;
using Api.Database.Entities;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;

public class PaginaUpdateRequest
{
    // usado internamente no serviço
    public string? Id { get; set; }

    public string? Nome { get; set; }
    public string? Caminho { get; set; }
    public string? Tipo { get; set; }

    public List<object>? Conteudo { get; set; }
    public Dictionary<string, object>? Configuracao { get; set; }

    public bool? Publicado { get; set; }
    public DateTime? Inicial { get; set; }
    public DateTime? Final { get; set; }
    public DateTime? Exclusao { get; set; }

    public void ApplyToEntity(Pagina pagina)
    {
        if (Nome != null) pagina.Nome = Nome;
        if (Caminho != null) pagina.Caminho = Caminho;
        if (Tipo != null) pagina.Tipo = Tipo;
        if (Conteudo != null)
        {
            pagina.Conteudo = new BsonArray(
                Conteudo.Select(c =>
                {
                    // cada item pode ser um objeto simples ou complexo
                    var json = JsonSerializer.Serialize(c);
                    return BsonSerializer.Deserialize<BsonValue>(json);
                })
            );
            pagina.TextoIndexado = IndexacaoHelper.ExtrairTexto(pagina.Conteudo);
        }
        if (Configuracao != null) pagina.Configuracao = BsonDocument.Parse(JsonSerializer.Serialize(Configuracao));
        if (Publicado.HasValue) pagina.Publicado = Publicado.Value;
        if (Inicial.HasValue) pagina.Inicial = Inicial.Value;
        if (Final.HasValue) pagina.Final = Final.Value;
        if (Exclusao != null)
            pagina.Exclusao = Exclusao;
        else if (Exclusao == null) // mesmo que seja null explicitamente, limpa
            pagina.Exclusao = null;
        pagina.Alteracao = DateTime.UtcNow;
    }
}
