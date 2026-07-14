using SKey.Domain.Enums;

namespace SKey.Application.Common.Models.Users;

public class UpdateUserDto
{
    public string UserName { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? Password { get; set; }

    public int Age { get; set; }

    public AccountStatus AccountStatus { get; set; }

    public Guid RoleId { get; set; }
}
