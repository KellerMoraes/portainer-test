using Api.Database.Entities;
using Api.Helpers;
using Api.Repositories.Interface;
using MongoDB.Driver;

namespace Api.Repositories.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : Pagina
    {
        protected readonly IMongoCollection<TEntity> _collection;
        public BaseRepository(IMongoDatabase database, string collectionName)
        {
            _collection = database.GetCollection<TEntity>(collectionName);
        }
        public async Task<TEntity?> BuscarPorIdAsync(string id)
        {
            var filter = Builders<TEntity>.Filter.Eq(x => x.Id, id);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<IList<TEntity>> ListarAsync(string tipo)
        {

            var builder = Builders<TEntity>.Filter;
            var filter = builder.Eq(x => x.Exclusao, null) &
             (string.IsNullOrEmpty(tipo)
                 ? builder.Empty
                 : builder.Eq("tipo", tipo));

            return await _collection.Find(filter).ToListAsync();
        }

        public async Task<Paginacao<TEntity>> PaginacaoAsync(int page, int itemsPerPage)
        {
            var skip = (page - 1) * itemsPerPage;
            var query = _collection.Find(Builders<TEntity>.Filter.Empty);

            var total = await query.CountDocumentsAsync();
            var itens = await query.Skip(skip).Limit(itemsPerPage).ToListAsync();

            return new Paginacao<TEntity>(itens, (int)total, itemsPerPage, page);
        }

        public async Task<TEntity> InserirAsync(TEntity dados)
        {
            await _collection.InsertOneAsync(dados);
            return dados;
        }

        public async Task<IList<TEntity>> InserirListaAsync(IList<TEntity> dados)
        {
            await _collection.InsertManyAsync(dados);
            return dados;
        }

        public async Task<TEntity> AtualizarAsync(string id, TEntity dados)
        {
            var filter = Builders<TEntity>.Filter.Eq(x => x.Id, id);
            await _collection.ReplaceOneAsync(filter, dados);
            return dados;
        }
        public async Task<TEntity> DesfazerDeleteAsync(string id, TEntity dados)
        {
            var filter = Builders<TEntity>.Filter.Eq(x => x.Id, id);
            var update = Builders<TEntity>.Update.Set(x => x.Exclusao, null);
            await _collection.UpdateOneAsync(filter, update);
            return dados;
        }

        public async Task DeletarAsync(string id)
        {
            var filter = Builders<TEntity>.Filter.Eq(x => x.Id, id);
            var update = Builders<TEntity>.Update.Set(x => x.Exclusao, DateTime.UtcNow);
            await _collection.UpdateOneAsync(filter, update);
        }

    }
}