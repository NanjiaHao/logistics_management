package com.cyc.service;

import com.cyc.pojo.User;

import java.util.Map;

public interface UserService {

    User login(String userName, String password);

    boolean register(User user);

    User getUserByName(Map paramMap);

    Long queryUserCount();
}
