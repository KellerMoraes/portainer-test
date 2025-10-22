using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Api.Database.Entities
{
    [BsonIgnoreExtraElements]
    public abstract class Base
    {
        [BsonId] // Indica que é o ID do documento
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("proprietario")]
        public string Proprietario { get; set; } = string.Empty;

        [BsonElement("criacao")]
        public DateTime Criacao { get; set; } = DateTime.UtcNow;

        [BsonElement("alteracao")]
        public DateTime? Alteracao { get; set; }

        [BsonElement("exclusao")]
        public DateTime? Exclusao { get; set; }

    }
}
