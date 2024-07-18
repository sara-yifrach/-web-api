namespace chinasA.Models
{
    public class Winner
    {
        public int GiftId { get; set; }
        public Gift Gift { get; set;}
        public int CostumerId { get; set; }
        public Costumer costumer { get; set; }

    }
}
