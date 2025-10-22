// public class EditalService
// {
//     private readonly EditalRepository _repo;

//     public EditalService(EditalRepository repo)
//     {
//         _repo = repo;
//     }

//     public async Task<Edital> CriarEditalAsync(string nome, List<string> tags, int? ano = null)
//     {
//         var edital = new Edital
//         {
//             Nome = nome,
//             Tags = tags,
//             Ano = ano ?? DateTime.UtcNow.Year
//         };

//         return await _repo.CriarAsync(edital);
//     }
// }
