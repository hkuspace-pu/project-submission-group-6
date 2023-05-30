using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eBirdApi.Models;

public class User_Post
{
    [Key]
    public int? post_id { get; set; }
    public string? common_name { get; set; }
    public string? user_name { get; set; }
    public int? image_id { get; set; }
    public string? chinese_name { get; set; }
    public string? scientific_name { get; set; }
}