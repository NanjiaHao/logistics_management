package com.cyc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/index")
public class BlogController {

    @RequestMapping(value = "/index.html")
    public ModelAndView publishBlog(String blogContent) {

        return new ModelAndView("login");
    }

    @RequestMapping(value = "/login.html")
    public String deleteBlog(Integer blogId) {
        int i=3;
        return "adminMain";
    }
}
