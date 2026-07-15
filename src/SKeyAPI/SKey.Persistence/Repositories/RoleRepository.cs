using Microsoft.EntityFrameworkCore;
using SKey.Application.Common.Interfaces.Repositories;
using SKey.Persistence.Context;

namespace SKey.Persistence.Repositories;

public class RoleRepository : IRoleRepository
{
    private readonly ApplicationDbContext _context;

    public RoleRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Roles.AnyAsync(role => role.Id == id, cancellationToken);
    }
}
