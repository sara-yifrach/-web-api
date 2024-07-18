using AutoMapper;
using chinasA.BLL;
using chinasA.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.VisualStudio.Services.Notifications.VssNotificationEvent;

namespace chinasA.Controllers
{ 
    [ApiController]
    [Route("[controller]")]
    public class CategoryController:ControllerBase
    {
        private readonly ICategoryService categoryS;
        private readonly IMapper mapper;

        public CategoryController(ICategoryService categoryS, IMapper mapper)
        {
            this.categoryS = categoryS;
            this.mapper = mapper;
        }

        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Category>>> GetAllCategories()
        {
            return await categoryS.GetAllCategories();
        }
        [HttpPost("Add")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Category>> AddCategory(Category CategoryToAdd)
        {
            return await categoryS.AddCategory(CategoryToAdd);
        }
        [HttpPut("Update")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Category>> UpdateCategory(Category CategoryToUpdate, int id)
        {
            return await categoryS.UpdateCategory(CategoryToUpdate, id);
        }
        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            return await categoryS.DeleteCategory(id);
        }

    }
}
