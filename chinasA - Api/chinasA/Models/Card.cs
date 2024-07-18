/*using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace chinasA.Models
{
    public class Card
    {   
        public int Id { get; set; }
        
        [ForeignKey("PurchaseId")]
        public virtual Purchase Purchase { get; set; }
        public int PurchaseId { get; set; }
        [ForeignKey("GiftId")]
        public virtual Gift Gift { get; set; }
        public int GiftId { get; set; }

    }
}
*/
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace chinasA.Models
{
    public class Card
    {
        public int Id { get; set; }

        [ForeignKey("PurchaseId")]
        public virtual Purchase Purchase { get; set; }

        public int PurchaseId { get; set; }

        [ForeignKey("GiftId")]
        public virtual Gift Gift { get; set; }

        public int GiftId { get; set; }
    }
}