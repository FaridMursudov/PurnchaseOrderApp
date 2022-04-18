using ItemsApp_API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ItemsApp_API.Data
{
    public class ItemsAppDbContext : DbContext
    {
        public ItemsAppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<PurnchaseOrderItem> PurnchaseOrderItems { get; set; }
        public DbSet<PurnchaseOrder> PurnchaseOrders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PurnchaseOrder>()
            .HasMany(p => p.PurnchaseOrderItems)
            .WithOne(g => g.PurnchaseOrder).HasForeignKey(s => s.PurnchaseOrderId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
