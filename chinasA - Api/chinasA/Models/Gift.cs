namespace chinasA.Models
{
    using NSwag.Annotations;
    using System.ComponentModel.DataAnnotations;
    public class Gift
    {
        public int Id { get; set; }
        public int DonatorId { get; set; }
        public Donator Donator { get; set; }
        [SwaggerIgnore]
        public int? WinnerId { get; set; }
        public Costumer? Winner { get; set; }
        public string gift { get; set; }
        public int CategoryId { get; set; }
        public Category category { get; set; }
        public int numOfPurchases { get; set; }
        public int numOfPurchasesForT { get; set; }
        public string ImageFile { get; set; }
        public int price { get; set; }
    }
}
