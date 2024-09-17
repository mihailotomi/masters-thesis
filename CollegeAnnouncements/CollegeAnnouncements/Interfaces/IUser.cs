using System.Security.Claims;

namespace CollegeAnnouncements.Interfaces;

public interface IUser
{
    string? Id { get; }
    ClaimsPrincipal? UserPrincipal { get; }
    bool IsAuthenticated { get; }
}


