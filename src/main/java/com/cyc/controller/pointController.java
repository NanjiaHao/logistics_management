package com.cyc.controller;

import com.cyc.pojo.*;
import com.cyc.result.PageResultBean;
import com.cyc.service.AdminService;
import com.cyc.service.DeliverySiteService;
import com.cyc.util.DateUtil;
import com.cyc.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class pointController {

    @Autowired
    public AdminService adminService;

    @Autowired
    public DeliverySiteService deliverySiteService;

    @RequestMapping(value = "/addPointPage.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String addPointPage(HttpServletRequest request, HttpServletResponse response,String id,Model model){
        if(StringUtils.isNotEmpty(id)){
           DeliverySite point= deliverySiteService.getSite(Integer.valueOf(id));
           model.addAttribute("point",point);
        }
        return "addPoint";
    }
    @RequestMapping(value = "/addPoint.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String addPoint(HttpServletRequest request, HttpServletResponse response){
       String deliveryCode= request.getParameter("deliveryCode");
       String deliveryAddress= request.getParameter("deliveryAddress");
       String id=request.getParameter("id");
        DeliverySite point=null;
       if(StringUtils.isNotEmpty(id)){
           point=deliverySiteService.getSite(Integer.valueOf(id));
       }else{
           point=new DeliverySite();
       }
       point.setDeliveryCode(deliveryCode);
       point.setDeliveryAddress(deliveryAddress);
        if(StringUtils.isNotEmpty(id)){
           deliverySiteService.updateDelivery(point);
        }else{
            deliverySiteService.addDelivery(point);
        }
        return "redirect:/adminMain.html";
    }

    @RequestMapping(value = "/delPoint.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String delPoint(HttpServletRequest request, HttpServletResponse response,String id){
        DeliverySite point=deliverySiteService.getSite(Integer.valueOf(id));
        point.setStatus((byte)0);
        deliverySiteService.updateDelivery(point);
        return "redirect:/adminMain.html";
    }

    @RequestMapping(value = "/modifyPoint.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String modifyPoint(HttpServletRequest request, HttpServletResponse response){

        return "redirect:adminMain";
    }
}
