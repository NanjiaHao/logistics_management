package com.cyc.controller;

import com.cyc.pojo.*;
import com.cyc.result.PageResultBean;
import com.cyc.service.AdminService;
import com.cyc.service.EmployeeService;
import com.cyc.service.OrderService;
import com.cyc.service.VehicleService;
import com.cyc.util.Constant;
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
public class vehicleController {


    @Autowired
    EmployeeService employeeService;

    @Autowired
    OrderService orderService;

    @Autowired
    AdminService adminService;
    @Autowired
    VehicleService vehicleService;

    @RequestMapping(value = "/addCar.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String  addEmployee(HttpServletRequest request, HttpServletResponse response){

        String vehicleCode=request.getParameter("vehicleCode");
        String username=request.getParameter("empCode");
        String status=request.getParameter("status");
        String id=request.getParameter("id");
        Vehicle vehicle=null;
        if(StringUtils.isNotEmpty(id)){
            vehicle= vehicleService.selectByPrimaryKey(Integer.valueOf(id));
        }else{
            vehicle=new Vehicle();
        }
        vehicle.setStatus((byte)1);
        vehicle.setVehicleCode(vehicleCode);
        vehicle.setEmployeeCode(username);
        vehicle.setVehicleStatus(Integer.valueOf(status));
        vehicle.setDeliveryCode("默认");
        if(StringUtils.isNotEmpty(id)){
            vehicleService.updateByPrimaryKey(vehicle);
        }else{
            vehicleService.insert(vehicle);
        }
        return "redirect:/adminMain.html";
    }

    @RequestMapping(value = "/delCar.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String delCar(HttpServletRequest request, HttpServletResponse response,String id){
        Vehicle vehicle=vehicleService.selectByPrimaryKey(Integer.valueOf(id));
        vehicle.setStatus((byte)0);
        vehicleService.updateByPrimaryKey(vehicle);
        return "redirect:/adminMain.html";
    }

    @RequestMapping(value = "/addCarPage.html",method = { RequestMethod.POST, RequestMethod.GET })
    private String addCarPage(HttpServletRequest request, HttpServletResponse response,Model model,String id){
        List<Employee> empList=adminService.getEmployeesByparams(null,null,0,Constant.limit);
        Vehicle car=null;
        if(StringUtils.isNotEmpty(id)) {
             car = vehicleService.selectByPrimaryKey(Integer.valueOf(id));
        }else{
            car=new Vehicle();
            car.setVehicleStatus(0);
        }
        model.addAttribute("car", car);
        model.addAttribute("empList",empList);
        return "addCar";
    }

    @RequestMapping(value = "/modifyCar.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String addEmp(HttpServletRequest request, HttpServletResponse response){

        return "redirect:adminMain";
    }

}
