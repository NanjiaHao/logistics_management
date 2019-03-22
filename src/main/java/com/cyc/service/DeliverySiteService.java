package com.cyc.service;

import com.cyc.pojo.DeliverySite;

import java.util.List;

public interface DeliverySiteService {

    int addDelivery(DeliverySite site);

    int updateDelivery(DeliverySite site);

    DeliverySite getSite(Integer id);

     List<DeliverySite> getPointList(int index,int limit);
}
