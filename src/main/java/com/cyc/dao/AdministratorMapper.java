package com.cyc.dao;

import com.cyc.pojo.Administrator;
import org.apache.ibatis.annotations.Param;

public interface AdministratorMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Administrator record);

    int insertSelective(Administrator record);

    Administrator selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Administrator record);

    int updateByPrimaryKey(Administrator record);

    Administrator selectAdmin(@Param("userName") String userName, @Param("password") String password);
}