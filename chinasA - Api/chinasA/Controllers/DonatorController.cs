using AutoMapper;
using chinasA.BLL;
using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace chinasA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DonatorController:ControllerBase
    {
        private readonly IDonatorService DonatorS;
        private readonly IMapper mapper;

        public DonatorController(IDonatorService DonatorS,IMapper mapper)
        {
            this.DonatorS = DonatorS;
            this.mapper = mapper;
        }

        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Donator>>> GetAll()
        {
            return await DonatorS.GetAllDonators();
        }

        [HttpGet("GetDonatorByEmail")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Donator>> GetDonatorByEmail(string Email)
        {
            return await DonatorS.GetDonatorByEmail(Email);
        }
        [HttpGet("GetGiftsOfDonator/{Did}")]
        [Authorize(Roles = "Admin")]


        public async Task<ActionResult<List<Gift>>> GetAllGiftsOfDonator(int Did)
        {
            return await DonatorS.GetAllGiftsOfDonator(Did);
        }
        [HttpGet("GetDonatorByName")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Donator>> GetDonatorByName(string Name)
        {
            return await DonatorS.GetDonatorByEmail(Name);
        }
        [HttpGet("GetDonatorByGift/{giftName}")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Donator>> GetDonatorByGift(string giftName)
        {
            return await DonatorS.GetDonatorByGift(giftName);
        }
        [HttpPost("Add")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Donator>> AddDonator([FromForm] DonatorDto DonatorToAdd)
        {
            Donator Donator = mapper.Map<Donator>(DonatorToAdd);
            Donator d = await DonatorS.AddDonator(Donator);
            if (d != null) return d;
            return BadRequest();
        }
        //[HttpGet("IsValidEmail/{email}")]
        //public bool IsValidEmail(string email)
        //{
        //    return DonatorS.IsValidEmail(email);
        //}
        [HttpPut("update")]
        [Authorize(Roles = "Admin")]

        public async Task<Donator> updateDonator(int id,[FromForm] DonatorDto DonatorToUpdate)
        {
            Donator Donator = mapper.Map<Donator>(DonatorToUpdate);
             return await DonatorS.UpdateDonator(Donator, id);           
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]

        public async Task DeleteDonator(int id)
        {
            //Donator Donator = mapper.Map<Donator>(DonatorToDelete);
            await DonatorS.DeleteDonator(id);
        }
       
        
    }
}
