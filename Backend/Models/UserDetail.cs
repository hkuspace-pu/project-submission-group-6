using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eBirdApi.Models;

public class UserDetail
{
    [Key]
    public int? user_id { get; set; }
    public string? user_name { get; set; }
    public string? first_name { get; set; }
    public string? last_name { get; set; }
    public string? user_email { get; set; }
    public string? user_password_hash { get; set; }
    public string? user_password_salt { get; set; }
    public int? user_type { get; set; }
}