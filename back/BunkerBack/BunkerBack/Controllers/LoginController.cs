using BunkerDomain.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BunkerBack.Controllers
{
    [Route("api")]
    public class LoginController : Controller
    {
        private readonly IMediator mediator;

        public LoginController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [AllowAnonymous]
        [HttpGet("get-verify")]
        public async Task<IActionResult> VerifyLogin([FromQuery] VerifyLoginCommand command)
        {
            var response = await mediator.Send(command);
            return Ok(response);
        }
    }
}