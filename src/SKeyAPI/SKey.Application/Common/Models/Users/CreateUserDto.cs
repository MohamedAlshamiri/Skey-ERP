using SKey.Domain.Enums;

namespace SKey.Application.Common.Models.Users;

public class CreateUserDto
{
    public string UserName { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public int Age { get; set; }

    public AccountStatus AccountStatus { get; set; } = AccountStatus.Active;

    public Guid RoleId { get; set; }
}
