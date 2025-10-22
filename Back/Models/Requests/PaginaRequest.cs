using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Api.Database.Entities;
using MongoDB.Bson.Serialization;
using MongoDB.Bson;

namespace Api.Models.Requests
{
    public class PaginaRequest : Base
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório")]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O campo Caminho é obrigatório")]
        [RegularExpression(@"^[a-z0-9\-]+$")]
        public string Caminho { get; set; } = string.Empty;

        public string Tipo { get; set; } = string.Empty;

        public List<object>? Conteudo { get; set; }
        public Dictionary<string, object>? Configuracao { get; set; }

        public bool Publicado { get; set; } = false;
        public DateTime? Inicial { get; set; }
        public DateTime? Final { get; set; }

        public Pagina ToEntity()
        {
            var pagina = new Pagina
            {
                Nome = Nome,
                Caminho = Caminho,
                Tipo = Tipo,
                Conteudo = Conteudo != null
                    ? new BsonArray(Conteudo.Select(c => BsonDocument.Parse(JsonSerializer.Serialize(c))))
                    : new BsonArray(),
                Configuracao = Configuracao != null
                    ? BsonDocument.Parse(JsonSerializer.Serialize(Configuracao))
                    : new BsonDocument(),
                Publicado = Publicado,
                Inicial = Inicial ?? DateTime.UtcNow,
                Final = Final
            };

            // 🧠 Gera o texto concatenado do conteúdo
            pagina.TextoIndexado = IndexacaoHelper.ExtrairTexto(pagina.Conteudo);

            return pagina;
        }
    }
}