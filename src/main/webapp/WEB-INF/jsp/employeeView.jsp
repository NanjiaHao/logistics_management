<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!DOCTYPE html>
<html lang="en" class="no-js">
<!-- begin 页面头部信息 -->
<head>
    <meta charset="utf-8" />
    <title>查看付款</title>
    <%@ include file="/WEB-INF/common/head.jsp"%>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resource/assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css" />" />
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="stylesheet" type="text/css"
          href="${ctx}/static/assets/global/plugins/bootstrap-datepicker/css/datepicker3.css" />
    <style type="text/css">
        body{
            background-color: #fdfdfd;
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

        #ermDramaKisQueryTable td {
            overflow: hidden;
            text-align: left;
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
        ul{
            list-style: none;
        }
        .is-scroll{
            height:400px;

            margin-bottom:10px;
        }

        /*审批流程图样式*/
        .approval-process{
            width: 96%;
            margin-left: 26px;
            min-height:126px;
            display:flex;
            position:relative;
            margin-top: 35px;
        }
        .approval-process .circle{
            position:relative;
            width: 12%;
        }
        .circle-l{
            width:14px;
            height:14px;
            border-radius:50% !important;

        }
        .stateBgGreen{
            background:#91BB48;
        }
        .stateBgOrange{
            background:#FDB61D;
        }
        .stateBgGray{
            background:#E1E1E2;
        }
        .circlePart{
            padding-left:7px;
        }
        .circle-info{
            margin-left: -46%;
            text-align: center;
            width: 100%;
        }
        .line{
            display: inline-block;
            width: 120px;
            height: 8px;
            position: absolute;
            top: 1%;
            left: 17%;
        }
        .line-green{
            background: #91BB48;
        }
        .line-gray{
            background:#E1E1E2;
        }
        .line-orange{
            background: #FDB61D;
        }
        .is-scroll{
            height:400px;


            margin-bottom:10px;
        }
        .is-body-scroll{
            height:100%;
            overflow-y:hidden;
        }
        .goNext {
            padding: 7px 30px 8px;
            margin-top: 20px;
        }

        .goNext {
            margin-left: 30px !important;
            color: #fff;
        }
        @media screen and (min-width:960px) and (max-width:1200px){
            .line{
                display: inline-block;
                width: 96px;
                height: 8px;
                position: absolute;
                top: 1%;
                left: 19%;
            }
        }
    </style>
</head>
<!-- end 页面头部信息 -->
<!-- begin 页面主体信息 -->
<body class="body-page is-body-scroll" >
<!--begin portlet -->
<div class="portlet">
    <!--/row-->
    <div class="tabbable">
        <!-- Togglable tabs  -->
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tab_staff" data-toggle="tab">员工管理</a></li>
            <input type="hidden" id="empId" value="${empId}"/>

        </ul>
        <!-- Togglable tabs  -->

        <div class="tab-content no-space is-scroll">
            <!-- 申请信息start -->
            <div class="tab-pane active" id="tab_staff">
                <div class="portlet-body form-horizontal" >
                    <div class="form-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="col-md-4" style="text-align: left; float: left;">
                                        <div class="form-group">
                                            <div class="col-md-1 col-md-offset-1">
                                                <button type="button" class="btn btn-circle blue attend">
                                                    <i class="fa fa-search"></i> 打卡
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-condensed table-bordered table-hover">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th>订单编号</th>
                                        <th>配送地址</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <c:if test="${not empty orderList}">
                                        <c:forEach items="${orderList }" var="item">
                                            <tr>
                                                <td>${item.orderCode }</td>
                                                <td>${item.shippingAddress }</td>
                                            </tr>
                                        </c:forEach>
                                    </c:if>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<%@ include file="/WEB-INF/common/js.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/pages/scripts/table-advanced.js"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/scripts/metronics.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script type="text/javascript">
</script>
<script type="text/javascript">
    jQuery(document).ready(function() {
        Metronic.init();  // init metronic core components
        Layout.init(); // init current layout
        QuickSidebar.init(); // init quick sidebar
        Demo.init(); // init demo features
        TableAdvanced.init();
    });
</script>

<script type="text/javascript">
    $(".attend").on("click", function() {
        var empId=$("#empId").val();
        $.ajax({
            type : "POST",
            url : "attend.html",
            async : false,
            data : {"empId" : empId},
            success : function(data) {
                if (data.code == 1) {
                    showMessage("打卡成功！");
                    var model_id = showMessage("打卡成功!", false);
                    $('#' + model_id).on('click', '.confirmOnly', function(e) {
                        window.location.href = "employeeView.html?id="+data.id;
                    });
                } else if(data.code == 2){
                    showMessage("打卡失败！");
                    return false;
                }else if(data.code == 3){
                    showMessage("今天已经打过卡！");
                    return false;
                }
            }
        });

    });
</script>



</body>
</html>