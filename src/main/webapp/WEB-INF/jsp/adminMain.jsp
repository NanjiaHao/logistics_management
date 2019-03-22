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
                <li  class="active"><a href="#tab_staff" data-toggle="tab">员工管理</a></li>
                    <li><a href="#tab_point" data-toggle="tab">配送点管理</a></li>
                    <li><a href="#tab_car" data-toggle="tab">车辆管理</a></li>
                    <li><a href="#tab_order" data-toggle="tab">订单信息</a></li>
                    <li><a href="#tab_user" data-toggle="tab">用户信息</a></li>
                    <li><a href="#tab_attend" data-toggle="tab">打卡情况</a></li>
            </ul>
            <!-- Togglable tabs  -->

            <div class="tab-content no-space is-scroll">

                <!-- 申请信息start -->
                <div class="tab-pane active" id="tab_staff">
                    <form class="form-horizontal" id="employeeForm" action="/adminMain.html" method="post">
                    <div class="portlet-body form-horizontal" >
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="col-md-4" style="text-align: left; float: left;">
                                            <div class="form-group">
                                                <label class="control-label col-md-3">员工姓名：</label>
                                                <div class="col-md-3">
                                                    <input type="text" class="form-control" name="name">
                                                </div>
                                                <div class="col-md-1 col-md-offset-1">
                                                    <button type="button" class="btn btn-circle blue employeeQuery">
                                                        <i class="fa fa-search"></i> 查询
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-8" style="text-align: right; float: right;">
                                            <button type="button" class="btn btn-circle btn-default empCreate">
                                                <i class="fa fa-plus-square fa-green"></i> 新增
                                            </button>
                                            <button type="button" class="btn btn-circle btn-default empEdit">
                                                <i class="fa fa-edit fa-yellow"></i> 修改
                                            </button>
                                            <button type="button" class="btn btn-circle btn-default empDelete">
                                                <i class="fa fa-trash-o fa-red"></i> 删除
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                        <div class="col-md-12">
                            <table class="table table-condensed table-bordered table-hover" id="employeeTable">
                                <thead>
                                <tr role="row" class="heading">
                                    <th></th>
                                    <th>员工姓名</th>
                                    <th>员工编号</th>
                                    <th>性别</th>
                                    <th>电话</th>
                                    <th>分配点分配</th>
                                </tr>
                                </thead>
                                <tbody>
                                <c:if test="${not empty employeeList}">
                                <c:forEach items="${employeeList }" var="item">
                                    <tr>
                                        <td>
                                            <input type="checkbox" name="empCheck"/>
                                            <input type="hidden" name="empCode" value="${item.id }"/>
                                        </td>
                                        <td>${item.name }</td>
                                        <td>${item.code }</td>
                                        <td>
                                            <c:if test="${item.gender ==0}">
                                                男
                                            </c:if>
                                            <c:if test="${item.gender ==1}">
                                                女
                                            </c:if>

                                        </td>
                                        <td>${item.teleNum }</td>
                                        <td>
                                            <select class="form-control selectPoint" name="point" id="point${item.id}" onchange="pointChange(this)">
                                                <option>请选择</option>  
                                          <c:forEach var="point" items="${pointList}">
                                         <option value="${point.deliveryCode}" <c:if test="${item.deliveryCode==point.deliveryCode}">selected </c:if>>${point.deliveryAddress}</option>  
                                          </c:forEach>  
                                             </select> 
                                        </td>
                                    </tr>
                                </c:forEach>
                                </c:if>
                                </tbody>
                              </table>
                            </div>
                            </div>
                         </div>
                    </div>
                    </form>
                </div>

                <div class="tab-pane" id="tab_point">
                    <form class="form-horizontal" id="pointListForm" method="post">
                    <div class="portlet-body form-horizontal" >
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="col-md-8" style="text-align: right; float: right;">
                                            <button type="button" class="btn btn-circle btn-default pointCreate">
                                                <i class="fa fa-plus-square fa-green"></i> 新增
                                            </button>
                                            <button type="button" class="btn btn-circle btn-default pointEdit">
                                                <i class="fa fa-edit fa-yellow"></i> 修改
                                            </button>
                                            <button type="button" class="btn btn-circle btn-default pointDelete">
                                                <i class="fa fa-trash-o fa-red"></i> 删除
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table table-condensed table-bordered table-hover" id="pointTable">
                                        <thead>
                                        <tr role="row" class="heading">
                                            <th></th>
                                            <th>编号</th>
                                            <th>地址</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <c:if test="${not empty pointList}">
                                        <c:forEach items="${pointList }" var="item">
                                            <tr>
                                                <td><input type="checkbox" name="pointCheck"/>
                                                    <input type="hidden" name="pointCode" value="${item.id}"/>
                                                </td>
                                                <td>${item.deliveryCode }</td>
                                                <td>${item.deliveryAddress }</td>
                                            </tr>
                                        </c:forEach>
                                        </c:if>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>

                <div class="tab-pane" id="tab_car">
                    <form class="form-horizontal" id="carListForm" method="post">
                    <div class="portlet-body form-horizontal" >
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="col-md-8" style="text-align: right; float: right;">
                                            <button type="button" class="btn btn-circle btn-default carCreate">
                                                <i class="fa fa-plus-square fa-green"></i> 新增
                                            </button>
                                            <button type="button" class="btn btn-circle btn-default carEdit">
                                                <i class="fa fa-edit fa-yellow"></i> 修改
                                            </button>
                                            <button type="button" class="btn btn-circle btn-default carDelete">
                                                <i class="fa fa-trash-o fa-red"></i> 删除
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table table-condensed table-bordered table-hover" id="carTable">
                                        <thead>
                                        <tr role="row" class="heading">
                                            <th></th>
                                            <th>车牌号</th>
                                            <th>负责员工号</th>
                                            <th>车辆状态</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <c:if test="${not empty carList}">
                                        <c:forEach items="${carList }" var="item">
                                            <tr>
                                                <td>
                                                    <input type="checkbox" name="carCheck"/>
                                                    <input type="hidden" name="carCode" value="${item.id}"/>
                                                </td>
                                                <td>${item.vehicleCode }</td>
                                                <td>${item.employeeCode }</td>
                                                <td>
                                                    <c:if test="${item.vehicleStatus==0}">
                                                     空闲
                                                    </c:if>
                                                    <c:if test="${item.vehicleStatus==1}">
                                                    途中
                                                    </c:if>
                                                    <c:if test="${item.vehicleStatus==2}">
                                                     维修中
                                                    </c:if>
                                                </td>
                                            </tr>
                                        </c:forEach>
                                        </c:if>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>

               <div class="tab-pane" id="tab_order">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="fa fa-bookmark font-blue"></i>订单信息
                        </div>
                    </div>
                    <form class="form-horizontal" id="orderListForm" action="/exportOrder.json" method="post">
                    <div class="portlet-body form-horizontal" >
                        <div class="form-body">
                       <div class="row">
                           <div class="col-md-12">
                               <div class="form-group">
                                   <div class="col-md-8" style="text-align: right; float: right;">
                                       <button type="button" class="btn btn-circle btn-default copy" onclick="copyOrder();">
                                           <i class="fa fa-search fa-blue"></i>导出订单</button>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class="row">

                        <div class="col-md-12">
                            <table class="table table-condensed table-bordered table-hover" id="orderListTable">
                                <thead>
                                <tr role="row" class="heading">
                                    <th>订单号</th>
                                    <th>姓名</th>
                                    <th>配送地址</th>
                                    <th>物品</th>
                                   <%-- <th>期望配送时间</th>--%>
                                </tr>
                                </thead>
                                <tbody>
                                <c:if test="${not empty orderList}">
                                <c:forEach items="${orderList}" var="item">
                                    <tr>
                                        <td>${item.orderCode}</td>
                                        <td>${item.nickName}</td>
                                        <td>${item.shippingAddress}</td>
                                        <td>${item.goodsName}</td>
                                      <%--  <td>${item.exptimeStr}</td>--%>
                                    </tr>
                                </c:forEach>
                                </c:if>
                                </tbody>
                            </table>
                        </div>
                       </div>
                        </div>
                    </div>
                    </form>
                </div>

                <div class="tab-pane" id="tab_user">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-bookmark font-blue"></i>用户信息
                            </div>
                        </div>
                    <form class="form-horizontal" id="userListForm" method="post">
                        <div class="portlet-body form-horizontal" >
                            <div class="col-md-12">
                                <table class="table table-condensed table-bordered table-hover" id="userListTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th>用户姓名</th>
                                        <th>密码</th>
                                        <th>电话</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <c:if test="${not empty userList}">
                                    <c:forEach items="${userList}" var="item">
                                        <tr>
                                            <td>${item.nickName}</td>
                                            <td>${item.password}</td>
                                            <td>${item.teleNum}</td>
                                        </tr>
                                    </c:forEach>
                                    </c:if>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="tab-pane" id="tab_attend">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="fa fa-bookmark font-blue"></i>打卡情况
                        </div>
                    </div>
                    <form class="form-horizontal" id="attendForm" action="/exportWork.json" method="post">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="col-md-8" style="text-align: right; float: right;">
                                            <button type="button" class="btn btn-circle btn-default copy" onclick="exportWork();">
                                                <i class="fa fa-search fa-blue"></i>打印考勤表</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">

                            <div class="col-md-12">
                                <table class="table table-condensed table-bordered table-hover" id="attendTable">
                                    <thead>
                                    <tr role="row" class="heading">
                                        <th>员工号</th>
                                        <th>打卡日期</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <c:if test="${not empty attendanceRecordList}">
                                    <c:forEach items="${attendanceRecordList }" var="item">
                                        <tr>
                                            <td>${item.empCode}</td>
                                            <td>${item.attendanceTimeStr}</td>
                                        </tr>
                                    </c:forEach>
                                    </c:if>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
                <!-- 付款情况end -->
            </div>
        </div>
    </div>


<%@ include file="/WEB-INF/common/js.jsp"%>
<%--
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/logistics/user.js"></script>
--%>
<%--<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/logistics/car.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/logistics/point.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/logistics/employee.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/logistics/order.js"></script>--%>
<%--
<script src="${pageContext.request.contextPath}/resource/assets/admin/pages/scripts/table-advanced.js"></script>
--%>
<script src="${pageContext.request.contextPath}/resource/assets/global/scripts/metronics.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
    <script type="text/javascript">
        jQuery(document).ready(function() {
            Metronic.init();  // init metronic core components
            Layout.init(); // init current layout
            QuickSidebar.init(); // init quick sidebar
            Demo.init(); // init demo features
            TableAdvanced.init();
        });

    </script>
    <script>

        $(".empCreate").on("click", function() {
            window.location.href = "addEmpPage.html";
        });
        $(".carCreate").on("click", function() {
            window.location.href = "addCarPage.html";
        });
        $(".pointCreate").on("click", function() {
            window.location.href = "addPointPage.html";
        });
        //车辆修改
        $(".carEdit").on("click", function() {
            var _cid=$("#carTable input[type='checkbox']:checked");
            if(_cid.length==0){
                showMessage("请选择要修改的车辆！");
                return false;
            }
            if(_cid.length>1){
                showMessage("请选择一个车辆！");
                return false;
            }
            var car_input = $("#carTable input[type='checkbox']:checked").parent().parent().parent();
            var carCode = car_input.find("[name=carCode]").val();
            window.location.href = "addCarPage.html?id="+carCode;
        });
        //车辆删除
        $(".carDelete").on("click", function() {
            var _cid=$("#carTable input[type='checkbox']:checked");
            if(_cid.length==0){
                showMessage("请选择要修改的车辆！");
                return false;
            }
            if(_cid.length>1){
                showMessage("请选择一个车辆！");
                return false;
            }
            var j_input = $("#carTable input[type='checkbox']:checked").parent().parent().parent();
            var code = j_input.find("[name=carCode]").val();

            var model_id = showMessage("你确定要删除吗？!", false);
            $('#' + model_id).on('click', '.confirmOnly', function(e) {
                window.location.href = "delCar.html?id="+code;
            });
        });
        //分配点修改
        $(".pointEdit").on("click", function() {
            var _cid=$("#pointTable input[type='checkbox']:checked");
            if(_cid.length==0){
                showMessage("请选择要修改的地点！");
                return false;
            }
            if(_cid.length>1){
                showMessage("请选择一个地点！");
                return false;
            }
            var car_input = $("#pointTable input[type='checkbox']:checked").parent().parent().parent();
            var pointCode = car_input.find("[name=pointCode]").val();
            window.location.href = "addPointPage.html?id="+pointCode;
        });
        //分配点删除
        $(".pointDelete").on("click", function() {
            var _cid=$("#pointTable input[type='checkbox']:checked");
            if(_cid.length==0){
                showMessage("请选择要修改的地点！");
                return false;
            }
            if(_cid.length>1){
                showMessage("请选择一个地点！");
                return false;
            }
            var j_input = $("#pointTable input[type='checkbox']:checked").parent().parent().parent();
            var code = j_input.find("[name=pointCode]").val();

            var model_id = showMessage("你确定要删除吗？!", false);
            $('#' + model_id).on('click', '.confirmOnly', function(e) {
                window.location.href = "delPoint.html?id="+code;
            });
        });
        //员工修改
        $(".empEdit").on("click", function() {
            var _id=$("#employeeTable input[type='checkbox']:checked");
            if(_id.length==0){
                showMessage("请选择要修改的员工！");
                return false;
            }
            if(_id.length>1){
                showMessage("请选择一个员工！");
                return false;
            }
            console.info(_id);
            var j_input = $("#employeeTable input[type='checkbox']:checked").parent().parent().parent();
            var code = j_input.find("[name=empCode]").val();
            console.info(code);
            window.location.href = "addEmpPage.html?code="+code;
        });
        //员工删除
        $(".empDelete").on("click", function() {
            var _id=$("#employeeTable input[type='checkbox']:checked");
            if(_id.length==0){
                showMessage("请选择要修改的员工！");
                return false;
            }
            if(_id.length>1){
                showMessage("请选择一个员工！");
                return false;
            }
            var j_input = $("#employeeTable input[type='checkbox']:checked").parent().parent().parent();
            var code = j_input.find("[name=empCode]").val();

            var model_id = showMessage("你确定要删除吗？!", false);
            $('#' + model_id).on('click', '.confirmOnly', function(e) {
                window.location.href = "delEmp.html?code="+code;
            });
        });
    //模糊查询
        $(".employeeQuery").on("click", function() {
            $("#employeeForm").submit();
        });

        //打印考勤表
        function exportWork(){
            $("#attendForm").submit();
        }
        //打印订单表
        function copyOrder(){
            $("#orderListForm").submit();
        }
        function pointChange(obj){
            var code=$(obj).parent().parent().find("[name=empCode]").val();
            var delCode=$("#point"+code).find("option:selected").val();
            var delSite=$("#point"+code).find("option:selected").text();
            $.ajax({
                type : "POST",
                url : "changeSite.json",
                async : false,
                data :  {"id":code,
                    "delCode":delCode,
                    "delSite":delSite
                },
                success : function(data) {
                    if (data.code == "1") {
                        showMessage("分配成功！");
                        var model_id = showMessage("分配成功!", false);
                        $('#' + model_id).on('click', '.confirmOnly', function(e) {
                            window.location.href = "adminMain.html";
                        });
                    } else{
                        showMessage("分配错误！");
                        return false;
                    }
                }
            });
        }






    /*    $(".selectPoint").change(function(){
            var code;
            var delCode;
        $("#employeeTable").find("select option:selected").each(function(){
            code=$(this).parent().parent().parent().find("[name=empCode]").val();
            delCode=$(this).val();
        });

        });*/
    </script>

</body>
</html>