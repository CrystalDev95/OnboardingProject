using Microsoft.EntityFrameworkCore;
using System.Web.Http.Cors;
using OnboardingProject;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<Batch24NovContext>(options => options.UseSqlServer(
builder.Configuration.GetConnectionString("DefaultConnection")
));


//builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors(builder => builder.WithOrigins("https://localhost:7114")
.AllowAnyHeader()
.AllowAnyMethod()
.SetIsOriginAllowed((host) => true)
.AllowCredentials()
);

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
