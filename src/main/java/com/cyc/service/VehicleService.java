package com.cyc.service;

import com.cyc.pojo.Vehicle;

import java.util.List;

public interface VehicleService {
    int deleteByPrimaryKey(Integer id);

    int insert(Vehicle record);

    int insertSelective(Vehicle record);

    Vehicle selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Vehicle record);

    int updateByPrimaryKey(Vehicle record);

    Long queryCarCount();

    List<Vehicle> getCarList(int index, int limit);
}
