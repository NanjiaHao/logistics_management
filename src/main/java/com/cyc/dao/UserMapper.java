package com.cyc.dao;

import com.cyc.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User getUserByName(Map<String,Object> paramMap);

    User getUser(@Param("userName") String userName, @Param("password") String password);

    List<User> getUsersByParams(@Param("userCode") String userCode, @Param("userName") String userName, @Param("index")int index, @Param("limit")int limit);

    Long queryUserCount();
}