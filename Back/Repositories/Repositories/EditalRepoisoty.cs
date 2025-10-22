// using Api.Database.Entities;
// using MongoDB.Driver;

// namespace Api.Database.Repositories
// {
//     public class EditalRepository
//     {
//         private readonly IMongoCollection<Edital> _collection;

//         public EditalRepository(IMongoDatabase database)
//         {
//             _collection = database.GetCollection<Edital>("editais");
//         }

//         public async Task<Edital> CriarAsync(Edital edital)
//         {
//             // define ano atual se não foi informado
//             var ano = edital.Ano == 0 ? DateTime.UtcNow.Year : edital.Ano;

//             // busca o último edital do mesmo ano
//             var ultimo = await _collection
//                 .Find(e => e.Ano == ano)
//                 .SortByDescending(e => e.Sequencia)
//                 .FirstOrDefaultAsync();

//             // define a próxima sequência
//             var sequencia = ultimo?.Sequencia + 1 ?? 1;

//             edital.Sequencia = sequencia;
//             edital.Ano = ano;

//             await _collection.InsertOneAsync(edital);

//             return edital;
//         }

//         public async Task<List<Edital>> ListarPorAnoAsync(int ano)
//         {
//             return await _collection
//                 .Find(e => e.Ano == ano)
//                 .SortBy(e => e.Sequencia)
//                 .ToListAsync();
//         }
//     }
// }
