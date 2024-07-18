using AutoMapper;
using chinasA.BLL;
using chinasA.Models;
using Microsoft.AspNetCore.Mvc;

namespace chinasA.Controllers
{
        [ApiController]
        [Route("[controller]")]
    public class WinnerController:ControllerBase
    {             
            private readonly IWinnerService winnerS;
            private readonly IMapper mapper;

            public WinnerController(IWinnerService WS, IMapper mapper)
            {
                this.winnerS = WS;
                this.mapper = mapper;
            }
            [HttpGet("get")]
            public async Task<ActionResult<List<Winner>>> GetAllWinners()
            {
                return await winnerS.getAllWinners();
            }
        }
}
