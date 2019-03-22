package com.cyc.util;

import org.apache.poi.hssf.usermodel.*;

import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Field;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ExportUtils {
    public static <T> void exportToExcel(List<T> list, Class<T> clazz, String fileName, List<String> headers, List<String> columns,
                                         HttpServletResponse response, String pattern) throws Exception {

        response.setContentType("application/vnd.ms-excel");
        response.addHeader("content-Disposition",
                "attachment;fileName=" + URLEncoder.encode(fileName, "UTF-8") + ".xls");

        // 创建Excel文件对应的对象
        HSSFWorkbook hssfWorkbook = new HSSFWorkbook();
        // 创建一个sheet页
        HSSFSheet hssfSheet = hssfWorkbook.createSheet();
        // 设置表格默认宽度
        hssfSheet.setDefaultColumnWidth(20);
        //标题样式
        HSSFCellStyle headerStyle = hssfWorkbook.createCellStyle();
        headerStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        headerStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        headerStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
        headerStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
        headerStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        //字体
        HSSFFont hssfFont = hssfWorkbook.createFont();
        hssfFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        headerStyle.setFont(hssfFont);
        //表格样式
        HSSFCellStyle cellStyle = hssfWorkbook.createCellStyle();
        cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
        cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
        cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
        cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        // 通过sheet创建row
        HSSFRow hssfRow = hssfSheet.createRow(0);
        // 产生表格标题行
        for (int i = 0; i < headers.size(); i++) {
            HSSFCell cellHeader = hssfRow.createCell(i);
            cellHeader.setCellStyle(headerStyle);
            cellHeader.setCellValue(new HSSFRichTextString(headers.get(i)));
        }

        // 格式化时间
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        String compile = "^//d+(//.//d+)?$";
        Pattern p = Pattern.compile(compile);
        for (int i = 0; i < list.size(); i++) {
            T type = list.get(i);
            HSSFRow hssfRow1 = hssfSheet.createRow(i + 1);
            for (int j = 0; j < columns.size(); j++) {
                // 通过row创建cell
                HSSFCell hssfCell = hssfRow1.createCell(j);
                // 设置样式
                hssfCell.setCellStyle(cellStyle);

                try {
                    Field field = clazz.getDeclaredField(columns.get(j));
                    field.setAccessible(true);
                    Object value = field.get(type);
                    // 判断值的类型后进行强制类型转换
                    // 给单元格写入数据
                    String textValue = null;
                    if (value instanceof Integer) {
                        hssfCell.setCellValue((Integer) value);
                    } else if (value instanceof Float) {
                        textValue = String.valueOf((Float) value);
                        hssfCell.setCellValue(textValue);
                    } else if (value instanceof Double) {
                        textValue = String.valueOf((Double) value);
                        hssfCell.setCellValue(textValue);
                    } else if (value instanceof Long) {
                        hssfCell.setCellValue((Long) value);
                    }
                    if (value instanceof Boolean) {
                        textValue = "是";
                        if (!(Boolean) value) {
                            textValue = "否";
                        }
                        hssfCell.setCellValue(textValue);
                    } else if (value instanceof Date) {
                        textValue = sdf.format((Date) value);
                        hssfCell.setCellValue(textValue);
                    } else {
                        // 其它数据类型都当作字符串简单处理
                        if (value != null) {
                            textValue = value.toString();
                            hssfCell.setCellValue(textValue);
                        }
                    }
                    if (textValue != null) {
                        Matcher matcher = p.matcher(textValue);
                        if (matcher.matches()) {
                            // 是数字当作double处理
                            hssfCell.setCellValue(Double.parseDouble(textValue));
                        } else {
                            HSSFRichTextString richTextString = new HSSFRichTextString(textValue);
                            hssfCell.setCellValue(richTextString);
                        }
                    }
                } catch (SecurityException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (IllegalArgumentException e) {
                    e.printStackTrace();
                }
            }
        }
        hssfWorkbook.write(response.getOutputStream());
    }
}
