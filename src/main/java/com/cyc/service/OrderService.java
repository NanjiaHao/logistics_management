package com.cyc.service;

import com.cyc.pojo.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderService {
    Long createOrder(Order order);

    List<Order> getOrder(int index, int limit, String emoCode);

    Order getOrderByOrderCode(String orderCode);

    Long queryOrderCount();

    List<Order> selectByEmpCode(String empCode);
}
