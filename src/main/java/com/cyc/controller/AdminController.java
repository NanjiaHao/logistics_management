package com.cyc.controller;

import com.cyc.pojo.*;
import com.cyc.result.PageResultBean;
import com.cyc.service.*;
import com.cyc.util.Constant;
import com.cyc.util.DateUtil;
import com.cyc.util.ExportUtils;
import com.cyc.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Controller
public class AdminController {

    @Autowired
    EmployeeService employeeService;
    @Autowired
    OrderService orderService;
    @Autowired
    VehicleService vehicleService;
    @Autowired
    DeliverySiteService deliverySiteService;
    @Autowired
    AttendanceRecordService attendanceRecordService;
    @Autowired
    UserService userService;
    @Autowired
    AdminService adminService;

    @RequestMapping(value = "/adLogin.json", method = { RequestMethod.POST, RequestMethod.GET })
    @ResponseBody
    public Map<String,Object> login(HttpServletRequest request, HttpServletResponse response){
        Map<String,Object> map=new HashMap<>();
       String userName= request.getParameter("userName");
       String password= request.getParameter("password");
       Administrator administrator=adminService.getAdministrator(userName,password);
       if(administrator!=null){
           map.put("code","1");
       }else{
           map.put("code","2");
       }
        return map;
    }

    @RequestMapping(value = "/modifyLogin.html", method = { RequestMethod.POST, RequestMethod.GET })
    public Map<String,Object> modifyLogin(HttpServletRequest request, HttpServletResponse response){

        HashMap<String,Object> map = new HashMap<>();
        map.put("status",2);
        return map;
    }

    @RequestMapping(value = "/login.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String  loginModel(HttpServletRequest request, HttpServletResponse response){

        return "loginModel";
    }

    @RequestMapping(value = "/userLoginPage.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String  userLoginPage(HttpServletRequest request, HttpServletResponse response){

        return "userLogin";
    }
    @RequestMapping(value = "/adLoginPage.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String adLoginPage(HttpServletRequest request, HttpServletResponse response){

        return "adminLogin";
    }
    @RequestMapping(value = "/empLoginPage.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String  empLoginPage(HttpServletRequest request, HttpServletResponse response){
        return "employeeLogin";
    }

    @RequestMapping(value = "/adminMain.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String  adminMain(HttpServletRequest request, HttpServletResponse response,Model model){
         String name=request.getParameter("name");
         List<User> userList= adminService.getUsersByparams(null,null,0, Constant.limit);
         List<Employee> employeeList=adminService.getEmployeesByparams(null,StringUtils.isBlank(name)?null:name,0,Constant.limit);
         List<AttendanceRecord> attendanceRecordList=adminService.getAttendanceRecords(null,0,Constant.limit);
         List<Order> orderList=adminService.getOrdersByparams(0,Constant.limit,null,null);
         List<Vehicle> carList=vehicleService.getCarList(0,Constant.limit);
         List<DeliverySite> pointList=deliverySiteService.getPointList(0,Constant.limit);
         model.addAttribute("userList",userList);
         model.addAttribute("employeeList",employeeList);
         model.addAttribute("attendanceRecordList",attendanceRecordList);
         model.addAttribute("orderList",orderList);
         model.addAttribute("carList",carList);
         model.addAttribute("pointList",pointList);
         return "adminMain";
    }

    @ResponseBody
    @RequestMapping(value = "/exportOrder.json", method = { RequestMethod.POST,RequestMethod.GET })
    public void exportOrder(HttpServletRequest request,HttpServletResponse response,Model model) throws Exception {
        String fileName="订单表";
        String[] headers=new String[10];
        headers[0]="订单号";
        headers[1]="配送员编号";
        headers[2]="用户编号";
        headers[3]="用户昵称";
        headers[4]="配送地址";
        headers[5]="配送订单费";
        headers[6]="订单金额";
        headers[7]="期望配送时间";
        headers[8]="商品名称";
        headers[9]="订单状态";
        List<Order> orderList=adminService.getOrdersByparams(0,Constant.limit,null,null);
        List<String> header = Arrays.asList(headers);
        List<String> columns =Arrays.asList("orderCode", "empCode", "userCode", "nickName",
                "shippingAddress", "shippingFee", "orderAmount", "exptime", "goodsName", "status");
        ExportUtils.exportToExcel(orderList, Order.class, fileName, header, columns, response, DateUtil.DEFAULT_DATE_FORMAT);
    }

    @ResponseBody
    @RequestMapping(value = "/exportWork.json", method = { RequestMethod.POST,RequestMethod.GET })
    public void exportWork(HttpServletRequest request,HttpServletResponse response,Model model) throws Exception {
        String fileName="考勤表";
        String[] headers=new String[2];
        headers[0]="员工号";
        headers[1]="打卡日期";
        List<AttendanceRecord> attendanceRecordList=adminService.getAttendanceRecords(null,0,Constant.limit);
        List<String> header = Arrays.asList(headers);
        List<String> columns =Arrays.asList("empCode","attendanceTime");
        ExportUtils.exportToExcel(attendanceRecordList, AttendanceRecord.class, fileName, header, columns, response, DateUtil.DEFAULT_DATE_FORMAT);
    }


}
