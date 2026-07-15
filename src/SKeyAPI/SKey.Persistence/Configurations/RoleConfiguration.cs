using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SKey.Domain.Constants;
using SKey.Domain.Entities;

namespace SKey.Persistence.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("Roles");

        builder.HasKey(role => role.Id);

        builder.Property(role => role.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(role => role.Name)
            .IsUnique();

        builder.HasData(
            new Role { Id = DefaultRoles.AdminId, Name = DefaultRoles.Admin },
            new Role { Id = DefaultRoles.EmployeeId, Name = DefaultRoles.Employee },
            new Role { Id = DefaultRoles.CustomerId, Name = DefaultRoles.Customer });
    }
}
