using CollegeAnnouncements.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CollegeAnnouncements.Infrastructure.Persistence.EntityConfigurations;

public class DocumentConfiguration : IEntityTypeConfiguration<Document>
{
    public void Configure(EntityTypeBuilder<Document> builder)
    {
        builder.ToTable("documents");

        builder.HasKey(d => d.Id);

        builder.Property(d => d.Name)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(d => d.FileUri)
            .IsRequired();

        builder.HasOne(d => d.Announcement)
            .WithMany(a => a.Documents)
            .HasForeignKey(d => d.AnnouncementId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}