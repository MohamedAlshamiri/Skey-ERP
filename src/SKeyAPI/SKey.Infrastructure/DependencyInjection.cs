using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SKey.Persistence;

namespace SKey.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddPersistence(configuration);

        // Register external infrastructure services here (email, file storage, identity, etc.).

        return services;
    }
}
