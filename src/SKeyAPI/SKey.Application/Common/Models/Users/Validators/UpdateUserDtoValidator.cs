using FluentValidation;
using SKey.Application.Common.Models.Users;

namespace SKey.Application.Common.Models.Users.Validators;

public class UpdateUserDtoValidator : AbstractValidator<UpdateUserDto>
{
    public UpdateUserDtoValidator()
    {
        RuleFor(user => user.UserName)
            .NotEmpty().WithMessage("UserName is required.")
            .MaximumLength(100).WithMessage("UserName must not exceed 100 characters.");

        RuleFor(user => user.Email)
            .NotEmpty().WithMessage("Email is required.")
            .MaximumLength(200).WithMessage("Email must not exceed 200 characters.")
            .EmailAddress().WithMessage("Email must be a valid email address.");

        RuleFor(user => user.PhoneNumber)
            .NotEmpty().WithMessage("PhoneNumber is required.")
            .MaximumLength(20).WithMessage("PhoneNumber must not exceed 20 characters.");

        RuleFor(user => user.Password)
            .MinimumLength(6).WithMessage("Password must be at least 6 characters.")
            .When(user => !string.IsNullOrWhiteSpace(user.Password));

        RuleFor(user => user.Age)
            .InclusiveBetween(0, 150).WithMessage("Age must be between 0 and 150.");

        RuleFor(user => user.RoleId)
            .NotEmpty().WithMessage("RoleId is required.");

        RuleFor(user => user.AccountStatus)
            .IsInEnum().WithMessage("AccountStatus is invalid.");
    }
}
