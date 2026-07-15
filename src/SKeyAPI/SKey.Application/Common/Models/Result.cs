namespace SKey.Application.Common.Models;

public class Result
{
    public bool IsSuccess { get; protected init; }

    public string? Error { get; protected init; }

    public ErrorType ErrorType { get; protected init; }

    public static Result Success() => new()
    {
        IsSuccess = true,
        ErrorType = ErrorType.None
    };

    public static Result Failure(string error, ErrorType errorType) => new()
    {
        IsSuccess = false,
        Error = error,
        ErrorType = errorType
    };

    public static Result NotFound(string error) => Failure(error, ErrorType.NotFound);

    public static Result Validation(string error) => Failure(error, ErrorType.Validation);

    public static Result Conflict(string error) => Failure(error, ErrorType.Conflict);
}

public class Result<T> : Result
{
    public T? Value { get; private init; }

    public static Result<T> Success(T value) => new()
    {
        IsSuccess = true,
        Value = value,
        ErrorType = ErrorType.None
    };

    public new static Result<T> Failure(string error, ErrorType errorType) => new()
    {
        IsSuccess = false,
        Error = error,
        ErrorType = errorType
    };

    public new static Result<T> NotFound(string error) => Failure(error, ErrorType.NotFound);

    public new static Result<T> Validation(string error) => Failure(error, ErrorType.Validation);

    public new static Result<T> Conflict(string error) => Failure(error, ErrorType.Conflict);
}
