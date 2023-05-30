using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eBirdApi.Models;

public class expert_user_post
{
    [Key]
    public int? post_id { get; set; }
    //public int? bird_id { get; set; }
    public int? user_id { get; set; }
    public string? comment { get; set; }
    public string? observation_type { get; set; }
    public DateTime? date_time { get; set; }
    public DateTime? createAt { get; set; }
    public double? lat { get; set; }
    public double? lng { get; set; }
    public double? duration { get; set; }
    public double? distance { get; set; }
    public int? published { get; set; }
    //public int? image_id { get; set; }
    //public string? common_name { get; set; }
    //public string? scientific_Name { get; set; }
    //public string? chinese_name { get; set; }
    //public string? bird_order { get; set; }
    //public string? family { get; set; }
    public string? user_name { get; set; }
}