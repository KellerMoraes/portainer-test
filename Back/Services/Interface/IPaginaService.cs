
using Api.Database.Entities;
using Api.Helpers;
using Api.Models.Requests;
using Api.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
namespace Api.Services.Interface
{
    public interface IPaginaService
    {
        Task<PaginaResponse> Buscar(string? nome, string id);
        public Task<Paginacao<PaginaResponse>> Listar(string? termo, string? tipo, int itensPorPagina, int paginaNumero);
        Task<PaginaResponse> Criar(PaginaRequest request);
        Task<PaginaResponse> Atualizar(string id, PaginaUpdateRequest updateRequest);
        public Task<PaginaResponse> DesfazerDelete(string id);
        Task Deletar(string id);
    }
}
