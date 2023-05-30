using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eBirdApi.Models;

public class UserRegister
{
    [Key]
    public string? user_name { get; set; }
    public string? first_name { get; set; }
    public string? last_name { get; set; }
    public string? user_email { get; set; }
    public string? user_password { get; set; }
    public int? user_type { get; set; }
}