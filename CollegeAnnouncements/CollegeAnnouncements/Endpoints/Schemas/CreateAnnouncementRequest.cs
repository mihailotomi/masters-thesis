using CollegeAnnouncements.Domain.Entities;

namespace CollegeAnnouncements.Endpoints.Schemas;

public class CreateAnnouncementRequest
{
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public DateTime ValidUntil { get; set; }
    public AnnouncementPriorityType Priority { get; set; }
    public AnnouncementAudienceType[] Audience { get; set; } = [];
}
