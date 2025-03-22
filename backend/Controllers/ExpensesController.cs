using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace WebApplication26.Controllers
{
    [Route("api/protected")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly string _connectionString;

        public ExpensesController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        [HttpPost("expenses/")]
        [Authorize]
        public IActionResult GetExpenses([FromBody] GetExpensesModel model)
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

                    query = $"SELECT * FROM Expenses WHERE Username = '{username}' AND Category = '{model.Category}'";

                    if (model.Category == null || model.Category == string.Empty) query = $"SELECT * FROM Expenses WHERE Username = '{username}'";

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

        [HttpPost("expenses/add")]
        [Authorize]
        public IActionResult AddExpenses([FromBody] AddExpensesModel model)
        {
            string username = User.Identity.Name;

            if (username.Length < 6)
            { return BadRequest(new { message = "Username is too short!" }); }

            if (model.Name.Length < 6)
            { return BadRequest(new { message = "Name is too short!" }); }

            if (model.Costs == null || model.Costs <= 0)
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

                    query = $"SELECT Name FROM Expenses WHERE Name = '{model.Name}'";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Name == name)
                        { return BadRequest(new { message = "Expenses name exists!" }); }
                    }

                    query = $"INSERT INTO Expenses(Username, Name, Costs, Category) VALUES('{username}', '{model.Name}', '{model.Costs}', '{model.Category}')";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return Ok(model);
        }

        [HttpPost("expenses/remove")]
        [Authorize]
        public IActionResult RemoveExpenses([FromBody] RemoveExpensesModel model)
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

                    string query = $"SELECT Name FROM Expenses WHERE Username = '{username}' AND Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Name != name)
                        { return BadRequest(new { message = "Name not exists!" }); }
                    }

                    query = $"DELETE FROM Expenses WHERE Username = '{username}' AND Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return Ok(model);
        }

        [HttpPatch("expenses/update")]
        [Authorize]
        public IActionResult UpdateExpenses([FromBody] UpdateExpensesModel model)
        {
            if (model.PrevName.Length < 6)
            { return BadRequest(new { message = "Prev name is too short!" }); }

            if (model.Name.Length < 6)
            { return BadRequest(new { message = "Name is too short!" }); }

            if (model.Costs == null || model.Costs <= 0)
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

                    query = $"SELECT Name FROM Expenses WHERE Username = '{username}' AND Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Name == name)
                        { return BadRequest(new { message = "New name exists!" }); }
                    }

                    query = $"SELECT Name FROM Expenses WHERE Username = '{username}' AND Name = '{model.PrevName}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.PrevName != name)
                        { return BadRequest(new { message = "Name not exists!" }); }
                    }

                    query = $"UPDATE Expenses SET Name = '{model.Name}', Costs = '{model.Costs}', Category = '{model.Category}' WHERE Name = '{model.PrevName}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return Ok(model);
        }
    }

    public class ExpensesModel
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string? Category { get; set; } = string.Empty;
        public int Costs { get; set; }
    }

    public class GetExpensesModel
    {
        public string? Category { get; set; } = string.Empty;
    }

    public class AddExpensesModel
    {
        public string Name { get; set; }
        public int Costs { get; set; }
        public string? Category { get; set; } = string.Empty;
    }

    public class RemoveExpensesModel
    {
        public string Name { get; set; }
    }

    public class UpdateExpensesModel
    {
        public string PrevName { get; set; }
        public string Name { get; set; }
        public string? Category { get; set; } = string.Empty;
        public int Costs { get; set; }
    }
}