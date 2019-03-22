package com.cyc.service;

import com.cyc.pojo.AttendanceRecord;
import com.cyc.pojo.Employee;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface EmployeeService {
    int insert(Employee employee);
    boolean addRecord(AttendanceRecord record);
    Employee checkEmpLogin(String empName,String password);
    Employee selectByPrimaryKey(@Param("id")Integer id);
    List<String> getEmpCod();
    int updateByPrimaryKey(Employee record);
    int deleteByKey(Employee record);
}
