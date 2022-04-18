using System.ComponentModel.DataAnnotations;

namespace ItemsApp_API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}
