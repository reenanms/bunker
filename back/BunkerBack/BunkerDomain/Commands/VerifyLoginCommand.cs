using MediatR;

namespace BunkerDomain.Commands
{
    public class VerifyLoginCommand : IRequest<bool>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}