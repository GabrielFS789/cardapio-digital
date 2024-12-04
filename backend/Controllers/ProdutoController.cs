using backend.AppDbContext;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;




        public ProdutoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Produto>>> GetAllAsync()
        {
            var produtos = await _context.Produto.AsNoTracking().ToListAsync();
            return Ok(produtos);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Produto>> GetByIdAsync(int id)
        {
            var produto = await _context.Produto.FirstOrDefaultAsync(prod => prod.Id == id);
            if (produto is null)
                return NotFound($"Produto com ID :{id} não localizado");
            return Ok(produto);
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> CreateAsync(Produto produto)
        {
            try
            {
                Console.WriteLine(produto);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _context.Produto.AddAsync(produto);
                await _context.SaveChangesAsync();
                return Ok(produto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = ex.InnerException?.Message
                });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Produto>> DeleteAsync(int id)
        {
            var produto = await _context.Produto.FindAsync(id);
            if (produto is null)
                return NotFound("Produto não localizado");

            _context.Produto.Remove(produto);
            await _context.SaveChangesAsync();
            return Ok(produto);
        }

        [HttpDelete("image")]
        public ActionResult<string> DeleteImageAsync(string path)
        {
            // Verifique se o path está vazio ou nulo
            if (string.IsNullOrEmpty(path))
            {
                return BadRequest("O caminho da imagem não pode estar vazio.");
            }

            try
            {
                // Obtenha o caminho absoluto usando o ContentRootPath

                if (path.StartsWith("/"))
                {
                    path = path.Substring(1);
                }
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path);
                Console.WriteLine($"Tentando excluir o arquivo: {imagePath}");

                // Verifique se o arquivo existe
                if (!System.IO.File.Exists(imagePath))
                {
                    return NotFound("Imagem não encontrada no sistema de arquivos.");
                }

                // Exclua o arquivo
                System.IO.File.Delete(imagePath);

                // Retorne uma resposta de sucesso
                return Ok("Imagem excluída com sucesso.");
            }
            catch (Exception ex)
            {
                // Se ocorrer algum erro, retorne uma resposta de erro
                return StatusCode(500, $"Erro ao excluir imagem: {ex.Message}");
            }
        }

        [HttpPost("image")]
        public async Task<ActionResult> UpImg(IFormFile imagem)
        {
            if (imagem == null || imagem.Length == 0)
            {
                throw new NullReferenceException("Nenhuma imagem enviada.");
            }

            // Verifique se WebRootPath está configurado corretamente

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagens");

            // Verifique se o diretório de uploads existe, caso contrário, cria
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Gera um nome único para a imagem
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imagem.FileName);
            if (string.IsNullOrEmpty(fileName))
            {
                throw new InvalidOperationException("O nome do arquivo não pode ser nulo ou vazio.");
            }

            var filePath = Path.Combine(uploadsFolder, fileName);

            // Salva a imagem no diretório
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imagem.CopyToAsync(stream);
            }

            // Cria a URL relativa para a imagem
            var imageUrl = $"/imagens/{fileName}";



            // Retorna a URL da imagem salva
            return Ok(new { imageUrl });
        }

    }
}
