using Microsoft.EntityFrameworkCore;

namespace eBirdApi.Models;

public class eBirdContext : DbContext
{
    public eBirdContext(DbContextOptions<eBirdContext> options)
        : base(options)
    {
    }
    //public DbSet<Trail> Trail { get; set; } = null!;
    public DbSet<User_Post> User_Post { get; set; } = null!;
    public DbSet<Birds> Birds { get; set; } = null!;
    public DbSet<UserDetail> User_Detail { get; set; } = null!;
    public DbSet<general_user_post> General_user_post { get; set; } = null!;
    public DbSet<general_post_file> General_post_file { get; set; } = null!;
    public DbSet<expert_user_post> Expert_user_post { get; set; } = null!;
    public DbSet<expert_post_file> Expert_post_file { get; set; } = null!;
    public DbSet<expert_user_post_birds> Expert_user_post_birds { get; set; } = null!;
    //public DbSet<Trail_user> Trail_user { get; set; } = null!;
    //public DbSet<User_trail_view_record> User_trail_view_record { get; set; } = null!;
    //public DbSet<Trail_location_list> Trail_location_list { get; set; } = null!;
}