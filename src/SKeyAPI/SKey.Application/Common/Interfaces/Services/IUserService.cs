using SKey.Application.Common.Models;
using SKey.Application.Common.Models.Users;

namespace SKey.Application.Common.Interfaces.Services;

public interface IUserService
{
    Task<Result<IReadOnlyList<UserDto>>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<Result<UserDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<Result<UserDto>> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default);

    Task<Result<UserDto>> UpdateAsync(Guid id, UpdateUserDto updateUserDto, CancellationToken cancellationToken = default);

    Task<Result> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
