using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace chinasA.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public bool Status { get; set; }   
        public int CostumerId { get; set; }
        public Costumer customer { get; set; }


    }
}
