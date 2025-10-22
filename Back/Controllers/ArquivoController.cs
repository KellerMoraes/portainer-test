using Api.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArquivoController : ControllerBase
    {
        private readonly MinioService _minioService;
        private readonly IConfiguration _config;

        public ArquivoController(MinioService minioService, IConfiguration config)
        {
            _minioService = minioService;
            _config = config;
        }
        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile arquivo)
        {
            if (arquivo == null || arquivo.Length == 0)
                return BadRequest("Nenhum arquivo enviado");


            var url = await _minioService.UploadPublicFileAsync(arquivo);
            return Ok(new { url });
        }
    }
}