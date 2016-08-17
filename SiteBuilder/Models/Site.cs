﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SiteBuilder.Models
{
    public class Site
    {
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int TypeMenuId { get; set; }
        [Required]
        public int StyleTypeId { get; set; }

        public virtual IList<Page> Pages { get; set; }
        public virtual IList<TagSite> TagSites { get; set; }    
        public virtual TypeMenu TypeMenu { get; set; }
        public virtual StyleType StyleType { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}