using JobPosts.Infrastructure.Persistence;
using JobPosts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace JobPosts.Controllers;

public class CompaniesController : Controller
{
    private readonly AppDbContext _context;

    public CompaniesController(AppDbContext context)
    {
        _context = context;
    }


    public async Task<IActionResult> Index(int page = 1)
    {
        int PageSize = 10;

        var totalCompanies = await _context.Companies.CountAsync();
        var companies = await _context.Companies
            .OrderBy(c => c.Name)
            .Skip((page - 1) * PageSize)
            .Take(PageSize)
            .ToListAsync();

        var viewModel = new CompanyListViewModel
        {
            Companies = companies,
            CurrentPage = page,
            TotalPages = (int)Math.Ceiling(totalCompanies / (double)PageSize)
        };

        return View(viewModel);
    }

}

