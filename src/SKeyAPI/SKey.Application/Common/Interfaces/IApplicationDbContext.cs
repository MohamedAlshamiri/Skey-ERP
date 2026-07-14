using Microsoft.EntityFrameworkCore;
using SKey.Domain.Entities;

namespace SKey.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }

    DbSet<Role> Roles { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
