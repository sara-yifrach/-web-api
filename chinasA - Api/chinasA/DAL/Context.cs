using chinasA.Models;
using Microsoft.EntityFrameworkCore;

namespace chinasA.DAL
{
    public class Context : DbContext
    {
        public DbSet<Admanistrator> Admanistrators { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Category> Categorys { get; set; }
        public DbSet<Costumer> Costumers { get; set; }
        public DbSet<Gift> Gifts { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<Donator> Donators { get; set; }

        public Context(DbContextOptions<Context> contextOptions) : base(contextOptions)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admanistrator>().Property(c => c.Id).UseIdentityColumn(0, 1);
            modelBuilder.Entity<Card>().Property(c => c.Id).UseIdentityColumn(0, 1);
            modelBuilder.Entity<Category>().Property(c => c.Id).UseIdentityColumn(370, 3);
            modelBuilder.Entity<Costumer>().Property(c => c.Id).UseIdentityColumn(1025, 4);
            modelBuilder.Entity<Gift>().Property(c => c.Id).UseIdentityColumn(4545, 2);
            modelBuilder.Entity<Purchase>().Property(c => c.Id).UseIdentityColumn(71, 1);
            modelBuilder.Entity<Card>()
             .HasOne(c => c.Purchase)
             .WithMany()
             .HasForeignKey(c => c.PurchaseId)
             .OnDelete(DeleteBehavior.NoAction); // Specify ON DELETE NO ACTION here

            modelBuilder.Entity<Card>()
                .HasOne(c => c.Gift)
                .WithMany()
                .HasForeignKey(c => c.GiftId)
                .OnDelete(DeleteBehavior.NoAction); // Specify ON DELETE NO ACTION here

            base.OnModelCreating(modelBuilder);
        }
    }
}
