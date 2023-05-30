using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eBirdApi.Models;

public class Birds
{
    [Key]
    public int? bird_id { get; set; }
    public string? scientific_Name { get; set; }
    public string? common_name { get; set; }
    public string? chinese_name { get; set; }
    public string? bird_order { get; set; }
    public string? family { get; set; }
    public string? image_id { get; set; }
}