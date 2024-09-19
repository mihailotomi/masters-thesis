using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace JobPosts.Controllers;

public class AccountController : Controller
{
    public IActionResult Login()
    {
        var redirectUrl = Url.Action("Index", "Jobs");
        return Challenge(new AuthenticationProperties { RedirectUri = redirectUrl }, "oidc");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Logout()
    {
        // Sign the user out of both the app and OpenID Connect
        return SignOut(new AuthenticationProperties { RedirectUri = "/" }, "oidc", "Cookies");
    }
}

