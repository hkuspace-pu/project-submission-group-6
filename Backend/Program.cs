using Microsoft.EntityFrameworkCore;
using eBirdApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<eBirdContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionStrings"))
);



builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5050")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            ;
        }
    );
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.UseStaticFiles();

app.Run();
