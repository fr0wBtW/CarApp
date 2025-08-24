using System.ComponentModel.DataAnnotations;

namespace CarApi.Dtos
{
    public class CarCreateDto
    {
        [Required]
        public string Make { get;set; } = string.Empty;

        [Required]
        public string Model { get; set; } = string.Empty;

        [Range(1886,2100)]
        public int Year { get; set; }
    }
}

