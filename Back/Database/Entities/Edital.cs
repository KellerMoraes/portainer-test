
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Api.Database.Entities
{
    public class Edital : Pagina
    {
        [BsonElement("sequencia")]
        public int Sequencia { get; set; }

        [BsonIgnore]
        public string Numero => $"{Sequencia}/{Ano}";

        [BsonElement("ano")]
        public int Ano { get; set; } = DateTime.UtcNow.Year;

        [BsonElement("tags")]
        public List<string> Tags { get; set; } = new List<string>();
    }
}