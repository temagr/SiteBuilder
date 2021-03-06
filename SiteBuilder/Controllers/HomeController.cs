﻿using SiteBuilder.Filters;
using SiteBuilder.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SiteBuilder.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [Culture]
        public ActionResult Index()
        {
            ViewBag.Tags = db.Tags.Select(c => new TagCloud { Id = c.Id, Name = c.Name, Count = c.TagsSites.Count(x => x.TagId == c.Id) + 1 }).ToList();
            ViewBag.sites = db.Sites.OrderByDescending(c => c.Id).Select(c => new ShowSite { NameSite = c.Name, NameUser = c.User.UserName, NamePage = c.Pages.FirstOrDefault().Name }).Take(5).ToList();

            return View();
        }

        public ActionResult ChangeCulture(string lang)
        {
            string returnUrl = Request.UrlReferrer.AbsolutePath;

            List<string> cultures = new List<string>() { "en", "ru" };
            if (!cultures.Contains(lang))
            {
                lang = "en";
            }

            SetCookieLocalization(lang);

            return Redirect(returnUrl);
        }

        public void SetCookieLocalization(string lang)
        {
            HttpCookie cookie = Request.Cookies["lang"];
            if (cookie != null)
                cookie.Value = lang;
            else
            {

                cookie = new HttpCookie("lang");
                cookie.HttpOnly = false;
                cookie.Value = lang;
                cookie.Expires = DateTime.Now.AddYears(1);
            }
            Response.Cookies.Add(cookie);
        }
    }
}