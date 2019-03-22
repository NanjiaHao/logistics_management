package com.cyc.dao;

import com.cyc.pojo.AttendanceRecord;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

public interface AttendanceRecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AttendanceRecord record);

    int insertSelective(AttendanceRecord record);

    AttendanceRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AttendanceRecord record);

    int updateByPrimaryKey(AttendanceRecord record);

    List<AttendanceRecord> getRecords(@Param("empCode")String empCode, @Param("index")Integer index, @Param("limit")Integer limit);

    AttendanceRecord getRecordByEmpCode(HashMap<String, Object> params);

}