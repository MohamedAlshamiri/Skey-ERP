namespace SKey.Application.Common.Interfaces.Repositories;

public interface IRoleRepository
{
    Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
}
