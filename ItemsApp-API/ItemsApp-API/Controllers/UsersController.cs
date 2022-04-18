using ItemsApp_API.Data;
using ItemsApp_API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ItemsApp_API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly ItemsAppDbContext _dbContext;

        public UsersController(ItemsAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _dbContext.Users.ToListAsync();

            return users;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x=>x.Id == id);

            if (user is null) return BadRequest("User not found with given id");

            return user;
        }
    }
}
