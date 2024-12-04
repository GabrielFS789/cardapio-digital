using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.AppDbContext
{
    public class ApplicationDbContext : DbContext
    {


        private readonly IConfiguration _configuration;
        public DbSet<Produto> Produto { get; set; }

        public ApplicationDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("pg"));
        }
    }
}
