using SKey.Domain.Entities;

namespace SKey.Domain.Constants;

public static class DefaultRoles
{
    public static readonly Guid AdminId = Guid.Parse("11111111-1111-1111-1111-111111111111");
    public static readonly Guid EmployeeId = Guid.Parse("22222222-2222-2222-2222-222222222222");
    public static readonly Guid CustomerId = Guid.Parse("33333333-3333-3333-3333-333333333333");

    public const string Admin = "Admin";
    public const string Employee = "Employee";
    public const string Customer = "Customer";

    public static IReadOnlyList<Role> All { get; } =
    [
        new Role { Id = AdminId, Name = Admin },
        new Role { Id = EmployeeId, Name = Employee },
        new Role { Id = CustomerId, Name = Customer }
    ];
}
