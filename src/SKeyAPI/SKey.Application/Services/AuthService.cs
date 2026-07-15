using Microsoft.AspNetCore.Identity;
using SKey.Application.Common.Interfaces;
using SKey.Application.Common.Interfaces.Repositories;
using SKey.Application.Common.Interfaces.Services;
using SKey.Application.Common.Models;
using SKey.Application.Common.Models.Auth;
using SKey.Domain.Constants;
using SKey.Domain.Entities;
using SKey.Domain.Enums;

namespace SKey.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AuthService(
        IUserRepository userRepository,
        IUnitOfWork unitOfWork,
        IPasswordHasher<User> passwordHasher)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _passwordHasher = passwordHasher;
    }

    public async Task<Result<AuthSessionDto>> LoginAsync(LoginDto loginDto, CancellationToken cancellationToken = default)
    {
        var email = loginDto.Email.Trim();
        var user = await _userRepository.GetByEmailAsync(email, cancellationToken);

        if (user is null)
        {
            return Result<AuthSessionDto>.Validation("Invalid email or password.");
        }

        if (user.AccountStatus != AccountStatus.Active)
        {
            return Result<AuthSessionDto>.Validation("This account is not active.");
        }

        var passwordResult = _passwordHasher.VerifyHashedPassword(user, user.Password, loginDto.Password);
        if (passwordResult == PasswordVerificationResult.Failed)
        {
            return Result<AuthSessionDto>.Validation("Invalid email or password.");
        }

        return Result<AuthSessionDto>.Success(ToSession(user));
    }

    public async Task<Result<AuthSessionDto>> RegisterAsync(RegisterDto registerDto, CancellationToken cancellationToken = default)
    {
        var userName = registerDto.UserName.Trim();
        var email = registerDto.Email.Trim();
        var phone = string.IsNullOrWhiteSpace(registerDto.PhoneNumber)
            ? $"0{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() % 10000000000}"
            : registerDto.PhoneNumber.Trim();

        if (await _userRepository.ExistsByUserNameAsync(userName, null, cancellationToken))
        {
            return Result<AuthSessionDto>.Conflict($"UserName '{userName}' is already taken.");
        }

        if (await _userRepository.ExistsByEmailAsync(email, null, cancellationToken))
        {
            return Result<AuthSessionDto>.Conflict($"Email '{email}' is already registered.");
        }

        if (await _userRepository.ExistsByPhoneNumberAsync(phone, null, cancellationToken))
        {
            return Result<AuthSessionDto>.Conflict($"PhoneNumber '{phone}' is already registered.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            UserName = userName,
            Email = email,
            PhoneNumber = phone,
            Age = 18,
            AccountStatus = AccountStatus.Active,
            RoleId = DefaultRoles.EmployeeId
        };

        user.Password = _passwordHasher.HashPassword(user, registerDto.Password);

        await _userRepository.AddAsync(user, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var created = await _userRepository.GetByIdAsync(user.Id, cancellationToken);
        return Result<AuthSessionDto>.Success(ToSession(created!));
    }

    private static AuthSessionDto ToSession(User user) => new()
    {
        SessionId = Guid.NewGuid(),
        UserId = user.Id,
        UserName = user.UserName,
        Email = user.Email,
        RoleName = user.Role?.Name
    };
}
