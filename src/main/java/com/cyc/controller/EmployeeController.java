package com.cyc.controller;

import com.cyc.pojo.*;
import com.cyc.result.PageResultBean;
import com.cyc.service.AttendanceRecordService;
import com.cyc.service.DeliverySiteService;
import com.cyc.service.EmployeeService;
import com.cyc.service.OrderService;
import com.cyc.util.Constant;
import com.cyc.util.DateUtil;
import com.cyc.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @Autowired
    OrderService orderService;

    @Autowired
    DeliverySiteService deliverySiteService;

    @Autowired
    AttendanceRecordService attendanceRecordService;

    @RequestMapping(value = "/empLogin.json", method = { RequestMethod.POST, RequestMethod.GET })
    @ResponseBody
    public Map<String,Object> addEmployee(HttpServletRequest request, HttpServletResponse response){
      String username= request.getParameter("username");
      String password= request.getParameter("password");
      Employee employee= employeeService.checkEmpLogin(username,password);
      Map<String,Object> map=new HashMap<>();
     if(employee==null){
         map.put("code","0");
     }else{
         map.put("code","1");
         map.put("id",employee.getId());
     }
        return map;
    }

    @RequestMapping(value = "/addEmpPage.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String addEmpPage(HttpServletRequest request, HttpServletResponse response, Model model,String code){
        List<DeliverySite> pointList=deliverySiteService.getPointList(0,Constant.limit);
        model.addAttribute("pointList",pointList);
        if(StringUtils.isNotEmpty(code)){
           Employee employee= employeeService.selectByPrimaryKey(Integer.valueOf(code));
           employee.setBirthDateStr(DateUtil.formatDate1(employee.getBirthDate()));
           employee.setHiredateStr(DateUtil.formatDate1(employee.getHiredate()));
            model.addAttribute("employee",employee);
        }
        return "addEmployee";
    }

    @RequestMapping(value = "/addEmp.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String addEmp(HttpServletRequest request, HttpServletResponse response, Model model){
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        String sex=request.getParameter("sex");
        String telephone=request.getParameter("telephone");
        String birthDate=request.getParameter("birthDate");
        String point=request.getParameter("point");
        String empId=request.getParameter("empId");
        String startDate=request.getParameter("startDate");
        String position=request.getParameter("position");
        String salary=request.getParameter("salary");
        String address=request.getParameter("address");
        String id=request.getParameter("id");
        Employee employee=null;
        if(StringUtils.isNotEmpty(id)) {
        employee=employeeService.selectByPrimaryKey(Integer.valueOf(id));
        }else{
            employee=new Employee();
        }
        employee.setName(username);
        employee.setPassword(password);
        employee.setGender(Short.valueOf(sex));
        employee.setAddress(address);
        employee.setBirthDate(DateUtil.getDate(birthDate));
        employee.setHiredate(DateUtil.getDate(startDate));
        employee.setTeleNum(telephone);
        employee.setDeliveryCode(point);
        employee.setSalary(new BigDecimal(salary));
        employee.setPositionType(Integer.valueOf(position));
        employee.setStatus(new Integer(1).byteValue());
        if(StringUtils.isNotEmpty(id)) {
            employeeService.updateByPrimaryKey(employee);
        }else{
            employeeService.insert(employee);
        }
        return "redirect:/adminMain.html";
    }



    @RequestMapping(value = "/delEmp.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String delEmp(HttpServletRequest request, HttpServletResponse response,String code){
         Employee employee=employeeService.selectByPrimaryKey(Integer.valueOf(code));
         employee.setStatus((byte)0);
         employeeService.deleteByKey(employee);
        return "redirect:/adminMain.html";
    }


    @RequestMapping(value = "/modifyEmp.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String modifyEmp(HttpServletRequest request, HttpServletResponse response){

        return "redirect:adminMain";
    }

    @RequestMapping(value = "/employeeView.html", method = { RequestMethod.POST, RequestMethod.GET })
    public String empView(HttpServletRequest request, HttpServletResponse response,Model model){
        String id=request.getParameter("id");
        Employee employee=employeeService.selectByPrimaryKey(Integer.valueOf(id));
        List<Order> orderList=orderService.selectByEmpCode(employee.getCode());
        model.addAttribute("orderList",orderList);
        model.addAttribute("empId",employee.getId());
        return "employeeView";
    }


    @RequestMapping(value = "/attend.html", method = { RequestMethod.POST, RequestMethod.GET })
    @ResponseBody
    public Map<String,Object> attend(HttpServletRequest request, HttpServletResponse response,String empId){
           Map<String,Object> map=new HashMap<>();
          /* String empId=request.getParameter("empId");*/
           Employee employee=employeeService.selectByPrimaryKey(Integer.valueOf(empId));
           AttendanceRecord attendence=new AttendanceRecord();
           attendence.setEmpId(employee.getId());
           attendence.setEmpCode(employee.getCode());
           attendence.setAttendanceTime(new Date());
           int record=attendanceRecordService.addRecord(attendence);
           if(record==1){
               map.put("code","1");
               map.put("id",employee.getId());
           }else if(record==3){
               map.put("code","3");
           }else{
               map.put("code","2");
           }
           return map;
    }

    @ResponseBody
    @RequestMapping(value = "/changeSite.json", method = { RequestMethod.POST,RequestMethod.GET })
    public Map<String,Object> changeSite(HttpServletRequest request,HttpServletResponse response,Model model,String id,
                           String delCode,String delSite) throws Exception {
        Employee employee=employeeService.selectByPrimaryKey(Integer.valueOf(id));
        employee.setDeliveryCode(delCode);
        employee.setAddress(delSite);
        int su=employeeService.updateByPrimaryKey(employee);
        Map<String,Object> map=new HashMap<>();
        if(su==1){
            map.put("code","1");
        }else{
            map.put("code","2");
        }
         return map;
    }
}
