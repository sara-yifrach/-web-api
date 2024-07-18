
using AutoMapper;
using chinasA.BLL;
using chinasA.DAL;
using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Microsoft.VisualStudio.Services.Graph.GraphResourceIds;

namespace chinasA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CostumerController : ControllerBase
    {
        private readonly ICostumerService costumerS;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;

        public CostumerController(ICostumerService costumerS, IMapper mapper, IConfiguration configuration)
        {
            this.costumerS = costumerS;
            this.mapper = mapper;
            this.configuration = configuration;
        }

        [HttpGet("get")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<List<Costumer>>> GetAllAsync()
        {
            return await costumerS.GetAllAsync();
        }

        [HttpGet("getIdByName/{name}")]
        [AllowAnonymous]
        public async Task<int> GetIdByName(String name)
        {
            return await costumerS.GetIdByName(name);
        }

        [HttpPost("post/login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var userIsExist = await costumerS.Login(loginDto);
            if (userIsExist == null)
            {
                return NotFound("the user not exist");
            }

            var token = GenerateJwtToken(userIsExist);

            return Ok(token);
        }
        private string GenerateJwtToken(Costumer user)
        {
            if (user == null)
            {
                return null; // או כל מחרוזת אחרת האומרת שלא הצלחתי
            }


            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                 new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                 new Claim(ClaimTypes.Role, user.Roles)
            };
            var token = new JwtSecurityToken(
                 issuer: configuration["Jwt:Issuer"],
                 audience: configuration["Jwt:Audience"],
                 claims: claims,
                 expires: DateTime.Now.AddMinutes(15),
                 signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("Add")]
        [AllowAnonymous]
        public async Task<ActionResult<Costumer>> AddCostumer(CostumerDto CostumerToAdd)
        {

            Costumer Costumer = mapper.Map<Costumer>(CostumerToAdd);

            return Ok(await costumerS.AddCostumerAsync(Costumer));
        }

        [HttpPut("Update")]
        [AllowAnonymous]
        public async Task<ActionResult<Costumer>> UpdateCostumerAsync(CostumerDto CostumerToUpdate)
        {
            Costumer Costumer = mapper.Map<Costumer>(CostumerToUpdate);
            Costumer c = await costumerS.UpdateCostumerAsync(Costumer);
            if (c != null)
            {
                return Ok(c);
            }
            return BadRequest();
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Costumer>> DeleteCostumerAsync(int id)
        {
            Costumer Costumer = await costumerS.DeleteCostumerAsync(id);
            return Ok(Costumer);
        }

    }
}


