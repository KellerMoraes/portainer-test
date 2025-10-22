using Api.Repositories.Interface;
using Api.Repositories.Repositories;
using Api.Services.Interface;
using Api.Services.Services;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var mongoConfig = builder.Configuration.GetSection("Mongo");
var connectionString = mongoConfig["ConnectionString"];
var databaseName = mongoConfig["Database"];
builder.Services.AddSingleton<IMongoClient>(sp =>
    new MongoClient(connectionString));

builder.Services.AddScoped(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(databaseName);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000",
                "http://localhost:8084")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<IPaginaRepository, PaginaRepository>();
builder.Services.AddScoped<IPaginaService, PaginaService>();
builder.Services.AddSingleton<MinioService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("AllowFrontend");

app.Run();
