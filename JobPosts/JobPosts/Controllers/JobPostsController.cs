using JobPosts.Entities;
using JobPosts.Infrastructure.Persistence;
using JobPosts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobPosts.Controllers;

public class JobPostsController : Controller
{
    private readonly AppDbContext _context;
    private const int PageSize = 10;

    public JobPostsController(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(int page = 1)
    {
        var totalJobPosts = await _context.JobPosts.CountAsync();
        var jobPosts = await _context.JobPosts
            .Include(j => j.Company)
            .OrderBy(j => j.ValidUntil)
            .Skip((page - 1) * PageSize)
            .Take(PageSize)
            .ToListAsync();

        var viewModel = new JobPostListViewModel
        {
            JobPosts = jobPosts,
            CurrentPage = page,
            TotalPages = (int)Math.Ceiling(totalJobPosts / (double)PageSize)
        };

        return View(viewModel);
    }

    public async Task<IActionResult> Create()
    {
        var companies = await _context.Companies.ToListAsync();

        var viewModel = new JobPostCreateViewModel
        {
            JobPost = new JobPost(),
            Companies = companies
        };

        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(JobPostCreateViewModel viewModel)
    {
        if (ModelState.IsValid)
        {
            _context.Add(viewModel.JobPost);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        viewModel.Companies = await _context.Companies.ToListAsync();
        return View(viewModel);
    }
}

