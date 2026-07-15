using SKey.Domain.Entities;

namespace SKey.Application.Common.Interfaces.Repositories;

public interface IUserRepository
{
    Task<IReadOnlyList<User>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);

    Task<User?> GetTrackedByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<bool> ExistsByUserNameAsync(string userName, Guid? excludeUserId = null, CancellationToken cancellationToken = default);

    Task<bool> ExistsByEmailAsync(string email, Guid? excludeUserId = null, CancellationToken cancellationToken = default);

    Task<bool> ExistsByPhoneNumberAsync(string phoneNumber, Guid? excludeUserId = null, CancellationToken cancellationToken = default);

    Task AddAsync(User user, CancellationToken cancellationToken = default);

    void Update(User user);

    void Remove(User user);
}
