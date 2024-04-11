namespace BunkerDatabase.InterfacesQueries
{
    public interface ILogin
    {
        Task<bool> VerifyLogin(string email, string password);
    }
}
