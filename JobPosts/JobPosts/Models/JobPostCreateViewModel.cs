using JobPosts.Entities;

namespace JobPosts.Models;

public class JobPostCreateViewModel
{
    public JobPost JobPost { get; set; }
    public IEnumerable<Company> Companies { get; set; }
}

