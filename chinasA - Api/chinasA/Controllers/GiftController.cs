using AutoMapper;
using chinasA.BLL;
using chinasA.DAL;
using chinasA.Models;
using chinasA.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace chinasA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GiftController : ControllerBase
    {
        private readonly IGiftService GiftS;
        private readonly IMapper mapper;
        private readonly IWebHostEnvironment _env;
        public GiftController(IWebHostEnvironment env, IGiftService GiftS, IMapper mapper)
        {
            this.GiftS = GiftS;
            this.mapper = mapper;
            _env = env;
        }
        [HttpGet("get")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Gift>>> GetAllGifts()
        {
            return await GiftS.GetAllGifts();
        }


        [HttpGet("getbydonatorN/{D}")]
        [AllowAnonymous]
        public async Task<List<Gift>> GetGiftByDonator(string D)
        {
            return  await GiftS.GetGiftByDonator(D);
        }
        [HttpGet("getbyname/{name}")]
        [AllowAnonymous]
        public async Task<ActionResult<Gift>> GetGiftByName(string name)
        {
            return await GiftS.GetGiftByName(name);
        }
        [HttpGet("getbycostumer")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<List<Gift>>> GetGiftByNumOfCostumers(int NumOfCostumers)
        {
            return await GiftS.GetGiftByNumOfCostumers(NumOfCostumers);
        }
        [HttpGet("getDonatorOfGift")]
        [AllowAnonymous]
        public async Task<ActionResult<Donator>> GetDonatorOfGift(GiftDto g)
        {
            return await GiftS.GetDonatorOfGift(g);
        }


        [HttpGet("{image}")]
        [AllowAnonymous]
        public IActionResult GetImage(string image)
        {
            if (image == null)
            {
                return NotFound();
            }

            var imagePath = $"wwwroot/images/{image}";

            if (System.IO.File.Exists(imagePath))
            {
                var imageBytes = System.IO.File.ReadAllBytes(imagePath);
                return File(imageBytes, "image/jpeg"); // You can adjust the content type based on the image type
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("Add")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Gift>> AddGift([FromForm] GiftWithImgDTO GiftToAdd)
        {
            var imageRecord = new GiftDto();
            var file = GiftToAdd.ImageFile;
            if (file != null && file.Length > 0)
            {
                // Generate a unique filename
                var fileName = Path.GetFileNameWithoutExtension(file.FileName);
                var extension = Path.GetExtension(file.FileName);
                var newFileName = $"{fileName}_{Guid.NewGuid()}{extension}";

                // Get the path to the wwwroot/images directory
                var filePath = Path.Combine(_env.WebRootPath, "images", newFileName);

                // Ensure the directory exists
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Save the filename in the database
                imageRecord = new GiftDto
                {
                    gift = GiftToAdd.gift,
                    DonatorId = GiftToAdd.DonatorId,
                    CategoryId = GiftToAdd.CategoryId,
                    WinnerId = GiftToAdd.WinnerId,
                    numOfPurchases = GiftToAdd.numOfPurchases,
                    ImageFile = newFileName,
                    price = GiftToAdd.price
                };
            }
            Gift gift = mapper.Map<Gift>(imageRecord);
            return await GiftS.AddGift(gift);
        }
        [HttpPut("Update")]
        [Authorize(Roles = "Admin")]

        public async Task UpdateGift( int id, GiftDto GiftToUpdate )
        {

            
            Gift gift = mapper.Map<Gift>(GiftToUpdate);
            //Gift Giftt = mapper.Map<Gift>(g);          
            await GiftS.UpdateGift(id,gift);
        }
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]

        public async Task DeleteGift(int id)
        {
            await GiftS.DeleteGift(id);
        }
        [HttpGet("drawWinner/{giftid}")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Costumer>> DrawWinner(int giftid)
        {
            return await GiftS.DrawWinner(giftid);
        }
        [HttpGet("drawWinnerCostumer")]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<Costumer>> DrawWinnername(WinnerDto w)
        {
            Winner win = mapper.Map<Winner>(w);
            return await GiftS.DrawWinnerName(win);
        }
    }
}
