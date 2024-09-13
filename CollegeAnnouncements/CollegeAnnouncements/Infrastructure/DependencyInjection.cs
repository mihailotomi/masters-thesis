using CollegeAnnouncements.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CollegeAnnouncements.Infrastructure;


public class InfrastructureOptions
{
    public string? ConnectionString { get; set; }
}

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, Action<InfrastructureOptions>? options = null)
    {
        var infrastructureOptions = new InfrastructureOptions();
        if (options != null)
        {
            options(infrastructureOptions);
        }

        if (string.IsNullOrEmpty(infrastructureOptions.ConnectionString))
        {
            throw new ArgumentException("Connection string is required", nameof(options));
        }

        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSnakeCaseNamingConvention();
            options.UseNpgsql(infrastructureOptions.ConnectionString, e =>
            {
                e.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName);
                e.MigrationsHistoryTable("__EFMigrationsHistory", AppDbContext.SchemaName);
            });


        });

        return services;
    }
}
