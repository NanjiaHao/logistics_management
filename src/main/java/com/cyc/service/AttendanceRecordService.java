package com.cyc.service;

import com.cyc.pojo.AttendanceRecord;

import java.util.List;

public interface AttendanceRecordService {
    public int addRecord(AttendanceRecord record);

    public AttendanceRecord getRecord(Integer id);

    public List<AttendanceRecord> getRecords(String empCode, Integer index, Integer limit);

    AttendanceRecord getRecordByEmpCode(String empCode);

}
