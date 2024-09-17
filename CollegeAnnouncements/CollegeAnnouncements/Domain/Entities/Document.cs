namespace CollegeAnnouncements.Domain.Entities;

public class Document
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public string FileUri { get; private set; }
    public int AnnouncementId { get; private set; }
    public Announcement Announcement { get; private set; } = null!;

    protected Document(
        int id,
        string name,
        string fileUri,
        int announcementId)
    {
        Id = id;
        Name = name;
        FileUri = fileUri;
        AnnouncementId = announcementId;
    }

    public static Document Create(
        int id,
        string name,
        string fileUri,
        int announcementId)
    {
        return new Document(id, name, fileUri, announcementId);
    }
}

