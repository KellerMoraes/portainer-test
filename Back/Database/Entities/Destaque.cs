
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Api.Database.Entities
{
    public class Destaque : Base
    {
        [BsonElement("referencia")]
        public string Referencia { get; set; } = string.Empty;

        [BsonElement("link")]
        public string Link { get; set; } = string.Empty;

        [BsonElement("configuracao")]
        public BsonDocument Configuracao { get; set; } = new BsonDocument();

        [BsonElement("inicial")]
        public DateTime Inicial { get; set; }

        [BsonElement("final")]
        public DateTime Final { get; set; }

        [BsonElement("placeholder")]
        public bool Placeholder { get; set; }

    }
}