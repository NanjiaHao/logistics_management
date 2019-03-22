package com.cyc.service.imp;

import com.cyc.dao.AttendanceRecordMapper;
import com.cyc.dao.EmployeeMapper;
import com.cyc.pojo.AttendanceRecord;
import com.cyc.pojo.Employee;
import com.cyc.service.EmployeeService;
import com.cyc.util.CodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    AttendanceRecordMapper recordMapper;
    @Autowired
    EmployeeMapper employeeMapper;

    @Override
    public int insert(Employee employee) {
        String empCode = CodeUtil.genRandomNum();
        employee.setCode(empCode);
        return employeeMapper.insert(employee);
    }

    @Override
    public boolean addRecord(AttendanceRecord record) {
        int i = recordMapper.insertSelective(record);
        if(i>0)return true;
        return false;
    }

    @Override
    public Employee checkEmpLogin(String empName, String password) {
        return employeeMapper.checkEmpLogin(empName,password);
    }

    @Override
    public Employee selectByPrimaryKey(Integer id) {
        return employeeMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<String> getEmpCod() {
        return employeeMapper.getEmpCode();
    }

    @Override
    public int updateByPrimaryKey(Employee record) {
        return employeeMapper.updateByPrimaryKey(record);
    }

    @Override
    public int deleteByKey(Employee record) {
        return employeeMapper.deleteByKey(record);
    }
}
