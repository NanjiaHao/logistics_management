package com.cyc.dao;

import com.cyc.pojo.DeliverySite;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DeliverySiteMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DeliverySite record);

    int insertSelective(DeliverySite record);

    DeliverySite selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DeliverySite record);

    int updateByPrimaryKey(DeliverySite record);

    List<DeliverySite> getPointList(@Param("index") int index, @Param("limit") int limit);

}