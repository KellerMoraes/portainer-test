
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Api.Database.Entities
{
    public class Radio_Tv : Base
    {
        [BsonElement("nome")]
        public string Nome { get; set; } = string.Empty;

        [BsonElement("caminho")]
        public string Caminho { get; set; } = string.Empty;

        [BsonElement("destaque")]
        public bool Destaque { get; set; }
        
        [BsonElement("configuracao")]
        public BsonDocument Configuracao { get; set; } = new BsonDocument();

        [BsonElement("inicial")]
        public DateTime Inicial { get; set; }

        [BsonElement("final")]
        public DateTime Final { get; set; }

    }
}