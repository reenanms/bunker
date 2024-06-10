using Npgsql;

namespace BunkerDatabase.Repositories
{
    public class DatabaseConnectorBase
    {
        private string _connectionString;

        public DatabaseConnectorBase()
        {
            //_connectionString = connectionString;
            _connectionString = "Host=localhost;Database=bunker;Username=postgres;Password=21121980;";
        }

        public NpgsqlConnection Connect()
        {
            try
            {
                // Cria e abre uma conexão com o PostgreSQL
                NpgsqlConnection connection = new NpgsqlConnection(_connectionString);
                connection.Open();
                Console.WriteLine("Conexão bem-sucedida!");
                return connection;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao conectar ao PostgreSQL: {ex.Message}");
                return null;
            }
        }

        public void Disconnect(NpgsqlConnection connection)
        {
            try
            {
                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao desconectar do PostgreSQL: {ex.Message}");
            }
        }
    }
}