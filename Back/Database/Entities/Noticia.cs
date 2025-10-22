
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Api.Database.Entities
{
    public class Noticia : Pagina
    {
        [BsonElement("tags")]
        public List<string> Tags { get; set; } = new List<string>();

        [BsonElement("destaque")]
        public bool Destaque { get; set; }

    }
}