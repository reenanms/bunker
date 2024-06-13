using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace BunkerBack.Configurations
{
    public static class ModelStateErrorResponseConfiguration
    {
        public static void ConfigureModelStateErrorResponse(this ApiBehaviorOptions options)
        {
            options.InvalidModelStateResponseFactory = (actionContext) =>
            {
                var errors = actionContext.ModelState
                    .SelectMany(entry => entry.Value.Errors)
                    .Select(error => error.ErrorMessage);

                var response = new { Success = false, Data = errors };
                return new BadRequestObjectResult(response);
            };
        }
    }
}