using SKey.Domain.Enums;

namespace SKey.Application.Common.Models.Users;

public class UserDto
{
    public Guid Id { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public int Age { get; set; }

    public AccountStatus AccountStatus { get; set; }

    public Guid RoleId { get; set; }

    public string? RoleName { get; set; }
}
