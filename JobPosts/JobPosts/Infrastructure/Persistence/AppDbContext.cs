using JobPosts.Entities;
using JobPosts.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace JobPosts.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Company> Companies { get; set; }
    public DbSet<JobPost> JobPosts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new CompanyConfiguration());
        modelBuilder.ApplyConfiguration(new JobPostConfiguration());

        base.OnModelCreating(modelBuilder);
    }
}

