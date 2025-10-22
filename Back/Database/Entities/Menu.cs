
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Api.Database.Entities
{
    public class Menu : Base
    {
        [BsonElement("localizacao")]
        public string Localizacao { get; set; } = string.Empty;

        [BsonElement("configuracao")]
        public BsonDocument Configuracao { get; set; } = new BsonDocument();

    }
}