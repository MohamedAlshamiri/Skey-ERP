using SKey.Application.Common.Models;
using SKey.Application.Common.Models.Auth;

namespace SKey.Application.Common.Interfaces.Services;

public interface IAuthService
{
    Task<Result<AuthSessionDto>> LoginAsync(LoginDto loginDto, CancellationToken cancellationToken = default);

    Task<Result<AuthSessionDto>> RegisterAsync(RegisterDto registerDto, CancellationToken cancellationToken = default);
}
