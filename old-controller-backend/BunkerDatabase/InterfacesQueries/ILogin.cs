using BunkerDatabase.Models;

namespace BunkerDatabase.InterfacesQueries
{
    public interface ILogin
    {
        Task<Users> VerifyLogin(string email, string password);
    }
}
