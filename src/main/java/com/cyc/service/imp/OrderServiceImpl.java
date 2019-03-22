package com.cyc.service.imp;

import com.cyc.dao.OrderMapper;
import com.cyc.pojo.Order;
import com.cyc.service.OrderService;
import com.cyc.util.CodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderMapper orderMapper;

    @Override
    public Long createOrder(Order order) {
        String orderCode = CodeUtil.genRandomNum();
        order.setOrderCode(orderCode);
        orderMapper.insertSelective(order);
        return order.getId();
    }

    @Override
    public List<Order> getOrder(int index,int limit,String empCode) {
        index = (index-1)*limit;
        return orderMapper.getOrdersByparams(index,limit,null,empCode);
    }

    @Override
    public Order getOrderByOrderCode(String orderCode) {
        return orderMapper.selectByOrderCode(orderCode);
    }

    @Override
    public Long queryOrderCount() {
        return orderMapper.queryOrderCount();
    }

    @Override
    public List<Order> selectByEmpCode(String empCode) {
        return orderMapper.selectByEmpCode(empCode);
    }


}
