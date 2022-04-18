using System;
using System.ComponentModel.DataAnnotations;

namespace ItemsApp_API.Dtos
{
    public class PurnchaseOrderItemDto
    {
        [Required]
        public string Name { get; set; }

        [Range(1, 1000, ErrorMessage = "Value for {0} can be between {1} and {2}.")]
        [Required]
        public double Price { get; set; }
    }
}
