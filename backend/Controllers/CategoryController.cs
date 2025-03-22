using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace WebApplication26.Controllers
{
    [Route("api/protected")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly string _connectionString;

        public CategoryController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        [HttpGet("category/")]
        [Authorize]
        public IActionResult GetCategory()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    string username = User.Identity.Name;

                    string query = $"SELECT * FROM Category WHERE Username = '{username}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        List<CategoryModel> data = new List<CategoryModel>();

                        using (SqlDataReader reader = command.ExecuteReader())
                            while (reader.Read())
                            {
                                data.Add(new CategoryModel
                                {
                                    Username = reader.GetString(0),
                                    Name = reader.GetString(1)
                                });
                            }

                        return Ok(data);
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return BadRequest();
        }

        [HttpPost("category/add")]
        [Authorize]
        public IActionResult AddCategory([FromBody] AddCategoryModel model)
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

                    string query = $"SELECT Name FROM Category WHERE Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Name == name)
                        { return BadRequest(new { message = "Category name exists!" }); }
                    }

                    query = $"INSERT INTO Category(Username, Name) VALUES('{username}', '{model.Name}')";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return Ok(model);
        }

        [HttpPost("category/remove")]
        [Authorize]
        public IActionResult RemoveCategory([FromBody] RemoveCategoryModel model)
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

                    string query = $"SELECT Name FROM Category WHERE Username = '{username}' AND Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Name != name)
                        { return BadRequest(new { message = "Name not exists!" }); }
                    }

                    query = $"DELETE FROM Category WHERE Username = '{username}' AND Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception e) { Console.WriteLine(e.Message); }

            return Ok(model);
        }

        [HttpPatch("category/update")]
        [Authorize]
        public IActionResult UpdateCategory([FromBody] UpdateCategoryModel model)
        {
            if (model.PrevName.Length < 6)
            { return BadRequest(new { message = "Prev name is too short!" }); }

            if (model.Name.Length < 6)
            { return BadRequest(new { message = "Name is too short!" }); }

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    string username = User.Identity.Name;

                    string query = $"SELECT Name FROM Category WHERE Username = '{username}' AND Name = '{model.Name}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.Name == name)
                        { return BadRequest(new { message = "New name exists!" }); }
                    }

                    query = $"SELECT Name FROM Category WHERE Username = '{username}' AND Name = '{model.PrevName}'";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        var name = command.ExecuteScalar() as string;

                        if (model.PrevName != name)
                        { return BadRequest(new { message = "Name not exists!" }); }
                    }

                    query = $"UPDATE Category SET Name = '{model.Name}' WHERE Name = '{model.PrevName}'";
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
        public class CategoryModel
        {
            public string Username { get; set; }
            public string Name { get; set; }
        }

        public class AddCategoryModel
        {
            public string Name { get; set; }
        }

        public class RemoveCategoryModel
        {
            public string Name { get; set; }
        }

        public class UpdateCategoryModel
        {
            public string PrevName { get; set; }
            public string Name { get; set; }
        }
    }
}
