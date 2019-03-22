package com.cyc.controller;

import com.cyc.pojo.*;
import com.cyc.result.PageResultBean;
import com.cyc.service.AdminService;
import com.cyc.service.EmployeeService;
import com.cyc.service.OrderService;
import com.cyc.util.DateUtil;
import com.cyc.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Controller
public class orderController {

    @Autowired
    OrderService orderService;
    @Autowired
    EmployeeService employeeService;


    @RequestMapping(value = "/order.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String order(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception{
      String id=request.getParameter("id");
      String name=new String(request.getParameter("name").getBytes("ISO-8859-1"),"UTF-8");
      model.addAttribute("id",id);
      model.addAttribute("userName",name);
      return "order";
    }
    @RequestMapping(value = "/orderGoods.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String orderGoods(HttpServletRequest request, HttpServletResponse response, Model model){
        String id=request.getParameter("id");
        String name=request.getParameter("nickName");
        String teleNum=request.getParameter("teleNum");
        String shippingAddress=request.getParameter("shippingAddress");
        String goods=request.getParameter("goods");
        String expectedDate=request.getParameter("expectedDate");
        Order order=new Order();
        order.setUserCode(id);
        order.setNickName(name);
        order.setGoodsName(goods);
        order.setShippingAddress(shippingAddress);
        Date expTime=DateUtil.getDate(expectedDate);
        order.setExptime(expTime);
        List<String> codeList=employeeService.getEmpCod();
        int empCode=new Random().nextInt(codeList.size());
        order.setEmpCode(codeList.get(empCode));
        orderService.createOrder(order);
        return "loginModel";
    }

}
