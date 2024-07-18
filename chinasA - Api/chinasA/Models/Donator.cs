namespace chinasA.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Threading.Tasks;

    public class Donator
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}
