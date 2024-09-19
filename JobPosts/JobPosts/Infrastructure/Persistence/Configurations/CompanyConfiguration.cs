using JobPosts.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobPosts.Infrastructure.Persistence.Configurations;

public class CompanyConfiguration : IEntityTypeConfiguration<Company>
{
    public void Configure(EntityTypeBuilder<Company> builder)
    {
        builder.ToTable("companies");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Name)
               .IsRequired()
               .HasMaxLength(200);

        builder.Property(c => c.IdentificationNumber)
               .IsRequired()
               .HasMaxLength(9);

        builder.HasIndex(c => c.IdentificationNumber)
               .IsUnique();

        builder.Property(c => c.LogoUrl)
               .IsRequired(false);

        builder.HasMany(c => c.JobPosts)
               .WithOne(jp => jp.Company)
               .HasForeignKey(jp => jp.CompanyId);
    }
}

