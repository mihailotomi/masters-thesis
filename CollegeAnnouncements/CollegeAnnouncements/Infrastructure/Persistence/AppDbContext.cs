using CollegeAnnouncements.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace CollegeAnnouncements.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    internal static string SchemaName { get; set; } = "announcements";

    public DbSet<Announcement> Announcements { get; set; }
    public DbSet<Document> Documents { get; set; }


    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
    public AppDbContext()
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema(SchemaName);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(modelBuilder);
    }
}

