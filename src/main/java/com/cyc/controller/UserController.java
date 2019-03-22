package com.cyc.controller;

import com.cyc.pojo.User;
import com.cyc.result.PageResultBean;
import com.cyc.service.AdminService;
import com.cyc.service.UserService;
import com.cyc.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Controller
public class UserController {
    @Autowired
    public UserService userService;
    @Autowired
    public AdminService adminService;

    @RequestMapping(value = "/register.json",method = { RequestMethod.POST, RequestMethod.GET })
    @ResponseBody
    public Map<String,Object> register(HttpServletRequest request, HttpServletResponse response){
        HashMap<String,Object> dataMap = new HashMap<>();
        String userName=request.getParameter("username");
        String password=request.getParameter("password");
        String telephone=request.getParameter("telephone");
        User user=new User();
        user.setNickName(userName);
        user.setUserName(userName);
        user.setPassword(password);
        user.setTeleNum(telephone);
        dataMap.put("userName",userName);
        User user1=userService.getUserByName(dataMap);
        dataMap.clear();
        if(user1 !=null){
            dataMap.put("code","0");
        }else {
            boolean falg = userService.register(user);
            if (falg) {
                dataMap.put("code", "1");
            } else {
                dataMap.put("code", "2");
            }
        }
        return dataMap;
    }
    @RequestMapping(value = "/userLogin.json",method = { RequestMethod.POST, RequestMethod.GET })
    @ResponseBody
    public Map<String,Object> login(HttpServletRequest request, HttpServletResponse response){
        HashMap<String,Object> map = new HashMap<>();
        String userName=request.getParameter("username");
        String password=request.getParameter("password");
        User user= userService.login(userName,password);
        if(user==null){
         map.put("code","1");//密码或用户名错误
        }else{
         map.put("code","2");
         map.put("id",user.getId());//登录成功
         map.put("name",user.getNickName());
        }
        return map;
    }
}
