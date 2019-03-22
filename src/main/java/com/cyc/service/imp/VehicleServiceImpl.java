package com.cyc.service.imp;

import com.cyc.dao.UserMapper;
import com.cyc.dao.VehicleMapper;
import com.cyc.pojo.Vehicle;
import com.cyc.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    VehicleMapper vehicleMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return 0;
    }

    @Override
    public int insert(Vehicle record) {
        return vehicleMapper.insert(record);
    }

    @Override
    public int insertSelective(Vehicle record) {
        return 0;
    }

    @Override
    public Vehicle selectByPrimaryKey(Integer id) {
        return vehicleMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(Vehicle record) {
        return 0;
    }

    @Override
    public int updateByPrimaryKey(Vehicle record) {
        return vehicleMapper.updateByPrimaryKey(record);
    }

    @Override
    public Long queryCarCount() {
        return vehicleMapper.queryCarCount();
    }

    @Override
    public List<Vehicle> getCarList(int index, int limit) {
        return vehicleMapper.getCarList(index,limit);
    }
}
