using Microsoft.EntityFrameworkCore;

namespace TicketApi.Models
{
    public class TicketApiContext : DbContext
    {
        public TicketApiContext(DbContextOptions<TicketApiContext> options)
            : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketComment> TicketComments { get; set; }
        public DbSet<User> Users { get; set; }
    }
}