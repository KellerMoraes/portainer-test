using Api.Database.Entities;
using Api.Helpers;
using Api.Models.Requests;
using Api.Repositories.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Api.Repositories.Repositories
{

    public class PaginaRepository : BaseRepository<Pagina>, IPaginaRepository
    {
        public PaginaRepository(IMongoDatabase database)
        : base(database, "Paginas") { }

        public async Task<Paginacao<Pagina>> Listar(string? termo, string? tipo, int itensPorPagina, int paginaNumero)
        {
            var builder = Builders<Pagina>.Filter;
            var filters = new List<FilterDefinition<Pagina>>
    {
        builder.Eq(x => x.Exclusao, null)
    };

            if (!string.IsNullOrEmpty(tipo))
                filters.Add(builder.Eq(x => x.Tipo, tipo));

            var filter = builder.And(filters);
            if (!string.IsNullOrEmpty(termo))
            {
                var regex = new BsonRegularExpression(termo, "i");

                // tenta pelo nome primeiro
                var nomeFilter = builder.Regex(x => x.Nome, regex);
                var countNome = await _collection.CountDocumentsAsync(builder.And(filter, nomeFilter));

                if (countNome > 0)
                    filter = builder.And(filter, nomeFilter);
                else
                    filter = builder.And(filter, builder.Regex(x => x.TextoIndexado, regex));
            }
            var total = await _collection.CountDocumentsAsync(filter);

            // Projeção: pega tudo exceto Conteudo
            var itens = await _collection
                .Find(filter)
                .Skip((paginaNumero - 1) * itensPorPagina)
                .Limit(itensPorPagina)
                .Project(p => new Pagina
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Caminho = p.Caminho,
                    Tipo = p.Tipo,
                    Publicado = p.Publicado,
                    Inicial = p.Inicial,
                    Final = p.Final,
                    Configuracao = p.Configuracao,
                    Criacao = p.Criacao,
                    Alteracao = p.Alteracao,
                    // Conteudo NÃO será carregado
                })
                .ToListAsync();

            return new Paginacao<Pagina>(itens, (int)total, itensPorPagina, paginaNumero);
        }

        public async Task<List<string>> ListarCaminhosParecidos(string caminho)
        {
            var filter = Builders<Pagina>.Filter.Regex(
                x => x.Caminho,
                new MongoDB.Bson.BsonRegularExpression(caminho, "i")
            );

            return await _collection.Find(filter)
                                    .Project(x => x.Caminho)
                                    .ToListAsync();
        }

        public async Task<Pagina?> Buscar(string? nome, string? id)
        {
            var builder = Builders<Pagina>.Filter;
            var filters = new List<FilterDefinition<Pagina>>();
            if (!string.IsNullOrEmpty(nome))
                filters.Add(builder.Regex(x => x.Nome, new MongoDB.Bson.BsonRegularExpression(nome, "i")));
            // if(!string.IsNullOrEmpty(paginaRequest.Caminho))
            //     filters.Add(builder.Regex(x => x.Caminho, new MongoDB.Bson.BsonRegularExpression(paginaRequest.Caminho, "i")));
            if (!string.IsNullOrEmpty(id))
                filters.Add(builder.Eq(x => x.Id, id));
            var filter = filters.Any()
                ? builder.And(filters)
                : throw new Exception("Deve ter algum parâmetro.");

            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

    }
}
