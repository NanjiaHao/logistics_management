package com.cyc.dao;

import com.cyc.pojo.Employee;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface EmployeeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Employee record);

    int insertSelective(Employee record);

    Employee selectByPrimaryKey(@Param("id")Integer id);

    int deleteByKey(Employee record);

    int updateByPrimaryKey(Employee record);

    List<Employee> getEmployeesByParams(@Param("code") String code, @Param("name") String name,@Param("index") int index, @Param("limit")int limit);

    Employee checkEmpLogin(@Param("empName") String empName,@Param("password") String password);

    Long queryEmployeeCount();

    List<String> getEmpCode();

}