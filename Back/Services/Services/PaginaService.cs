using Api.Database.Entities;
using Api.Helpers;
using Api.Models.Requests;
using Api.Models.Responses;
using Api.Repositories.Interface;
using Api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services.Services
{
    public class PaginaService : IPaginaService
    {
        private readonly IPaginaRepository _paginaRepository;

        public PaginaService(IPaginaRepository paginaRepository)
        {
            _paginaRepository = paginaRepository;
        }

        public async Task<PaginaResponse?> Buscar(string? nome, string? id)
        {

            var pagina = await _paginaRepository.Buscar(nome, id);
            return pagina != null ? PaginaResponse.FromEntity(pagina) : null;
        }

        public async Task<Paginacao<PaginaResponse>> Listar(string? termo, string? tipo, int itensPorPagina, int paginaNumero)
        {
            var paginacaoEntity = await _paginaRepository.Listar(termo, tipo, itensPorPagina, paginaNumero);

            var itensResponse = paginacaoEntity.Itens
                .Select(PaginaResponse.FromEntity)
                .ToList();

            return new Paginacao<PaginaResponse>(
                itensResponse,
                paginacaoEntity.TotalItens,
                paginacaoEntity.ItensPorPagina,
                paginacaoEntity.PaginaAtual
            );
        }

        public async Task<PaginaResponse> Criar(PaginaRequest request)
        {
            var entity = request.ToEntity();
            var inserida = await _paginaRepository.InserirAsync(entity);
            return PaginaResponse.FromEntity(inserida); // agora bate com o tipo
        }

        public async Task<PaginaResponse> Atualizar(string id, PaginaUpdateRequest updateRequest)
        {
            var existente = await _paginaRepository.BuscarPorIdAsync(id);
            if (existente == null)
                throw new Exception("Página não encontrada.");

            updateRequest.ApplyToEntity(existente);

            await _paginaRepository.AtualizarAsync(id, existente);
            return PaginaResponse.FromEntity(existente);
        }

        public async Task Deletar(string id)
        {
            await _paginaRepository.DeletarAsync(id);
        }
        public async Task<PaginaResponse> DesfazerDelete(string id)
        {
            var existente = await _paginaRepository.BuscarPorIdAsync(id) ?? throw new Exception("Página não encontrada.");
            await _paginaRepository.DesfazerDeleteAsync(id, existente);
            return PaginaResponse.FromEntity(existente);
        }
    }
}
