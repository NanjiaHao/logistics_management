package com.cyc.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

public class CodeUtil {

    public static String buildCodeNo() {
        Date date = Calendar.getInstance().getTime();
        StringBuffer format = new StringBuffer(new SimpleDateFormat("MMddHHmmss").format(date));
        String payOrderCode = format.insert(4, 2).toString();
        return payOrderCode;
    }

    public static String genRandomNum(){
        int  maxNum = 36;
        int i;
        int count = 0;
        char[] str = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
                'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
        StringBuffer pwd = new StringBuffer("");
        Random r = new Random();
        while(count < 12){
            i = Math.abs(r.nextInt(maxNum));
            if (i >= 0 && i < str.length) {
                pwd.append(str[i]);
                count ++;
            }
        }
        return pwd.toString();
    }

    public static void main(String args[]){
        String s = genRandomNum();
        String s1 = buildCodeNo();
        System.out.println("s="+s);
        System.out.println("s1="+s1);
    }
}
