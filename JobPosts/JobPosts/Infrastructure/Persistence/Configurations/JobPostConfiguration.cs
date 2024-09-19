using JobPosts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobPosts.Infrastructure.Persistence.Configurations;

public class JobPostConfiguration : IEntityTypeConfiguration<JobPost>
{
    public void Configure(EntityTypeBuilder<JobPost> builder)
    {
        builder.ToTable("job_posts");

        builder.HasKey(jp => jp.Id);

        builder.Property(jp => jp.PositionName)
               .IsRequired()
               .HasMaxLength(100);

        builder.Property(jp => jp.Description)
               .IsRequired()
               .HasMaxLength(1000);

        builder.Property(jp => jp.Location)
               .IsRequired()
               .HasMaxLength(100);

        builder.Property(jp => jp.ValidUntil)
               .IsRequired();

        builder.Property(jp => jp.Type)
               .IsRequired()
               .HasConversion<int>();
    }
}

