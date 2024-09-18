using CollegeAnnouncements.Domain.Constants;
using CollegeAnnouncements.Domain.Entities;
using CollegeAnnouncements.Endpoints.Schemas;
using CollegeAnnouncements.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

namespace CollegeAnnouncements.Endpoints;

public static class AnnouncementEndpoints
{
    public static void MapAnnouncementEndpoints(this IEndpointRouteBuilder app, IConfiguration configuration)
    {
        var jwtOptions = new JwtBearerOptions();
        configuration.Bind(nameof(JwtBearerOptions), jwtOptions);
        var roleClaimType = jwtOptions.TokenValidationParameters.RoleClaimType;

        app.MapGet("/announcements", async (AppDbContext db, HttpContext context, int page = 1, int pageSize = 10) =>
        {
            if (context.User.IsInRole(Roles.ADMIN))
            {
                var totalAnnouncements = await db.Announcements.CountAsync();

                var announcements = await db.Announcements
                    .Include(x => x.Documents)
                    .OrderBy(a => a.ValidUntil)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Results.Ok(new
                {
                    TotalCount = totalAnnouncements,
                    Page = page,
                    PageSize = pageSize,
                    Announcements = announcements
                });
            }

            var userRoles = context.User.Claims
                .Where(c => c.Type == roleClaimType)
                .Select(c => Enum.Parse(typeof(AnnouncementAudienceType), c.Value))
                .Cast<AnnouncementAudienceType>()
                .ToArray();

            var totalFilteredCount = db.Announcements.ToList()
                .Count(a => userRoles.Length > 0 && a.Audience.Contains(userRoles[0]) && a.ValidUntil > DateTime.UtcNow);

            var filteredAnnouncements = db.Announcements.Include(x => x.Documents).ToList()
                .Where(a => userRoles.Length > 0 && a.Audience.Contains(userRoles[0]) && a.ValidUntil > DateTime.UtcNow)
                .OrderBy(a => a.ValidUntil)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            return Results.Ok(new
            {
                TotalCount = totalFilteredCount,
                Page = page,
                PageSize = pageSize,
                Announcements = filteredAnnouncements
            });
        })
       .WithName("GetAnnouncements")
       .RequireAuthorization()
       .WithOpenApi();

        app.MapGet("/announcements/{id}", async (int id, AppDbContext db) =>
        {
            var announcement = await db.Announcements.Include(x => x.Documents).FirstOrDefaultAsync(x => x.Id == id);
            if (announcement == null) return Results.NotFound();

            return Results.Ok(announcement);
        })
        .WithName("GetAnnouncementById")
        .RequireAuthorization()
        .WithOpenApi();

        app.MapPost("/announcements", async (CreateAnnouncementRequest request, AppDbContext db) =>
        {
            var newAnnouncement = Announcement.Create(
                request.Title,
                request.Content,
                request.ValidUntil,
                request.Priority,
                request.Audience
            );

            db.Announcements.Add(newAnnouncement);
            await db.SaveChangesAsync();

            return Results.Created($"/announcements/{newAnnouncement.Id}", newAnnouncement);
        })
        .RequireAuthorization(Policies.IsAdmin)
        .WithName("CreateAnnouncement")
        .WithOpenApi();

        app.MapPut("/announcements/{id}", async (int id, Announcement updatedAnnouncement, AppDbContext db) =>
        {
            var announcement = await db.Announcements.FindAsync(id);
            if (announcement == null) return Results.NotFound();

            db.Entry(announcement).CurrentValues.SetValues(updatedAnnouncement);
            await db.SaveChangesAsync();

            return Results.Ok(announcement);
        })
        .RequireAuthorization(Policies.IsAdmin)
        .WithName("UpdateAnnouncement")
        .WithOpenApi();

        app.MapDelete("/announcements/{id}", async (int id, AppDbContext db) =>
        {
            var announcement = await db.Announcements.FindAsync(id);
            if (announcement == null) return Results.NotFound();

            db.Announcements.Remove(announcement);
            await db.SaveChangesAsync();

            return Results.NoContent();
        })
        .RequireAuthorization(Policies.IsAdmin)
        .WithName("DeleteAnnouncement")
        .WithOpenApi();
    }
}

