
using Api.Database.Entities;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
namespace Api.Models.Responses
{
    public class PaginaResponse
    {
        public string Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Caminho { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty;
        public List<object>? Conteudo { get; set; } = new();
        public Dictionary<string, object> Configuracao { get; set; } = new();
        public bool Publicado { get; set; }
        public DateTime Inicial { get; set; }
        public DateTime? Final { get; set; }
        public DateTime? Criacao { get; set; }
        public DateTime? Alteracao { get; set; }
        public DateTime? Exclusao { get; set; }

        public static PaginaResponse FromEntity(Pagina pagina)
        {
            return new PaginaResponse
            {
                Id = pagina.Id,
                Nome = pagina.Nome,
                Caminho = pagina.Caminho,
                Tipo = pagina.Tipo,
                Conteudo = pagina.Conteudo?
                    .Select(c => BsonTypeMapper.MapToDotNetValue(c))
                    .ToList() ?? new List<object>(),
                Configuracao = pagina.Configuracao?.ToDictionary() ?? new Dictionary<string, object>(),
                Publicado = pagina.Publicado,
                Inicial = pagina.Inicial,
                Final = pagina.Final,
                Criacao = pagina.Criacao,
                Alteracao = pagina.Alteracao,
                Exclusao = pagina.Exclusao
            };
        }
    }
}