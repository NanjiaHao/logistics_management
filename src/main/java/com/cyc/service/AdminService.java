package com.cyc.service;

import com.cyc.pojo.*;

import java.util.List;

public interface AdminService {
    boolean addEmployee(Employee employee);


    Employee getEmployee(Integer id);


    List<Employee> getEmployeesByparams(String code, String name, int index, int limit);

    Administrator getAdministrator(String userName, String password);

    List<AttendanceRecord> getAttendanceRecords(String empCode, Integer index, Integer limit);

    User getUser(Integer id);

    List<User> getUsersByparams(String userCode, String userName, int index, int limit);

    List<Order> getOrdersByparams(int index, int limit, String userCode, String empCode);

    Order getOrder(Integer id, String orderCode);
}
