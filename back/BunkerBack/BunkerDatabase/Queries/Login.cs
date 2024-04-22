using BunkerDatabase.InterfacesQueries;
using BunkerDatabase.Models;
using BunkerDatabase.Repositories;
using Dapper;
using Npgsql;

namespace BunkerDatabase.Queries
{
    public class Login : ILogin
    {
        private readonly NpgsqlConnection connection;

        public Login()
        {
            var databaseConnector = new DatabaseConnectorBase();
            connection = databaseConnector.Connect();
        }

        public async Task<Users> VerifyLogin(string email, string password)
        {
            var users = await connection.QuerySingleAsync<Users>("SELECT * FROM Users WHERE Email = @email AND password = @password", new { email, password });
            return users;
        }
    }
}
