using CollegeAnnouncements.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CollegeAnnouncements.Infrastructure.Persistence.EntityConfigurations;

public class AnnouncementConfiguration : IEntityTypeConfiguration<Announcement>
{
    public void Configure(EntityTypeBuilder<Announcement> builder)
    {
        builder.ToTable("announcements");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(a => a.Content)
            .IsRequired();

        builder.Property(a => a.ValidUntil)
            .IsRequired();

        builder.Property(a => a.Priority)
            .HasConversion(
                v => v.ToString(),
                v => (AnnouncementPriorityType)Enum.Parse(typeof(AnnouncementPriorityType), v)
            )
            .IsRequired();

        builder.Property(a => a.Audience)
            .HasConversion(
                v => v.Select(e => e.ToString()).ToArray(),
                v => v.Select(e => (AnnouncementAudienceType)Enum.Parse(typeof(AnnouncementAudienceType), e)).ToArray()
            )
            .HasColumnType("text[]")
            .IsRequired();
    }
}
