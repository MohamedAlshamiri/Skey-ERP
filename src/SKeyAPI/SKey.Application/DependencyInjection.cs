using Microsoft.Extensions.DependencyInjection;

namespace SKey.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Register application services, MediatR, validators, etc. here as features are added.
        return services;
    }
}
