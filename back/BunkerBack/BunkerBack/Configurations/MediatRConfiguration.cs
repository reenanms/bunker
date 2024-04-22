using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;

namespace BunkerBack.Configurations
{
    public static class MediatRConfiguration
    {
        public static WebApplicationBuilder AddMediatRConfiguration(this WebApplicationBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));

            builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));

            var assembly = AppDomain.CurrentDomain.Load("BunkerDomain");
            AssemblyScanner
            .FindValidatorsInAssembly(assembly)
                .ForEach(result => builder.Services.AddScoped(result.InterfaceType, result.ValidatorType));

            return builder;
        }
    }
}