package com.cyc.dao;

import com.cyc.pojo.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

    List<Order> getOrdersByparams(@Param("index")int index, @Param("limit")int limit, @Param("userCode") String userCode, @Param("empCode") String empCode);

    Order selectByOrderCode(String orderCode);

    Long queryOrderCount();

    List<Order> selectByEmpCode(@Param("empCode")String empCode);
}