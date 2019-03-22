package com.cyc.dao;

import com.cyc.pojo.Vehicle;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface VehicleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Vehicle record);

    int insertSelective(Vehicle record);

    Vehicle selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Vehicle record);

    int updateByPrimaryKey(Vehicle record);

    Long queryCarCount();

    List<Vehicle> getCarList(@Param("index") int index, @Param("limit") int limit);
}