using Microsoft.AspNetCore.Mvc;
using SKey.Application.Common.Interfaces.Services;
using SKey.Application.Common.Models;
using SKey.Application.Common.Models.Auth;

namespace SKeyAPI.Controllers;

[ApiController]
[Route("api/auth")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Simple login — returns a session marker (no JWT).
    /// </summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthSessionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AuthSessionDto>> Login(
        [FromBody] LoginDto loginDto,
        CancellationToken cancellationToken)
    {
        var result = await _authService.LoginAsync(loginDto, cancellationToken);
        return ToActionResult(result);
    }

    /// <summary>
    /// Simple register — creates a user then returns a session marker (no JWT).
    /// </summary>
    [HttpPost("register")]
    [ProducesResponseType(typeof(AuthSessionDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<AuthSessionDto>> Register(
        [FromBody] RegisterDto registerDto,
        CancellationToken cancellationToken)
    {
        var result = await _authService.RegisterAsync(registerDto, cancellationToken);
        if (!result.IsSuccess)
        {
            return ToActionResult(result);
        }

        return Created(string.Empty, result.Value);
    }

    private ActionResult<AuthSessionDto> ToActionResult(Result<AuthSessionDto> result)
    {
        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }

        return result.ErrorType switch
        {
            ErrorType.NotFound => NotFound(new { message = result.Error }),
            ErrorType.Validation => BadRequest(new { message = result.Error }),
            ErrorType.Conflict => Conflict(new { message = result.Error }),
            _ => BadRequest(new { message = result.Error })
        };
    }
}
