using AutoMapper;
using chinasA.BLL;
using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.VisualStudio.Services.Notifications.VssNotificationEvent;

namespace chinasA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CardController:ControllerBase
    {
        private readonly ICardService cardS;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;
    
        public CardController(ICardService cardS, IMapper mapper)
        {
            this.cardS = cardS;
            this.mapper = mapper;
        }
        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<ActionResult<Card>> GetCardById(int id)
        {
            return await cardS.GetCardById(id);
        }
        [HttpGet("getForGift/{giftid}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<Costumer>>> GetCardsForGifts(int giftid)
        {
            return await cardS.GetCardsForGift(giftid);
        }
        
        [HttpPost("Add")]
        [AllowAnonymous]
        public async Task<ActionResult<Card>> AddCard(CardDto CardToAdd)
        {
            Card c = mapper.Map<Card>(CardToAdd);
            return await cardS.AddCard(c);
        }

        [HttpDelete("delete/{id}")]
        [AllowAnonymous]

        public async Task<ActionResult<Card>> DeleteCard(int id)
        {
            return await cardS.DeleteCard(id);
        }

    }
}
