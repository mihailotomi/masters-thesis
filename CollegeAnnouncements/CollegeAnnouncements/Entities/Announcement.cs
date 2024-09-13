using System.ComponentModel;

namespace CollegeAnnouncements.Entities;


#region Enums
public enum AnnouncementPriorityType
{
    [Description("Normal")]
    NORMAL,
    [Description("High")]
    HIGH,
    [Description("Critical")]
    CRITICAL,
}

public enum AnnouncementAudienceType
{
    [Description("Students")]
    STUDENTS,
    [Description("Employees")]
    EMPLOYEES
}
#endregion

public class Announcement
{
    public int Id { get; private set; }
    public string Title { get; private set; }
    public string Content { get; private set; }
    public DateTime ValidUntil { get; private set; }
    public AnnouncementPriorityType Priority { get; private set; }
    public List<AnnouncementAudienceType> Audience { get; private set; }
    public List<Document> Documents { get; private set; }


    protected Announcement(
        int id,
        string title,
        string content,
        DateTime validUntil,
        AnnouncementPriorityType priority,
        List<AnnouncementAudienceType> audience)
    {
        Id = id;
        Title = title;
        Content = content;
        ValidUntil = validUntil;
        Priority = priority;
        Audience = audience;
        Documents = [];
    }

    public static Announcement Create(
        int id,
        string title,
        string content,
        DateTime validUntil,
        AnnouncementPriorityType priority,
        List<AnnouncementAudienceType> audience)
    {
        return new Announcement(id, title, content, validUntil, priority, audience);
    }

    public Announcement AttachDocument(Document document)
    {
        Documents.Add(document);
        return this;
    }

    public Announcement AttachDocumentRange(List<Document> documents)
    {
        Documents.AddRange(documents);
        return this;
    }
}

