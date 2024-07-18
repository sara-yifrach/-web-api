//using AutoMapper;
//using chinasA.BLL;
//using chinasA.DAL;
//using chinasA.Models;
//using chinasA.Models.DTO;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using Newtonsoft.Json;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace chinasA.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class CostumerController : ControllerBase
//    {
//        private readonly ICostumerService costumerS;
//        private readonly IMapper mapper;
//        private readonly IConfiguration configuration;

//        public CostumerController(ICostumerService costumerS, IMapper mapper, IConfiguration configuration)
//        {
//            this.costumerS = costumerS;
//            this.mapper = mapper;
//            this.configuration = configuration;
//        }

//        [HttpGet("get")]
//        //[Authorize(Roles = "Manager")]

//        public async Task<ActionResult<List<Costumer>>> GetAllAsync()
//        {
//            return await costumerS.GetAllAsync();
//        }
//        [AllowAnonymous]
//        [HttpGet("getIdByName/{name}")]
//        public async Task<int> GetIdByName(String name)
//        {
//            return await costumerS.GetIdByName(name);
//        }

//        [AllowAnonymous]
//        [HttpPost("post/login")]
//        public async Task<ActionResult> Login(LoginDto loginDto)
//        {
//            //var currentUser = await costumerS.Login(loginDto);
//            //return Ok(currentUser);
//            //var user = await customerService.Login(loginDto);
//            var user = await Authenticate(loginDto);
//            if (user != null)
//            {
//                var token = Generate(user);
//                var jsonToken = JsonConvert.SerializeObject(new { token });
//                return Ok(jsonToken);
//            }
//            else
//                return NotFound("User not found");
//            //return Created($"http://localhost:3000/Customer/{customer.Id}", customerS.Login(loginDto));
//        }
//        //private string Generate(Costumer user)
//        //{
//        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
//        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
//        //    //var role = user.GetType().ToString();
//        //    Claim[] claims;
//        //    claims = new[]
//        //    {
//        //            new Claim("Id",user.Id.ToString()),
//        //            new Claim(ClaimTypes.NameIdentifier,user.Name),
//        //            new Claim(ClaimTypes.Email,user.Email),
//        //            new Claim(ClaimTypes.StreetAddress,user.Address),
//        //            new Claim(ClaimTypes.MobilePhone,user.Phone.ToString()),
//        //            new Claim("IsManager",user.isManager.ToString()),
//        //            new Claim("paymentMethod",user.PaymentMethod)
//        //        };
//        //    //Console.WriteLine(user.Role);
//        //    var token = new JwtSecurityToken(configuration["Jwt:Issuer"],
//        //    configuration["Jwt:Audience"],
//        //    claims,
//        //    expires: DateTime.Now.AddMinutes(15),
//        //    signingCredentials: credentials);
//        //    return new JwtSecurityTokenHandler().WriteToken(token);
//        //}

//        [AllowAnonymous]
//        private async Task<Costumer> Authenticate(LoginDto loginDto)
//        {
//            //var user= await customerService.Login(loginDto);
//            var currentUser = await costumerS.Login(loginDto);
//            return currentUser;
//        }
//        [AllowAnonymous]

//        private string Generate(Costumer user)
//        {
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.UTF8.GetBytes("bd1a1ccf8095037f361a4d351e7c0de65f0776bfc2f478ea8d312c763bb6caca");
//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(new Claim[]
//                {
//                 new Claim(ClaimTypes.Role, user.role),  // Ensure this matches your Costumer class
//                 new Claim("Id", JsonConvert.SerializeObject(user.Id)),
//                new Claim(ClaimTypes.Name, user.Name),
//                new Claim(ClaimTypes.Email, user.Email),
//                new Claim(ClaimTypes.MobilePhone, user.Phone.ToString()),

//                }),
//                Expires = DateTime.UtcNow.AddHours(1),  
//                Issuer = configuration["Jwt:Issuer"],
//                Audience = configuration["Jwt:Audience"],

//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//            };

//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            var tokenString = tokenHandler.WriteToken(token);
//            return tokenString;
//            //        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
//            //        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

//            //        Claim[] claims = new[]
//            //        {
//            //    new Claim("Id", user.Id.ToString()),
//            //    new Claim("Roles", user.Role),
//            //    new Claim(ClaimTypes.Name, user.Name),
//            //    new Claim(ClaimTypes.Email, user.Email),
//            //    new Claim(ClaimTypes.StreetAddress, user.Address),
//            //    new Claim(ClaimTypes.MobilePhone, user.Phone.ToString()),
//            //    new Claim(ClaimTypes.Role, user.Role),  // Ensure this matches your Costumer class
//            //    new Claim("paymentMethod", user.PaymentMethod)
//            //};

//            //        var token = new JwtSecurityToken(configuration["Jwt:Issuer"],
//            //                                        configuration["Jwt:Audience"],
//            //                                        claims,
//            //                                        expires: DateTime.Now.AddMinutes(15),
//            //                                        signingCredentials: credentials);

//            //        return new JwtSecurityTokenHandler().WriteToken(token);
//        }


//       // [Authorize(Roles = "True")]
//        [HttpPost("Add")]
//        public async Task<ActionResult<Costumer>> AddCostumer(CostumerDto CostumerToAdd)
//        {

//            Costumer Costumer = mapper.Map<Costumer>(CostumerToAdd);

//            return Ok(await costumerS.AddCostumerAsync(Costumer));
//        }

//        [Authorize(Roles = "Manager")]
//        [HttpPut("Update")]
//        public async Task<ActionResult<Costumer>> UpdateCostumerAsync( CostumerDto CostumerToUpdate)
//        {
//            Costumer Costumer = mapper.Map<Costumer>(CostumerToUpdate);
//            Costumer c = await costumerS.UpdateCostumerAsync(Costumer);
//            if(c != null)
//            {
//                return Ok(c);
//            }
//            return BadRequest();
//        }

//        [HttpDelete("delete")]
//        public async Task<ActionResult<Costumer>> DeleteCostumerAsync(int id)
//        {
//            Costumer Costumer = await costumerS.DeleteCostumerAsync(id);
//            return Ok(Costumer);
//        }

//    }
//}
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


