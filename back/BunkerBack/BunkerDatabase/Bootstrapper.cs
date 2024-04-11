using BunkerDatabase.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BunkerDatabase
{
    public static class Bootstrapper
    {
        public static void AddInfrastructureBootstrapper(this IServiceCollection services, IConfiguration configuration)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));

            #region
            services.AddScoped<DatabaseConnectorBase>();
            #endregion
        }
    }
}