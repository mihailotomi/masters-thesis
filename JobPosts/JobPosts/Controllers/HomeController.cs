using Microsoft.AspNetCore.Mvc;

namespace JobPosts.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
