using JobPosts.Entities;

namespace JobPosts.Models;

public class JobPostListViewModel
{
    public IEnumerable<JobPost> JobPosts { get; set; }
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }

    public bool HasPreviousPage => CurrentPage > 1;
    public bool HasNextPage => CurrentPage < TotalPages;
}

