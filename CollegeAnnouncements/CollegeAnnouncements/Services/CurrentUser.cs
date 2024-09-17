using CollegeAnnouncements.Interfaces;
using IdentityModel;
using System.Security.Claims;

namespace CollegeAnnouncements.Services;

public class CurrentUser : IUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
    public string? Id => _httpContextAccessor.HttpContext?.User?.FindFirstValue(JwtClaimTypes.Subject);
    public ClaimsPrincipal? UserPrincipal => _httpContextAccessor.HttpContext?.User ?? null;
}


