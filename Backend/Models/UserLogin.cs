using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace eBirdApi.Models;

public class UserLogin
{
    [Key]
    public string? user_email { get; set; }
    public string? user_password { get; set; }
}