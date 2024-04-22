using BunkerDatabase.Models;
using MediatR;

namespace BunkerDomain.Commands
{
    public class VerifyLoginCommand : IRequest<Users>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}