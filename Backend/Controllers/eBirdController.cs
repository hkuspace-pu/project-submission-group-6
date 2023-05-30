using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eBirdApi.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace eBirdApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class eBirdController : ControllerBase
    {
        private readonly eBirdContext _context;

        public eBirdController(eBirdContext context)
        {
            _context = context;
        }

        // GET: api/Trail
        /*
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trail>>> GetTrails()
        {
            return await _context.Trail.FromSql($"EXECUTE dbo.trail_GetAll").ToListAsync();
        }
        */
        [HttpGet("general_user/post")]
        public async Task<ActionResult<IEnumerable<general_user_post>>> GetPosts()
        {
            return await _context.General_user_post
                .FromSql($"EXECUTE dbo.post_GetAll")
                .ToListAsync();
        }

        [HttpGet("general_user/{id}/post")]
        public async Task<ActionResult<IEnumerable<general_user_post>>> GetPostsByUserId(int id)
        {
            return await _context.General_user_post
                .FromSql($"EXECUTE dbo.generalPost_GetAllByUserId {id}")
                .ToListAsync();
        }

        [HttpGet("expert_user/{id}/post")]
        public async Task<ActionResult<IEnumerable<expert_user_post>>> GetExpertPostsByUserId(
            int id
        )
        {
            return await _context.Expert_user_post
                .FromSql($"EXECUTE dbo.expertPost_GetAllByUserId {id}")
                .ToListAsync();
        }

        [HttpGet("general_user/post_file/{id}")]
        public async Task<ActionResult<IEnumerable<general_post_file>>> GetPostsFile(int id)
        {
            return await _context.General_post_file
                .FromSql($"EXECUTE dbo.generalPostFile_GetAllByPostId {id}")
                .ToListAsync();
        }

        [HttpGet("expert_user/post")]
        public async Task<ActionResult<IEnumerable<expert_user_post>>> GetExpertPosts()
        {
            return await _context.Expert_user_post
                .FromSql($"EXECUTE dbo.expertPost_GetAll")
                .ToListAsync();
        }

        [HttpGet("expert_user/post_file/{id}")]
        public async Task<ActionResult<IEnumerable<expert_post_file>>> GetExpertPostsFile(int id)
        {
            return await _context.Expert_post_file
                .FromSql($"EXECUTE dbo.expertPostFile_GetAllByPostId {id}")
                .ToListAsync();
        }

        [HttpGet("expert_user/post_bird/{id}")]
        public async Task<ActionResult<IEnumerable<expert_user_post_birds>>> GetExpertPostsBird(
            int id
        )
        {
            return await _context.Expert_user_post_birds
                .FromSql($"EXECUTE dbo.expertPostBird_GetAllByPostId {id}")
                .ToListAsync();
        }

        [HttpGet("birds/media/{id}")]
        public async Task<FileStreamResult> DownloadBird(string id)
        {
            string path = @"wwwroot/birds/" + id;
            var image = System.IO.File.OpenRead(path);
            return File(image, "image/jpeg");
        }

        [HttpGet("media/{id}")]
        public async Task<FileStreamResult> Download(int id)
        {
            var fileToBe = await _context.General_post_file
                .FromSql($"EXECUTE dbo.media_SelectFileById {id}")
                .ToListAsync();
            string path = @"wwwroot/images/" + fileToBe[0].file_name;
            var image = System.IO.File.OpenRead(path);
            return File(image, fileToBe[0].file_type);
        }

        [HttpGet("expert/media/{id}")]
        public async Task<FileStreamResult> DownloadExpert(int id)
        {
            var fileToBe = await _context.General_post_file
                .FromSql($"EXECUTE dbo.expertMedia_SelectFileById {id}")
                .ToListAsync();
            string path = @"wwwroot/expert/" + fileToBe[0].file_name;
            var image = System.IO.File.OpenRead(path);
            return File(image, fileToBe[0].file_type);
        }

        [HttpGet("birds")]
        public async Task<ActionResult<IEnumerable<Birds>>> GetBirds()
        {
            return await _context.Birds.FromSql($"EXECUTE dbo.birds_GetAll").ToListAsync();
        }

        [HttpPost("birds")]
        public async Task<ActionResult<IEnumerable<Birds>>> PostBirds(
            [FromForm] IFormFile file,
            [FromForm] Birds bird
        )
        {
            string FileName = file.FileName;
            string FileType = file.ContentType;
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + FileName.Replace(' ', '_');
            var filePath = Path.Combine("wwwroot/birds/", uniqueFileName);

            using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }

            var scientific_Name = bird.scientific_Name;
            var common_name = bird.common_name;
            var chinese_name = bird.chinese_name;
            var bird_order = bird.bird_order;
            var family = bird.family;
            var image_id = uniqueFileName;

            var createdBird = await _context.Birds
                .FromSql(
                    $"EXECUTE dbo.birds_insertOne {scientific_Name}, {common_name}, {chinese_name}, {bird_order}, {family}, {image_id}"
                )
                .ToListAsync();
            return new ObjectResult(createdBird) { StatusCode = StatusCodes.Status200OK };
        }

        [HttpPut("birds")]
        public async Task<ActionResult<IEnumerable<Birds>>> PutBirds(
            [FromForm] IFormFile? file,
            [FromForm] Birds bird
        )
        {
            var bird_id = bird.bird_id;
            var scientific_Name = bird.scientific_Name;
            var common_name = bird.common_name;
            var chinese_name = bird.chinese_name;
            var bird_order = bird.bird_order;
            var family = bird.family;
            var image_id = bird.image_id;

            if (file != null)
            {
                string FileName = file.FileName;
                string FileType = file.ContentType;
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + FileName;
                var filePath = Path.Combine("wwwroot/birds/", uniqueFileName);

                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }

                image_id = uniqueFileName;
            }

            var editedBird = await _context.Birds
                .FromSql(
                    $"EXECUTE dbo.birds_UpdateOne {bird_id}, {scientific_Name}, {common_name}, {chinese_name}, {bird_order}, {family}, {image_id}"
                )
                .ToListAsync();

            return new ObjectResult(editedBird) { StatusCode = StatusCodes.Status200OK };
        }

        [HttpDelete("birds/{id}")]
        public async Task<ActionResult<IEnumerable<Birds>>> DeleteBirds(int id)
        {
            var deleted = await _context.Birds
                .FromSql($"EXECUTE dbo.birds_DeleteOne {id}")
                .ToListAsync();
            return new ObjectResult(deleted) { StatusCode = StatusCodes.Status200OK };
        }

        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<UserDetail>>> GetUsers()
        {
            return await _context.User_Detail.FromSql($"EXECUTE dbo.users_GetAll").ToListAsync();
        }

        [HttpPut("expert/post/{id}")]
        public async Task<IActionResult> EditGeneralpost(int id, [FromForm] expert_user_post post)
        {
            try
            {
                var user_id = post.user_id;
                var post_id = id;
                var comment = post.comment;
                var date_time = post.date_time;
                var createAt = post.date_time;
                var lat = post.lat;
                var lng = post.lng;
                var duration = post.duration;
                var distance = post.distance;
                var observation_type = post.observation_type;
                var published = post.published;

                var editedPost = await _context.Expert_user_post
                    .FromSql(
                        $"EXECUTE dbo.expertPost_UpdateOneById {post_id},{user_id},{comment},{date_time},{createAt},{lat},{lng},{duration}, {distance}, {observation_type},{published}"
                    )
                    .ToListAsync();

                return new ObjectResult(editedPost) { StatusCode = StatusCodes.Status200OK };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error!!!!");
                return BadRequest("Error!!!!");
            }
        }

        [HttpDelete("expert/post/{id}")]
        public async Task<IActionResult> DeleteExpertPost(int id)
        {
            try
            {
                var post_id = id;

                var deletePost = await _context.Expert_user_post
                    .FromSql($"EXECUTE dbo.expertPost_deleteOneById {post_id}")
                    .ToListAsync();

                return new ObjectResult(deletePost) { StatusCode = StatusCodes.Status200OK };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error!!!!");
                return BadRequest("Error!!!!");
            }
        }

        [HttpPut("ebird/user")]
        public async Task<IActionResult> EditUser([FromForm] UserDetail user)
        {
            try
            {
                var user_id = user.user_id;
                var first_name = user.first_name;
                var last_name = user.last_name;
                var user_email = user.user_email;

                var editedUser = await _context.User_Detail
                    .FromSql(
                        $"EXECUTE dbo.user_UpdateOne {user_id}, {first_name},{last_name},{user_email}"
                    )
                    .ToListAsync();

                return new ObjectResult(editedUser) { StatusCode = StatusCodes.Status200OK };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error!!!!");
                return BadRequest("Error!!!!");
            }
        }

        [HttpDelete("ebird/user/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            Console.WriteLine(id);
            try
            {
                var user_id = id;

                var editedUser = await _context.User_Detail
                    .FromSql($"EXECUTE dbo.user_DeleteOne {user_id}")
                    .ToListAsync();

                return new ObjectResult(editedUser) { StatusCode = StatusCodes.Status200OK };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error!!!!");
                return BadRequest("Error!!!!");
            }
        }

        [HttpPut("general/post/{id}")]
        public async Task<IActionResult> EditGeneralpost(int id, [FromForm] general_user_post post)
        {
            try
            {
                var post_id = id;
                var bird_id = post.bird_id;
                var user_id = post.user_id;
                var description = post.description;
                var date_time = post.date_time;
                var createAt = post.date_time;
                var lat = post.lat;
                var lng = post.lng;
                var status = post.status;

                var editedPost = await _context.General_user_post
                    .FromSql(
                        $"EXECUTE dbo.generalPost_UpdatedOneById {post_id}, {bird_id},{user_id},{description},{date_time},{createAt},{lat},{lng},{status}"
                    )
                    .ToListAsync();

                return new ObjectResult(editedPost) { StatusCode = StatusCodes.Status200OK };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error!!!!");
                return BadRequest("Error!!!!");
            }
        }

        [HttpDelete("general/post/{id}")]
        public async Task<IActionResult> DeleteGeneralpost(int id)
        {
            try
            {
                var post_id = id;

                var deletePost = await _context.General_user_post
                    .FromSql($"EXECUTE dbo.generalPost_deleteOneById {post_id}")
                    .ToListAsync();

                return new ObjectResult(deletePost) { StatusCode = StatusCodes.Status200OK };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error!!!!");
                return BadRequest("Error!!!!");
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<IEnumerable<UserDetail>>> PostUser(UserRegister userDetail)
        {
            var user_name = userDetail.user_name;
            var first_name = userDetail.first_name;
            var last_name = userDetail.last_name;
            var user_email = userDetail.user_email;
            var user_type = userDetail.user_type;

            string? password = userDetail.user_password;

            // Generate a 128-bit salt using a sequence of
            // cryptographically strong random bytes.
            byte[] salt = RandomNumberGenerator.GetBytes(128 / 8); // divide by 8 to convert bits to bytes
            // Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string hashed = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: password!,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8
                )
            );
            var user_password_salt = Convert.ToBase64String(salt);

            var user_password_hash = hashed;

            var createdUser = await _context.User_Detail
                .FromSql(
                    $"EXECUTE dbo.user_InsertOne {user_name},{first_name},{last_name},{user_email},{user_password_hash},{user_password_salt},{user_type}"
                )
                .ToListAsync();

            return CreatedAtAction("GetPosts", createdUser);
        }

        [HttpPost("login")]
        public async Task<UserDetail> LoginUser(UserLogin loginDetail)
        {
            //var user_email = loginDetail.user_email;
            //var user_password = loginDetail.user_password;

            var user = await _context.User_Detail.FirstOrDefaultAsync(
                x => x.user_email == loginDetail.user_email
            );
            if (user == null)
                throw new Exception("user not found");
            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            //Console.WriteLine(user);
            //byte[] bytes = Encoding.ASCII.GetBytes(user.user_password_salt);

            //Console.WriteLine(Convert.ToBase64String(bytes));

            string hashed = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: loginDetail.user_password!,
                    salt: Convert.FromBase64String(user.user_password_salt),
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8
                )
            );

            //Console.WriteLine(hashed);
            //Debug.Print(hashed);

            if (user.user_password_hash != hashed)
                throw new Exception("wrong password");

            return user;
        }

        [HttpPost("general/post")]
        public async Task<IActionResult> UploadImage(
            [FromForm] List<IFormFile> file,
            [FromForm] general_user_post post
        )
        {
            //DateTime localDate = DateTime.Now;
            try
            {
                var bird_id = post.bird_id;
                var user_id = post.user_id;
                var description = post.description;
                var date_time = post.date_time;
                var createAt = post.date_time;
                var lat = post.lat;
                var lng = post.lng;
                var status = post.status;

                //Console.WriteLine(bird_id);

                var createdPost = await _context.General_user_post
                    .FromSql(
                        $"EXECUTE dbo.generalPost_InsertOne {bird_id},{user_id},{description},{date_time},{createAt},{lat},{lng},{status}"
                    )
                    .ToListAsync();

                foreach (var formFile in file)
                {
                    string FileName = formFile.FileName;
                    string FileType = formFile.ContentType;
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + FileName;
                    var filePath = Path.Combine("wwwroot/images/", uniqueFileName);

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await formFile.CopyToAsync(stream);
                    }

                    await _context.General_post_file
                        .FromSql(
                            $"EXECUTE dbo.generalPostFile_InsertOne {createdPost[0].post_id},{uniqueFileName},{FileType}"
                        )
                        .ToListAsync();
                }

                return new ObjectResult(createdPost) { StatusCode = StatusCodes.Status201Created };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error!!!!");
                return BadRequest("Error!!!!");
            }
        }

        [HttpPost("expert/post_birds")]
        public async Task<IActionResult> CreateExpertPostBird(
            [FromForm] expert_user_post_birds birds
        )
        {
            try
            {
                var post_id = birds.post_id;
                var bird_id = birds.bird_id;
                var number_of_birds = birds.number_of_birds;

                var createdBird = await _context.Expert_user_post_birds
                    .FromSql(
                        $"EXECUTE dbo.expertPostBird_InsertOne {post_id},{bird_id},{number_of_birds}"
                    )
                    .ToListAsync();

                return new ObjectResult(createdBird) { StatusCode = StatusCodes.Status201Created };
            }
            catch (Exception ex)
            {
                return BadRequest("Error!!!!");
            }
        }

        [HttpPut("expert/post_birds")]
        public async Task<IActionResult> UpdateExpertPostBird(
            [FromForm] expert_user_post_birds birds
        )
        {
            try
            {
                var post_id = birds.post_id;
                var bird_id = birds.bird_id;
                var number_of_birds = birds.number_of_birds;

                var editedBird = await _context.Expert_user_post_birds
                    .FromSql(
                        $"EXECUTE dbo.expertPostBird_UpdateOne {post_id},{bird_id},{number_of_birds}"
                    )
                    .ToListAsync();

                return new ObjectResult(editedBird) { StatusCode = StatusCodes.Status200OK };
            }
            catch (Exception ex)
            {
                return BadRequest("Error!!!!");
            }
        }

        [HttpPost("expert/post")]
        public async Task<IActionResult> CreateExpertPost(
            [FromForm] List<IFormFile> file,
            [FromForm] expert_user_post post
        )
        {
            //Console.WriteLine(post.is_publish);
            //DateTime localDate = DateTime.Now;
            try
            {
                Console.WriteLine("12 Not Error!!!!");
                //var bird_id = post.bird_id;
                var user_id = post.user_id;
                var comment = post.comment;
                var date_time = post.date_time;
                var createAt = post.date_time;
                var lat = post.lat;
                var lng = post.lng;
                var duration = post.duration;
                var distance = post.distance;
                var observation_type = post.observation_type;
                var published = post.published;

                //Console.WriteLine(user_id,comment, date_time , createAt, lat, lng, duration, distance, observation_type, is_publish);

                var createdPost = await _context.Expert_user_post
                    .FromSql(
                        $"EXECUTE dbo.expertPost_InsertOne {user_id},{comment},{date_time},{createAt},{lat},{lng},{duration}, {distance}, {observation_type}, {published}"
                    )
                    .ToListAsync();

                foreach (var formFile in file)
                {
                    string FileName = formFile.FileName;
                    string FileType = formFile.ContentType;
                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + FileName;
                    var filePath = Path.Combine("wwwroot/expert/", uniqueFileName);

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await formFile.CopyToAsync(stream);
                    }

                    await _context.Expert_post_file
                        .FromSql(
                            $"EXECUTE dbo.expertPostFile_InsertOne {createdPost[0].post_id},{uniqueFileName},{FileType}"
                        )
                        .ToListAsync();
                }
                Console.WriteLine("Not Error!!!!");
                return new ObjectResult(createdPost) { StatusCode = StatusCodes.Status201Created };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error!!!!");
                return BadRequest("Error!!!!");
            }
        }

        // GET: api/Trail/5
        /*
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Trail>>> GetTrailById(int id, int user_id)
        {
            var user_type = _context.Trail_user.Single(u => u.User_id == user_id);

            if (user_type.Type_id == 2)
            {
                var count = _context.User_trail_view_record
                    .Where(u => u.User_id == user_id)
                    .Where(u => u.Trail_id == id)
                    .Select(x => x.User_id)
                    .Count();

                if (count >= 10)
                {
                    return NoContent();
                }
            }
            
            var trailId = id;
            var trail = await _context.Trail
                .FromSql($"EXECUTE dbo.trail_SelectOneById {trailId}, {user_id}")
                .ToListAsync();

            if (trail == null)
            {
                return NotFound();
            }

            return trail;
        }
        // GET: api/Trail/Location_list

        [HttpGet("Location_list/{id}")]
        public async Task<ActionResult<IEnumerable<Trail_location_list>>> GetTrailLocationById(int id)
        {
            var location_list = await _context.Trail_location_list
                .FromSql($"EXECUTE dbo.trial_GetLocationNameListById {id}")
                .ToListAsync();

            return location_list;
        }

        // PUT: api/Trail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<IEnumerable<Trail>>> PutTrailbyId(int id, Trail trail)
        {
            if (id != trail.Trail_id)
            {
                return NotFound();
            }
            var trail_id = id;
            var name = trail.Trail_name;
            var description = trail.Description;
            var time = trail.Time;
            var length = trail.Length;
            var level = trail.Level;

            var updatedTrail = await _context.Trail
                .FromSql(
                    $"execute dbo.trail_UpdateOneById {trail_id},{name},{description},{length},{time},{level}"
                )
                .ToListAsync();

            if (updatedTrail.Any())
            {
                return updatedTrail;
            }
            else
            {
                return BadRequest();
            }
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Trail>>> PostTrail(int user_id, Trail trail)
        {
            var name = trail.Trail_name;
            var description = trail.Description;
            var time = trail.Time;
            var length = trail.Length;
            var level = trail.Level;

            var createdTrail = await _context.Trail
                .FromSql(
                    $"EXECUTE dbo.trail_InsertOne {name},{description},{length},{time},{level},{user_id}"
                )
                .ToListAsync();
            
            return CreatedAtAction("GetPosts",createdTrail);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Trail>>> DeleteTrailById(int id)
        {
            var trailId = id;
            return await _context.Trail
                .FromSql($"EXECUTE dbo.trail_DeleteOneById {trailId}")
                .ToListAsync();
        }*/
    }
}
