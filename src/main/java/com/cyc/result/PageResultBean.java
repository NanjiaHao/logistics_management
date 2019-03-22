package com.cyc.result;

/**
 * 返回对象包装类(带泛型)
 * 
 * @author menghu
 */
public class PageResultBean<T> extends ResultBean<T> {

    private static final long serialVersionUID = 1L;

    private long draw;

    private long recordsTotal;

    private long recordsFiltered;

    /**
     * 返回的数据
     */

    public long getDraw() {
        return draw;
    }

    public void setDraw(long draw) {
        this.draw = draw;
    }

    public long getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(long recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public long getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(long recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

}
