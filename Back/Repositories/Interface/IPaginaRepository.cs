
using Api.Database.Entities;
using Api.Helpers;
using Api.Models.Requests;
using MongoDB.Driver;
namespace Api.Repositories.Interface
{
    public interface IPaginaRepository : IBaseRepository<Pagina>
    {

        // listar todas as paginas da paginacao
        Task<Paginacao<Pagina>> Listar(string? termo, string? tipo, int itensPorPagina, int paginaNumero);

        // evitar conflitos de rotas
        Task<List<string>> ListarCaminhosParecidos(string caminho);

        // buscar pagina em especifico
        Task<Pagina?> Buscar(string? nome, string id);
    }
}
