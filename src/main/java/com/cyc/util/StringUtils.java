package com.cyc.util;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

/**
 * 
 * <b>字符串工具类</b><br>
 * 
 * GeBing 2012-11-12 下午3:05:46
 * 
 * @version 1.0.0
 * 
 */
public class StringUtils extends org.apache.commons.lang.StringUtils {

  public static String firstToLowerCase(String str) {
    if (str != null && str.length() != 0) {
      return Character.toLowerCase(str.charAt(0)) + str.substring(1);
    }
    return str;
  }

  public static String firstToUpperCase(String str) {
    if (str != null && str.length() != 0) {
      return Character.toUpperCase(str.charAt(0)) + str.substring(1);
    }
    return str;
  }
  
  /**
   * 将页面或PO字段转换成全大写并以下划线分隔的数据库字段
   * @param param 例如： custName
   * @return 换换后字符串  CUST_NAME
   */
  public static String capitalConvertUnderline(String dtoName){
      StringBuffer sub = null;
      if(StringUtils.isNotEmpty(dtoName)){
        char[] ch = dtoName.toCharArray();
        sub = new StringBuffer();
        String temp = null; //
        for (int i = 0; i < dtoName.length(); i++) {
          temp = String.valueOf(ch[i]);
          if(StringUtils.isNotEmpty(temp) && Character.isUpperCase(ch[i])){
            sub.append("_" + ch[i]);
          }else{
            sub.append(ch[i]);
          }
        }
        return sub.toString().toUpperCase();
      }
      return null;
  }

}
