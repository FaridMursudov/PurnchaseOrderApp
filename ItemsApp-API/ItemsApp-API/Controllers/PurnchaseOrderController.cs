using ItemsApp_API.Data;
using ItemsApp_API.Dtos;
using ItemsApp_API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ItemsApp_API.Controllers
{
    [Authorize]
    public class PurnchaseOrderController : BaseApiController
    {
        private readonly ItemsAppDbContext _dbContext;

        public PurnchaseOrderController(ItemsAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<PurnchaseOrderDto>>> GetAllPurnchaseOrders()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var allPurnchaseOrderItems = await (from order in _dbContext.PurnchaseOrders.Include(x => x.PurnchaseOrderItems)
                                                join user in _dbContext.Users
                                                on order.SupmitterUser equals user.Id into usersLeftJoin
                                                from user in usersLeftJoin.DefaultIfEmpty()
                                                select new PurnchaseOrderDto
                                                {
                                                    Id = order.Id,
                                                    Name = order.Name,
                                                    OrderStatus = order.OrderStatus,
                                                    CreationDate = order.CreationDate,
                                                    TotalPrice = order.TotalPrice,
                                                    SubmittedBy = user == null ? null : user.UserName
                                                }).ToListAsync();

            return allPurnchaseOrderItems;
        }

        [HttpPost]
        public async Task<ActionResult<PurnchaseOrderDto>> SubmitPurnchaseOrder(SubmitPurnchaseOrderInput input)
        {
            var orderEntity = await _dbContext.PurnchaseOrders.FirstOrDefaultAsync(x => x.Id == input.Id);

            if (orderEntity is null)
            {
                return BadRequest("Invalid Order Id");
            }

            var userName = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == userName);

            if (user is null)
            {
                return Unauthorized();
            }

            orderEntity.SupmitterUser = user.Id;
            orderEntity.OrderStatus = OrderStatus.SUBMITTED;
            orderEntity.SubmittedDate = DateTime.Now;

            await _dbContext.SaveChangesAsync();

            return new PurnchaseOrderDto
            {
                Id = orderEntity.Id,
                CreationDate = orderEntity.CreationDate,
                OrderStatus = orderEntity.OrderStatus,
                Name = orderEntity.Name,
                SubmittedBy = user.UserName,
                TotalPrice = orderEntity.TotalPrice
            };
        }

        [HttpPost("CreatePurnchaseOrder")]
        public async Task<ActionResult<int>> CreatePurnchaseOrder(CreatePurnchaseOrderInput input)
        {
            var purnchaseOrder = new PurnchaseOrder
            {
                Name = input.Name,
                OrderStatus = OrderStatus.DRAFT,
                CreationDate = DateTime.Now,
                PurnchaseOrderItems = input.OrderItems.Select(x => new PurnchaseOrderItem
                {
                    Name = x.Name,
                    Price = x.Price
                }).ToList()
            };

            await _dbContext.PurnchaseOrders.AddAsync(purnchaseOrder);

            return await _dbContext.SaveChangesAsync();
        }
    }
}
