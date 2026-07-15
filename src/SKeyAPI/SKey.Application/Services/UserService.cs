using AutoMapper;
using Microsoft.AspNetCore.Identity;
using SKey.Application.Common.Interfaces;
using SKey.Application.Common.Interfaces.Repositories;
using SKey.Application.Common.Interfaces.Services;
using SKey.Application.Common.Models;
using SKey.Application.Common.Models.Users;
using SKey.Domain.Entities;

namespace SKey.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher<User> _passwordHasher;

    public UserService(
        IUserRepository userRepository,
        IRoleRepository roleRepository,
        IUnitOfWork unitOfWork,
        IMapper mapper,
        IPasswordHasher<User> passwordHasher)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _passwordHasher = passwordHasher;
    }

    public async Task<Result<IReadOnlyList<UserDto>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var users = await _userRepository.GetAllAsync(cancellationToken);
        var userDtos = _mapper.Map<IReadOnlyList<UserDto>>(users);
        return Result<IReadOnlyList<UserDto>>.Success(userDtos);
    }

    public async Task<Result<UserDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetByIdAsync(id, cancellationToken);
        if (user is null)
        {
            return Result<UserDto>.NotFound($"User with id '{id}' was not found.");
        }

        return Result<UserDto>.Success(_mapper.Map<UserDto>(user));
    }

    public async Task<Result<UserDto>> CreateAsync(CreateUserDto createUserDto, CancellationToken cancellationToken = default)
    {
        var validationError = await ValidateUniqueFieldsAsync(
            createUserDto.UserName,
            createUserDto.Email,
            createUserDto.PhoneNumber,
            excludeUserId: null,
            cancellationToken);

        if (validationError is not null)
        {
            return validationError;
        }

        if (!await _roleRepository.ExistsAsync(createUserDto.RoleId, cancellationToken))
        {
            return Result<UserDto>.Validation($"Role with id '{createUserDto.RoleId}' does not exist.");
        }

        var user = _mapper.Map<User>(createUserDto);
        user.Id = Guid.NewGuid();
        user.Password = _passwordHasher.HashPassword(user, createUserDto.Password);

        await _userRepository.AddAsync(user, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var createdUser = await _userRepository.GetByIdAsync(user.Id, cancellationToken);
        return Result<UserDto>.Success(_mapper.Map<UserDto>(createdUser));
    }

    public async Task<Result<UserDto>> UpdateAsync(Guid id, UpdateUserDto updateUserDto, CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetTrackedByIdAsync(id, cancellationToken);
        if (user is null)
        {
            return Result<UserDto>.NotFound($"User with id '{id}' was not found.");
        }

        var validationError = await ValidateUniqueFieldsAsync(
            updateUserDto.UserName,
            updateUserDto.Email,
            updateUserDto.PhoneNumber,
            excludeUserId: id,
            cancellationToken);

        if (validationError is not null)
        {
            return validationError;
        }

        if (!await _roleRepository.ExistsAsync(updateUserDto.RoleId, cancellationToken))
        {
            return Result<UserDto>.Validation($"Role with id '{updateUserDto.RoleId}' does not exist.");
        }

        _mapper.Map(updateUserDto, user);

        if (!string.IsNullOrWhiteSpace(updateUserDto.Password))
        {
            user.Password = _passwordHasher.HashPassword(user, updateUserDto.Password);
        }

        _userRepository.Update(user);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var updatedUser = await _userRepository.GetByIdAsync(id, cancellationToken);
        return Result<UserDto>.Success(_mapper.Map<UserDto>(updatedUser));
    }

    public async Task<Result> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetTrackedByIdAsync(id, cancellationToken);
        if (user is null)
        {
            return Result.NotFound($"User with id '{id}' was not found.");
        }

        _userRepository.Remove(user);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }

    private async Task<Result<UserDto>?> ValidateUniqueFieldsAsync(
        string userName,
        string email,
        string phoneNumber,
        Guid? excludeUserId,
        CancellationToken cancellationToken)
    {
        if (await _userRepository.ExistsByUserNameAsync(userName, excludeUserId, cancellationToken))
        {
            return Result<UserDto>.Conflict($"UserName '{userName}' is already taken.");
        }

        if (await _userRepository.ExistsByEmailAsync(email, excludeUserId, cancellationToken))
        {
            return Result<UserDto>.Conflict($"Email '{email}' is already registered.");
        }

        if (await _userRepository.ExistsByPhoneNumberAsync(phoneNumber, excludeUserId, cancellationToken))
        {
            return Result<UserDto>.Conflict($"PhoneNumber '{phoneNumber}' is already registered.");
        }

        return null;
    }
}
