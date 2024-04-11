using BunkerBack.Configurations;
using BunkerDatabase;
using BunkerDomain;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Injeta as variáveis do appsettings selecionado na pipeline
builder.Configuration.AddEnvironmentVariables();
builder.Host.ConfigureAppConfiguration((env, config) =>
{
    config
    .SetBasePath(env.HostingEnvironment.ContentRootPath)
    .AddJsonFile($"appsettings.{env.HostingEnvironment.EnvironmentName}.json",
    optional: true,
    reloadOnChange: true)
    .AddEnvironmentVariables();
});

// Extensão de ILoggerFactory para adicionar o registrador Airbrake
builder.Logging.
    ClearProviders().
    AddConsole();

builder.Services.AddCors(c =>
    c.AddPolicy(builder.Configuration.GetValue<string>("CORS_POLICY_NAME"), builder =>
{
    builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

builder.Services.AddHttpContextAccessor();
builder.Services.AddLocalization();
builder.Services.AddControllers();

// Formata dados de resposta na API para System.Text.Json
builder.Services
    .AddControllers()
    .ConfigureApiBehaviorOptions(opt => opt.ConfigureModelStateErrorResponse())
    .AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    options.JsonSerializerOptions.MaxDepth = 64;
});

// Dependency Injection Bootstrapper
builder.Services.AddDomainBootstrapper();
builder.Services.AddInfrastructureBootstrapper(builder.Configuration);

builder.AddMediatRConfiguration();

// Endpoints Configuration
builder.Services.AddEndpointsApiExplorer();

// Swagger Configuration
builder.AddSwaggerConfiguration();

var app = builder.Build();

// Emite mensagens sensíveis do Identity para fins de log (remover em produção)
//IdentityModelEventSource.ShowPII = true;

// Força qualquer requisição a trabalhar com protocolo TLS 1.2
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

app.UseCors(builder.Configuration.GetValue<string>("CORS_POLICY_NAME"));

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI(s =>
{
    s.SwaggerEndpoint("/swagger/v1.0/swagger.json", "GClaims CRMIntegration API v1");
    //s.DefaultModelsExpandDepth(-1);
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();

/// <summary>
/// Usado nos testes.
/// </summary>
public partial class Program
{
    protected Program() { }
}