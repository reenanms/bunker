using BunkerDomain.Commands;
using BunkerDomain.Handlers;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BunkerDomain
{
    public static class Bootstrapper
    {
        public static void AddDomainBootstrapper(this IServiceCollection services)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));

            services.AddScoped<IRequestHandler<VerifyLoginCommand, bool>, VerifyLoginHandle>();
        }
    }
}
