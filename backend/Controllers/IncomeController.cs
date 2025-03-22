using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Reflection;

namespace WebApplication26.Controllers
{
    [Route("api/protected")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly string _connectionString;

        public IncomeController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        [HttpPost("income/")]
        [Authorize]
        public IActionResult GetIncome([FromBody] GetIncomeModel model)
        {
            if (model.Category.Length < 6 && model.Category != string.Empty && model.Category != null)
            { return BadRequest(new { message = "Category is too short!" }); }

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    string username = User.Identity.Name;
                    string query = string.Empty;

                    if (model.Category != string.Empty)
                    {
                        query = $"SELECT Name FROM Category WHERE Username = '{username}' AND Name = '{model.Category}'";

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            var name = command.ExecuteScalar() as string;

                            if (model.Category != name)
                            { return BadRequest(new { message = "Category not exists!" }); }
                        }
                    }

                    query = $"SELECT * FROM Income WHERE Username = '{username}' AND Category = '{model.Category}'";

                    if (model.Category == null || model.Category == string.Empty) query = $"SELECT * FROM Income WHERE Username = '{username}'";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        List<ExpensesModel> data = new List<ExpensesModel>();

                        using (SqlDataReader reader = command.ExecuteReader())
                            while (reader.Read())
                            {
                                data.Add(new ExpensesModel
                                {
                                    Username = reader.GetString(0),
                                    Name = reader.GetString(1),
                                    Costs = reader.GetInt32(2),
                                    Category = reader.GetString(3)
                                });
                            }

                        return Ok(data);
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return BadRequest();
        }

        [HttpPost("income/add")]
        [Authorize]
        public IActionResult AddIncome([FromBody] AddIncomeModel model)
        {
            string username = User.Identity.Name;

            if (username.Length < 6)
            { return BadRequest(new { message = "Username is too short!" }); }

            if (model.Name.Length < 6)
            { return BadRequest(new { message = "Name is too short!" }); }

            if (model.Count == null || model.Count <= 0)
            { return BadRequest(new { message = "Cannot be less then 0 or null!" }); }

            if (model.Category.Length < 6 || model.Category == null)
            { return BadRequest(new { message = "Cannot be less then 6 or null!" }); }

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    string query = $"SELECT Name FROM Category WHERE Username = '{username}' AND Name = '{model.Category}'";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Category != name)
                        { return BadRequest(new { message = "Category not exists!" }); }
                    }

                    query = $"SELECT Name FROM Income WHERE Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Name == name)
                        { return BadRequest(new { message = "Income name exists!" }); }
                    }

                    query = $"INSERT INTO Income(Username, Name, Count, Category) VALUES('{username}', '{model.Name}', '{model.Count}', '{model.Category}')";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return Ok(model);
        }

        [HttpPost("income/remove")]
        [Authorize]
        public IActionResult RemoveIncome([FromBody] RemoveIncomeModel model)
        {
            string username = User.Identity.Name;

            if (username.Length < 6)
            { return BadRequest(new { message = "Username is too short!" }); }

            if (model.Name.Length < 6)
            { return BadRequest(new { message = "Name is too short!" }); }

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    string query = $"SELECT Name FROM Income WHERE Username = '{username}' AND Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Name != name)
                        { return BadRequest(new { message = "Name not exists!" }); }
                    }

                    query = $"DELETE FROM Income WHERE Username = '{username}' AND Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return Ok(model);
        }

        [HttpPatch("income/update")]
        [Authorize]
        public IActionResult UpdateIncome([FromBody] UpdateIncomeModel model)
        {
            if (model.PrevName.Length < 6)
            { return BadRequest(new { message = "Prev name is too short!" }); }

            if (model.Name.Length < 6)
            { return BadRequest(new { message = "Name is too short!" }); }

            if (model.Count == null || model.Count <= 0)
            { return BadRequest(new { message = "Cannot be less then 0 or null!" }); }

            if (model.Category.Length < 6 || model.Category == null)
            { return BadRequest(new { message = "Cannot be less then 6 or null!" }); }

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    string username = User.Identity.Name;

                    string query = $"SELECT Name FROM Category WHERE Username = '{username}' AND Name = '{model.Category}'";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Category != name)
                        { return BadRequest(new { message = "Category not exists!" }); }
                    }

                    query = $"SELECT Name FROM Income WHERE Username = '{username}' AND Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Name == name)
                        { return BadRequest(new { message = "New name exists!" }); }
                    }

                    query = $"SELECT Name FROM Income WHERE Username = '{username}' AND Name = '{model.PrevName}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.PrevName != name)
                        { return BadRequest(new { message = "Name not exists!" }); }
                    }

                    query = $"UPDATE Income SET Name = '{model.Name}', Count = '{model.Count}', Category = '{model.Category}' WHERE Name = '{model.PrevName}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return Ok(model);
        }

        //? Models
        public class IncomeModel
        {
            public string Username { get; set; }
            public string Name { get; set; }
            public int Count { get; set; }
        }

        public class GetIncomeModel
        {
            public string? Category { get; set; } = string.Empty;
        }

        public class AddIncomeModel
        {
            public string Name { get; set; }
            public int Count { get; set; }
            public string? Category { get; set; } = string.Empty;
        }

        public class RemoveIncomeModel
        {
            public string Name { get; set; }
        }

        public class UpdateIncomeModel
        {
            public string PrevName { get; set; }
            public string Name { get; set; }
            public int Count { get; set; }
            public string? Category { get; set; } = string.Empty;
        }
    }
}
