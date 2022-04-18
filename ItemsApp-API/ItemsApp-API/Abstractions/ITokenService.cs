using ItemsApp_API.Entities;

namespace ItemsApp_API.Abstractions
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
