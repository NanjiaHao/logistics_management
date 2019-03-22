package com.cyc.service.imp;

import com.cyc.dao.UserMapper;
import com.cyc.pojo.User;
import com.cyc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public User login(String userName, String password) {
        return userMapper.getUser(userName,password);
    }

    @Override
    public boolean register(User user) {
        int i = userMapper.insertSelective(user);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public User getUserByName(Map paramMap) {
        return userMapper.getUserByName(paramMap);
    }

    @Override
    public Long queryUserCount() {
        return userMapper.queryUserCount();
    }

}
