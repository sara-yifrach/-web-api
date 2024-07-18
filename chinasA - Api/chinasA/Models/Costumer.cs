using System.Text.Json.Serialization;

namespace chinasA.Models
{
    public class Costumer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Phone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PaymentMethod { get; set; }
        public int Password { get; set; }
        public string? Roles { get; set; } = "User";

    }
}
