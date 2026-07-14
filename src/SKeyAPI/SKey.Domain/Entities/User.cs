using SKey.Domain.Enums;

namespace SKey.Domain.Entities;

public class User
{
    public Guid Id { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public int Age { get; set; }

    public AccountStatus AccountStatus { get; set; }

    public Guid RoleId { get; set; }

    public Role Role { get; set; } = null!;
}
