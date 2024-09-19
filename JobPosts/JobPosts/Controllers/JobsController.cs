using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobPosts.Controllers;

public class JobsController : Controller
{
    [Authorize]
    public IActionResult Index()
    {
        return View();
    }
}
