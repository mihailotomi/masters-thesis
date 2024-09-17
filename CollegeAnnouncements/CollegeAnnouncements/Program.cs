using CollegeAnnouncements.Domain.Constants;
using CollegeAnnouncements.Endpoints;
using CollegeAnnouncements.Infrastructure;
using CollegeAnnouncements.Interfaces;
using CollegeAnnouncements.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

        // Define the security scheme for Bearer Token authentication
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Enter 'Bearer' [space] and then your valid token."
        });

        // Apply this security scheme to all operations (global security requirement)
        options.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
    });

    builder.Services.ConfigureHttpJsonOptions(options =>
    {
        options.SerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowLocalhost", policy =>
        {
            policy.AllowAnyOrigin() // Adjust if needed
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    });

    builder.Services.AddInfrastructureServices(options =>
    {
        options.ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    });

    builder.Services.AddHttpContextAccessor();

    builder.Services.AddScoped<IUser, CurrentUser>();

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        builder.Configuration.Bind(nameof(JwtBearerOptions), options);
    });

    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy(Policies.IsAdmin, policy => policy.RequireRole(Roles.ADMIN));
    });
}

{
    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseHttpsRedirection();

    app.MapAnnouncementEndpoints(builder.Configuration);
    app.UseCors("AllowLocalhost");


    app.Run();
}