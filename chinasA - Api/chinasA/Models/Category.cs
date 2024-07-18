using System.ComponentModel.DataAnnotations;

namespace chinasA.Models
{
    public class Category
    {
        public string Name { get; set; }

        [Key]
        public int Id { get; set; }
    }
}
