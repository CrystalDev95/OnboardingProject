namespace OnboardingProject;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Web.Mvc;


public partial class Product
{

    [Key]
        public int Id { get; set; } 

        [DisplayName("Produt Name")]
        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Price is required")]
        [Range(2, 10000, ErrorMessage = "Price must be between 2 and 10000")]
        public decimal Price { get; set; }

        public virtual ICollection<Sale> Sales { get; } = new List<Sale>();
}
