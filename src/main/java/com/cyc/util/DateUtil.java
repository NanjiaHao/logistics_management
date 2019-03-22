package com.cyc.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static final String DEFAULT_DATE_FORMAT = "dd/MM/yyyy";
    public static final String DEFAULT_DATETIME_FORMAT1 = "yyyy-MM-dd HH:mm:ss";



    /* public static Date parseDate(String s) {
        try {
            return sdf.parse(s);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }*/
    public static Date getDate(String date) {
        return getDate(date, DEFAULT_DATE_FORMAT, null);
    }

    public static Date getDate(String date, String format, Date defVal) {
        Date d;
        try {
            d = new SimpleDateFormat(format).parse(date);
        } catch (ParseException e) {
            d = defVal;
        }
        return d;
    }

    public static String formatDate1(Date date) {
        return formatDate(date, DEFAULT_DATE_FORMAT, "");
    }

    public static String formatDate(Date date) {
        return formatDate(date, DEFAULT_DATETIME_FORMAT1, "");
    }
    public static String formatDate(Date date, String format, String defVal) {
        String ret;
        try {
            ret = new SimpleDateFormat(format).format(date);
        } catch (Exception e) {
            ret = defVal;
        }
        return ret;
    }
}
