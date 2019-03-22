package com.cyc.service.imp;

import com.cyc.dao.AttendanceRecordMapper;
import com.cyc.pojo.AttendanceRecord;
import com.cyc.service.AttendanceRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class AttendanceRecordServiceImpl implements AttendanceRecordService {

    @Autowired
    AttendanceRecordMapper recordMapper;

    @Override
    public int addRecord(AttendanceRecord record) {
        String empCode = record.getEmpCode();
        AttendanceRecord recordByEmpCode = this.getRecordByEmpCode(empCode);
        if(recordByEmpCode!=null){
            return 3;
        }
        return recordMapper.insertSelective(record);
    }

    @Override
    public AttendanceRecord getRecord(Integer id) {
        return recordMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<AttendanceRecord> getRecords(String empCode,Integer index,Integer limit) {
        return recordMapper.getRecords(empCode,index,limit);
    }

    @Override
    public AttendanceRecord getRecordByEmpCode(String empCode) {
        HashMap<String, Object> params = new HashMap<>();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.set(Calendar.HOUR, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        params.put("beginTime", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(calendar.getTime()));
        Calendar calendar1 = Calendar.getInstance();
        calendar1.setTime(new Date());
        calendar1.add(Calendar.DAY_OF_YEAR,1);
        calendar1.set(Calendar.HOUR_OF_DAY, 0);
        calendar1.set(Calendar.MINUTE, 0);
        calendar1.set(Calendar.SECOND, 0);
        params.put("endTime",new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(calendar1.getTime()));
        params.put("empCode",empCode);
        return recordMapper.getRecordByEmpCode(params);
    }

}
