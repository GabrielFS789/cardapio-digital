namespace backend.Services
{
    public static class UploadImage
    {
        public static async Task<string> UpImg(IFormFile imagem)
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
            return imageUrl;
        }
    }
}
