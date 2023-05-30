using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eBirdApi.Models;

public class general_user_post
{
    [Key]
    public int? post_id { get; set; }
    public int? bird_id { get; set; }
    public int? user_id { get; set; }
    public string? description { get; set; }
    public DateTime? date_time { get; set; }
    public DateTime? createAt { get; set; }
    public double? lat { get; set; }
    public double? lng { get; set; }
    public int? status { get; set; }
    public string? image_id { get; set; }
    public string? common_name { get; set; }
    public string? scientific_Name { get; set; }
    public string? chinese_name { get; set; }
    public string? bird_order { get; set; }
    public string? family { get; set; }
    public string? user_name { get; set; }
}