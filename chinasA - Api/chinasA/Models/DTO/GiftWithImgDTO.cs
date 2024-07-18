using NSwag.Annotations;

namespace chinasA.Models.DTO
{
    public class GiftWithImgDTO
    {
        public int DonatorId { get; set; }
        public string gift { get; set; }
        public int CategoryId { get; set; }
        [SwaggerIgnore]
        public int ?WinnerId { get; set; }
        public int numOfPurchases { get; set; }
        public IFormFile ImageFile { get; set; }
        public int price { get; set; }
    }
}

