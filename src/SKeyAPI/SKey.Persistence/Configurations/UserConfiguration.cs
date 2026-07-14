using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SKey.Domain.Entities;

namespace SKey.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(user => user.Id);

        builder.Property(user => user.UserName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(user => user.PhoneNumber)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(user => user.Email)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(user => user.Password)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(user => user.Age)
            .IsRequired();

        builder.Property(user => user.AccountStatus)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(50);

        builder.Property(user => user.RoleId)
            .IsRequired();

        builder.HasIndex(user => user.UserName)
            .IsUnique();

        builder.HasIndex(user => user.Email)
            .IsUnique();

        builder.HasIndex(user => user.PhoneNumber)
            .IsUnique();

        builder.HasOne(user => user.Role)
            .WithMany(role => role.Users)
            .HasForeignKey(user => user.RoleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
