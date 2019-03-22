package com.cyc.service.imp;

import com.cyc.common.Constants;
import com.cyc.dao.AdministratorMapper;
import com.cyc.dao.EmployeeMapper;
import com.cyc.dao.OrderMapper;
import com.cyc.dao.UserMapper;
import com.cyc.pojo.*;
import com.cyc.service.AdminService;
import com.cyc.util.CodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    AdministratorMapper administratorMapper;

    @Autowired
    EmployeeMapper employeeMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    OrderMapper orderMapper;

    @Autowired
    AttendanceRecordServiceImpl recordService;

    @Override
    public boolean addEmployee(Employee employee) {

        int insert = employeeMapper.insert(employee);
        if(insert>0){
            return true;
        }
        return false;
    }
    @Override
    public Employee getEmployee(Integer id){
        return employeeMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Employee> getEmployeesByparams(String userCode, String userName,int index,int limit) {

        return employeeMapper.getEmployeesByParams(userCode,userName,index,limit);
    }

    @Override
    public Administrator getAdministrator(String userName, String password) {
        return administratorMapper.selectAdmin(userName,password);
    }

    @Override
    public List<AttendanceRecord> getAttendanceRecords(String empCode,Integer index,Integer limit) {

        return recordService.getRecords(empCode,index,limit);
    }

    @Override
    public User getUser(Integer id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<User> getUsersByparams(String userCode, String userName, int index, int limit) {

        return userMapper.getUsersByParams(userCode,userName,index,limit);
    }

    @Override
    public List<Order> getOrdersByparams(int index, int limit,String userCode,String empCode) {

        return orderMapper.getOrdersByparams(index,limit,userCode,empCode);
    }

    @Override
    public Order getOrder(Integer id, String orderCode) {
        if(id!=null){
            return orderMapper.selectByPrimaryKey(id.longValue());
        }
        return orderMapper.selectByOrderCode(orderCode);
    }


}
