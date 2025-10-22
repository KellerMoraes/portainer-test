using Api.Database.Entities;
using Api.Models.Requests;
using Api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PaginaController : ControllerBase
{
    private readonly IPaginaService _paginaService;

    public PaginaController(IPaginaService paginaService)
    {
        _paginaService = paginaService;
    }

    [HttpGet("buscar")]
    public async Task<IActionResult> Buscar([FromQuery] string? nome, string? id)
    { //PROBLEMA DE PAGINA REQUEST PARA CONSULTA E PARA CREATE
        var pagina = await _paginaService.Buscar(nome, id);
        if (pagina == null) return NotFound();
        return Ok(pagina);
    }
    [HttpGet("listar")]
    public async Task<IActionResult> Listar(string? termo, string? tipo, int itensPorPagina, int paginaNumero)
    {
        var paginacao = await _paginaService.Listar(termo, tipo, itensPorPagina, paginaNumero);
        return Ok(paginacao);
    }


    [HttpPost]
    public async Task<IActionResult> Criar([FromBody] PaginaRequest paginaRequest)
    {
        var paginaResponse = await _paginaService.Criar(paginaRequest);
        return CreatedAtAction(nameof(Buscar), new { caminho = paginaResponse.Caminho }, paginaResponse);
    }

    [HttpPut("undo/{id}")]
    public async Task<IActionResult> DesfazerDelete(string id)
    {
        var desfeito = await _paginaService.DesfazerDelete(id);
        return Ok(desfeito);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Atualizar(string id, [FromBody] PaginaUpdateRequest updateRequest)
    {

        var atualizada = await _paginaService.Atualizar(id, updateRequest);
        return Ok(atualizada);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Deletar(string id)
    {
        await _paginaService.Deletar(id);
        return NoContent();
    }
}
