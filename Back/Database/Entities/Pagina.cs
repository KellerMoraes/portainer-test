using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Database.Entities
{
    public class Pagina : Base
    {
        [BsonElement("nome")]
        public string Nome { get; set; } = string.Empty;

        [BsonElement("caminho")]
        public string Caminho { get; set; } = string.Empty;

        [BsonElement("conteudo")]
        public BsonArray Conteudo { get; set; } = new BsonArray();

        [BsonElement("inicial")]
        public DateTime Inicial { get; set; }

        [BsonElement("final")]
        public DateTime? Final { get; set; }

        [BsonElement("publicado")]
        public bool Publicado { get; set; } = false;

        [BsonElement("tipo")]
        public string Tipo { get; set; } = string.Empty;

        [BsonElement("configuracao")]
        public BsonDocument Configuracao { get; set; } = new BsonDocument();
        [BsonElement("textoIndexado")]
        public string TextoIndexado { get; set; } = string.Empty;
    }
}