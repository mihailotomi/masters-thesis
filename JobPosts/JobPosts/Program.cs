using JobPosts.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "Cookies";
    options.DefaultChallengeScheme = "oidc";
})
.AddCookie("Cookies")
.AddOpenIdConnect("oidc", options =>
{
    options.Authority = "http://localhost:8081/";
    options.ClientId = "285531773473980418@college";
    options.ClientSecret = "KseKXUSMkQSqzqRma3dLbLgfzSkb4H1tRZE6k0smrihEpHAIJu5YbLvMbZW57g3r";
    options.ResponseType = OpenIdConnectResponseType.Code;
    options.RequireHttpsMetadata = false;

    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");

    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;

    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        NameClaimType = "name",
        RoleClaimType = "role"
    };

    options.Events = new OpenIdConnectEvents
    {
        OnRedirectToIdentityProvider = context =>
        {
            if (context.HttpContext.User.Identity.IsAuthenticated)
            {
                // Already authenticated, no need to redirect
                context.HandleResponse();
                return Task.CompletedTask;
            }
            return Task.CompletedTask;
        },
        OnAuthenticationFailed = context =>
        {
            context.HandleResponse(); // Prevent redirect loop on failure
            context.Response.Redirect("/Home/Error?message=" + context.Exception.Message);
            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

app.UseStaticFiles();



app.UseAuthentication();
app.UseAuthorization();

app.MapDefaultControllerRoute();

app.Run();