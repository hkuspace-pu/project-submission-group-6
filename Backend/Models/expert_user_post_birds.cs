using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eBirdApi.Models;

public class expert_user_post_birds
{
    [Key]
    public int? post_id { get; set; }
    public int? bird_id { get; set; }
    public int? number_of_birds { get; set; }
    public string? image_id { get; set; }
    public string? common_name { get; set; }
    public string? scientific_Name { get; set; }
    public string? chinese_name { get; set; }
    public string? bird_order { get; set; }
    public string? family { get; set; }
}