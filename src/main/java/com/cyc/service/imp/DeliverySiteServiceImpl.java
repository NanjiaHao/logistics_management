package com.cyc.service.imp;

import com.cyc.dao.DeliverySiteMapper;
import com.cyc.dao.VehicleMapper;
import com.cyc.pojo.DeliverySite;
import com.cyc.service.DeliverySiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliverySiteServiceImpl implements DeliverySiteService {

    @Autowired
    DeliverySiteMapper siteMapper;

    @Override
    public int addDelivery(DeliverySite site) {
        return siteMapper.insertSelective(site);
    }

    @Override
    public int updateDelivery(DeliverySite site) {
        return siteMapper.updateByPrimaryKey(site);
    }

    @Override
    public DeliverySite getSite(Integer id) {
        return siteMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<DeliverySite> getPointList(int index, int limit) {
        return siteMapper.getPointList(index,limit);
    }

}
