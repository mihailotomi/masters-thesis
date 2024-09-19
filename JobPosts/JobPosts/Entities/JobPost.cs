namespace JobPosts.Entities;

public class JobPost
{
    public int Id { get; set; }

    public string PositionName { get; set; }

    public string Description { get; set; }

    public JobType Type { get; set; }

    public string Location { get; set; }

    public DateTime ValidUntil { get; set; }

    public int CompanyId { get; set; }
    public Company Company { get; set; }
}

public enum JobType
{
    FullTime,
    PartTime,
    Internship
}


