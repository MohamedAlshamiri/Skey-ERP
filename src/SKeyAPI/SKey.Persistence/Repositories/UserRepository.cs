using Microsoft.EntityFrameworkCore;
using SKey.Application.Common.Interfaces.Repositories;
using SKey.Domain.Entities;
using SKey.Persistence.Context;

namespace SKey.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<User>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .Include(user => user.Role)
            .OrderBy(user => user.UserName)
            .ToListAsync(cancellationToken);
    }

    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .AsNoTracking()
            .Include(user => user.Role)
            .FirstOrDefaultAsync(user => user.Id == id, cancellationToken);
    }

    public async Task<User?> GetTrackedByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Users
            .Include(user => user.Role)
            .FirstOrDefaultAsync(user => user.Id == id, cancellationToken);
    }

    public async Task<bool> ExistsByUserNameAsync(
        string userName,
        Guid? excludeUserId = null,
        CancellationToken cancellationToken = default)
    {
        return await _context.Users.AnyAsync(
            user => user.UserName == userName && (!excludeUserId.HasValue || user.Id != excludeUserId.Value),
            cancellationToken);
    }

    public async Task<bool> ExistsByEmailAsync(
        string email,
        Guid? excludeUserId = null,
        CancellationToken cancellationToken = default)
    {
        return await _context.Users.AnyAsync(
            user => user.Email == email && (!excludeUserId.HasValue || user.Id != excludeUserId.Value),
            cancellationToken);
    }

    public async Task<bool> ExistsByPhoneNumberAsync(
        string phoneNumber,
        Guid? excludeUserId = null,
        CancellationToken cancellationToken = default)
    {
        return await _context.Users.AnyAsync(
            user => user.PhoneNumber == phoneNumber && (!excludeUserId.HasValue || user.Id != excludeUserId.Value),
            cancellationToken);
    }

    public async Task AddAsync(User user, CancellationToken cancellationToken = default)
    {
        await _context.Users.AddAsync(user, cancellationToken);
    }

    public void Update(User user)
    {
        _context.Users.Update(user);
    }

    public void Remove(User user)
    {
        _context.Users.Remove(user);
    }
}
