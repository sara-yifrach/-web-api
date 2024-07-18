using AutoMapper;
using chinasA.BLL;
using chinasA.DAL;
using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.VisualStudio.Services.Notifications.VssNotificationEvent;

namespace chinasA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseService PurchaseS;
        private readonly IMapper mapper;

        public PurchaseController(IPurchaseService PurchaseS, IMapper mapper)
        {
            this.PurchaseS = PurchaseS;
            this.mapper = mapper;
        }

        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Purchase>>> GetAllPurchase()
        {
            return await PurchaseS.GetAllPurchases();
        }
        [HttpGet("getById/{id}")]
        [AllowAnonymous]

        public async Task<ActionResult<List<Purchase>>> GetPurchasesByCostumer(int id)
        {
            return await PurchaseS.GetPurchasesByCostumer(id);
        }
        [HttpGet("GetCardsByPId/{Pid}")]
        [AllowAnonymous]


        public async Task<List<Card>> GetCardsOfPurchase(int Pid)
        {
            return await PurchaseS.GetCardsOfPurchase(Pid);
        }
        [HttpGet("GetExistPurchase/{Cid}")]
        [AllowAnonymous]
        public async Task<Purchase> GetExistPurchase(int Cid)
        {
            return await PurchaseS.GetExistPurchase(Cid);
        }
        [HttpPut("changeStatus/{id}")]
        [AllowAnonymous]
        public async Task<Purchase> changeStatus(int id)
        {
            return await PurchaseS.changeStatus(id);
        }
        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<ActionResult<Purchase>> AddPurchase(PurchaseDto PurchaseToAdd)
        {
            Purchase p = mapper.Map<Purchase>(PurchaseToAdd);   
            return await PurchaseS.AddPurchase(p);
        }
        
    }
}
