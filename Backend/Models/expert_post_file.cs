using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eBirdApi.Models;

public class expert_post_file
{
    [Key]
    public int? file_id { get; set; }
    public int? post_id { get; set; }
    public string? file_name { get; set; }
    public string? file_type { get; set; }
}