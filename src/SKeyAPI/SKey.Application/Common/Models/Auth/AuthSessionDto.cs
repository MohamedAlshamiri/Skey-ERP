namespace SKey.Application.Common.Models.Auth;

/// <summary>
/// Simple session response — no JWT. Frontend stores SessionId as a login marker.
/// </summary>
public class AuthSessionDto
{
    public Guid SessionId { get; set; }

    public Guid UserId { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? RoleName { get; set; }
}
