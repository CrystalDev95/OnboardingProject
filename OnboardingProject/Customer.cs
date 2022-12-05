namespace OnboardingProject;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Web.Mvc;

public partial class Customer
{
    
    [Key]
    public int Id { get; set; }

    [DisplayName("Customer Name")]
    [Required(ErrorMessage = "Customer Name is required")]
    [StringLength(50, MinimumLength = 3)]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Customer Address is required")]
    [StringLength(300)]
    public string Address { get; set; } = null!;

    public virtual ICollection<Sale> Sales { get; } = new List<Sale>();
}
