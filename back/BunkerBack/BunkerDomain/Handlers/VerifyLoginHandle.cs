using BunkerDatabase.Queries;
using BunkerDomain.Commands;
using MediatR;

namespace BunkerDomain.Handlers
{
    public class VerifyLoginHandle : IRequestHandler<VerifyLoginCommand, bool>
    {
        public Task<bool> Handle(VerifyLoginCommand request, CancellationToken cancellationToken)
        {
            var login = new Login();
            return login.VerifyLogin(request.Email, request.Password);
        }
    }
}
