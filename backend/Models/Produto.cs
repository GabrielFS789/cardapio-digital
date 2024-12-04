using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Produto
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Nome do produto é obrigatório")]
        public string Nome { get; set; } = string.Empty;
        [Required(ErrorMessage ="O Preço de venda é obrigatório")]

        //[NotMapped]
        //public IFormFile? Imagem { get; set; }
        public Decimal PrecoVenda { get; set; }
        public string? ImagemUrl{ get; set; }
        public string? UnidadeMedida { get; set; }
    }
}
