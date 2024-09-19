namespace JobPosts.Entities;

public class Company
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string IdentificationNumber { get; set; }
    public string LogoUrl { get; set; }
    public ICollection<JobPost> JobPosts { get; set; }
}

