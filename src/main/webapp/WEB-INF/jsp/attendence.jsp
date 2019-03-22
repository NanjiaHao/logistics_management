<%@ page pageEncoding="UTF-8" contentType="text/html;charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/common/taglibs.jsp"%>

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!-- begin 页面头部信息 -->
<head>
    <meta charset="utf-8" />
    <title>查询付款</title>
    <%@ include file="/WEB-INF/jsp/common/head.jsp"%>
    <style type="text/css">
        .amountC {
            text-align: right;
            /*position:absolute;*/
            left: 50%;
            top: 50%;
            /* margin-top:-150px;  */
        }

        .moneys {
            display: inline-block;
            text-align: right;
            vertical-align: middle;
        }

        .currency {
            display: inline-block;
            margin-left: 3px;
            vertical-align: middle;
        }

        #ermPayFilmListTable td {
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        #ermPayFilmListTable a:hover {
            color: #3175af;
        }

        #clickVendor {
            position: relative;
            top: -23px;
            margin-left: 380px;
        }

        #clickDept {
            position: relative;
            top: -23px;
            margin-left: 380px;
        }

        .autocomplete-suggestion {
            margin-left: 10px;
        }

        .autocomplete-suggestions {
            background: rgb(255, 255, 255);
        }

        .autocomplete-selected {
            cursor: pointer;
            color: #ff6c00;
            background-color: #dfdfdf;
        }

        .autocomplete-suggestions {
            background: rgb(255, 255, 255);
        }

        .autocomplete-selected {
            cursor: pointer;
            color: #ff6c00;
            background-color: #dfdfdf;
        }

        .autocomplete-suggestion {
            margin-left: 10px;
        }

        .td {
            text-align: center;
        }

        .portlet .tipSty {
            padding-top: 35px;
        }
    </style>
</head>
<!-- end 页面头部信息 -->
<!-- begin 页面主体信息 -->
<body class="body-search-page">
<!-- BEGIN FORM-->
<form class="form-horizontal" id="ermPayFilmListForm" action="${ctx}/inv/invReportExcel.json" method="post">
    <input type="hidden" name="paymentCompanyName" value="${paymentCompanyName}" />
    <input type="hidden" name="auditor" value="${auditor}" />
    <input type="hidden" name="auditBeginDate" value="${auditBeginDate}" />
    <input type="hidden" name="auditEndDate" value="${auditEndDate}" />
    <input type="hidden" name="isFlag" value="${isFlag}" />
    <div class="portlet">
        <div>
            <input type="image" src="${ctx}/static/app/img/button-export-nor.gif" onclick="doExportAddTax();"
                   style="width: 67; height: 31;" value="导出" />
        </div>
        <div class="portlet-body form-horizontal tipSty">
            <div class="form-body">
                <div class="row">
                    <div class="col-md-12" style="padding-left: 15px; padding-right: 15px;">
                        <table class="table table-condensed table-bordered table-hover" id="ermPayFilmListTable"
                               style="table-layout: fixed;">
                            <thead>
                            <tr role="row" class="heading">
                                <th width="20">序号</th>
                                <th width="50">付款单号</th>
                                <th width="150">销售方名称</th>
                                <th width="65">发票号码</th>
                                <th width="50">金额</th>
                                <th width="50">税额</th>
                                <th width="65">价税合计</th>
                                <th width="50">开票日期</th>
                                <th width="65">确认日期</th>
                                <th width="150">费用类型</th>
                                <th width="150">备注</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:if test="${not empty list }">
                            <c:forEach var="element" items="${list}" varStatus="idx">
                            <tr>
                                <td>${idx.index +1}</td>
                                <td>${element.paymentNumber}</td>
                                <td>${element.xfmc}</td>
                                <td>${element.fphm}</td>
                                <td>${element.je}</td>
                                <td>${element.se}</td>
                                <td>${element.jshj}</td>
                                <td>${element.kprq}</td>
                                <td>${element.qrrq}</td>
                                <td>${element.billType}</td>
                                <td>${element.bz}</td>
                            <tr>
                                </c:forEach>
                                </c:if>
                            </tbody>
                            <c:if test="${empty list }">
                                <tbody>
                                <tr>
                                    <td colspan="5">无数据信息！</td>
                                </tr>
                                </tbody>
                            </c:if>
                        </table>
                    </div>
                </div>
                <!--/row-->
            </div>
        </div>
        <!--end 付费剧集维护 -->
    </div>
    <!--END portlet -->
</form>
<!-- END FORM-->

<%@ include file="/WEB-INF/common/js.jsp"%>
<script type="text/javascript">
    function doExportAddTax(){
        $("#ermPayFilmListForm").submit();

    }


</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- end 页面主体信息 -->
</html>