
using Api.Helpers;

namespace Api.Repositories.Interface
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task<TEntity?> BuscarPorIdAsync(string id);

        Task<IList<TEntity>> ListarAsync(string tipo);

        Task<Paginacao<TEntity>> PaginacaoAsync(int page, int itemsPerPage);

        Task<TEntity> InserirAsync(TEntity dados);

        Task<IList<TEntity>> InserirListaAsync(IList<TEntity> dados);
        // Task<IList<TEntity>> AlterarLista(IList<TEntity> dados);
        Task<TEntity> DesfazerDeleteAsync(string id, TEntity dados);
        Task<TEntity> AtualizarAsync(string id, TEntity dados);

        Task DeletarAsync(string id);
    }
}
