using NSwag.Annotations;

namespace chinasA.Models.DTO
{
    public class GiftDto
    {
        public int DonatorId { get; set; }
        public string gift { get; set; }
        public int CategoryId { get; set; }

        [SwaggerIgnore]
        public int ?WinnerId { get; set; }
        public int numOfPurchases { get; set; }
        public string ImageFile { get; set; }
        public int price { get; set; }
    }
}

