using Microsoft.OpenApi.Models;
using Microsoft.Extensions.PlatformAbstractions;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.ComponentModel;
using System.Reflection;
using System.IO;
using Microsoft.Extensions.DependencyInjection;
using System;
using Microsoft.AspNetCore.Builder;
using System.Linq;

namespace BunkerBack.Configurations
{
    public static class SwaggerConfiguration
    {
        public static WebApplicationBuilder AddSwaggerConfiguration(this WebApplicationBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));

            builder.Services.AddSwaggerGen(swagger =>
            {
                swagger.CustomSchemaIds((x) =>
                {
                    try
                    {
                        var attribute = x.GetCustomAttributes<DisplayNameAttribute>().SingleOrDefault();
                        return attribute == null ? x.Name : attribute.DisplayName;
                    }
                    catch
                    {
                        return x.Name;
                    }
                });


                //swagger.DocInclusionPredicate((docName, apiDesc) =>
                //{
                //    if (!apiDesc.TryGetMethodInfo(out MethodInfo methodInfo))
                //    {
                //        return false;
                //    }

                //    //IEnumerable<ApiVersion> versions = methodInfo.DeclaringType
                //    //    .GetCustomAttributes(true)
                //    //    .OfType<ApiVersionAttribute>()
                //    //    .SelectMany(a => a.Versions);

                //    return versions.Any(v => $"v{v}" == docName);
                //});

                swagger.SwaggerDoc("v1.0", new OpenApiInfo
                {
                    Version = "v1.0",
                    Title = "GClaims CRMIntegration API",
                    Description = "GClaims CRMIntegration API é uma api para gerencimanto de leads.",
                    TermsOfService = new Uri("https://www.gclaims.com.br/"),
                    Contact = new OpenApiContact
                    {
                        Name = "Suporte",
                        Email = "suporte@gclaims.com.br",
                        Url = new Uri("https://www.gclaims.com.br/")
                    }
                });

                swagger.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme()
                {
                    In = ParameterLocation.Header,
                    Name = "X-Api-Key",
                    Description = "Chave de autenticação para requisições na API - Modelo API Key.",
                    Type = SecuritySchemeType.ApiKey,
                });

                swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });

                swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "ApiKey"
                            }
                        },
                        new string[] { }
                    }
                });

                SetXmlDocumentation(swagger);
            });

            return builder;
        }

        private static void SetXmlDocumentation(SwaggerGenOptions options)
        {
            var xmlDocumentPath = GetXmlDocumentPath();
            var existsXmlDocument = File.Exists(xmlDocumentPath);

            if (existsXmlDocument)
                options.IncludeXmlComments(xmlDocumentPath);
        }

        private static string GetXmlDocumentPath()
        {
            var applicationBasePath = PlatformServices.Default.Application.ApplicationBasePath;
            var applicationName = PlatformServices.Default.Application.ApplicationName;
            return Path.Combine(applicationBasePath, $"{applicationName}.xml");
        }
    }
}
