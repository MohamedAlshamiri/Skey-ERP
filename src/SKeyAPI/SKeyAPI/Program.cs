using FluentValidation.AspNetCore;
using SKey.Application;
using SKey.Infrastructure;

namespace SKeyAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddApplication();
        builder.Services.AddInfrastructure(builder.Configuration);

        builder.Services.AddControllers();
        builder.Services.AddFluentValidationAutoValidation();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("FrontApp", policy =>
            {
                policy
                    .WithOrigins(
                        "http://localhost:4200",
                        "http://127.0.0.1:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("FrontApp");
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}
