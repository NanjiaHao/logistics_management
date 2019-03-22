<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8"/>
    <title>Metronic | Login Options - Login Form 1</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/plugins/font-awesome/css/font-awesome.min.css"/>" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/plugins/simple-line-icons/simple-line-icons.min.css"/>" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/plugins/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/plugins/uniform/css/uniform.default.css"/>" rel="stylesheet" type="text/css"/>
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="<c:url value="/resource/assets/admin/pages/css/login.css" />"rel="stylesheet" type="text/css"/>
    <!-- END PAGE LEVEL SCRIPTS -->
    <!-- BEGIN THEME STYLES -->
    <link href="<c:url value="/resource/assets/global/css/components.css" />"id="style_components" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/css/plugins.css" />"rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/admin/layout/css/layout.css" />"rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/admin/layout/css/themes/darkblue.css" />"rel="stylesheet" type="text/css" id="style_color"/>
    <link href="<c:url value="/resource/assets/admin/layout/css/custom.css" />"rel="stylesheet" type="text/css"/>
    <!-- END THEME STYLES -->
    <link rel="shortcut icon" href="favicon.ico"/>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">

<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
<div class="menu-toggler sidebar-toggler">
</div>
<!-- END SIDEBAR TOGGLER BUTTON -->
<!-- BEGIN LOGO -->
<div class="logo">
    <%-- <a href="index.html">
         <img src="<c:url value="/resource/assets/admin/layout/img/logo-big.png"/>" alt=""/>
     </a>--%>
</div>
<!-- END LOGO -->
<!-- BEGIN LOGIN -->
<div class="content">
    <!-- BEGIN LOGIN FORM -->
    <form class="login-form" action="/addCar.html" method="post" id="carForm">
        <input type="hidden" name="id" value="${car.id}"/>
        <h3 class="form-title">添加车辆</h3>
        <div class="alert alert-danger display-hide">
            <button class="close" data-close="alert"></button>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">车牌号</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="车牌号" name="vehicleCode" id="vehicleCode" value="${car.vehicleCode}"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">负责人员</label>
            <select class="form-control" name="empCode" id="empCode" >
                <option>请选择</option>  
           <c:forEach var="item" items="${empList}">
                <option value="${item.code}" <c:if test="${car.employeeCode==item.code}">selected </c:if>>${item.name}</option>  
           </c:forEach>  
          </select> 
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">车辆状态</label>
            <label>
                <input class="form-control form-control-solid placeholder-no-fix" type="radio" value="0" name="status" <c:if test="${car.vehicleStatus==0}">checked </c:if>>空闲&nbsp; &nbsp; &nbsp;
            </label>
            <label>
                <input class="form-control form-control-solid placeholder-no-fix"  type="radio" value="1" name="status" <c:if test="${car.vehicleStatus==1}">checked </c:if>>途中&nbsp; &nbsp; &nbsp;
            </label>
            <label>
                <input class="form-control form-control-solid placeholder-no-fix"  type="radio" value="2" name="status" <c:if test="${car.vehicleStatus==2}">checked </c:if>>维修中
            </label>l
        </div>
        <div class="form-actions" style="text-align:center">
            <button type="button" class="btn btn-success uppercase addCar">确认</button>
        </div>
    </form>
    <!-- END REGISTRATION FORM -->
</div>
<%@ include file="/WEB-INF/common/js.jsp"%>
<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/admin/pages/scripts/login.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/respond.min.js"></script>
<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/excanvas.min.js"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script>
    jQuery(document).ready(function() {
        Metronic.init(); // init metronic core components
        Layout.init(); // init current layout
        Login.init();
        Demo.init();
    });
</script>

<script type="text/javascript">
    $(".addCar").on("click", function() {
        var vehicleCode = $("#vehicleCode").val();
        var username = $("#empCode option:selected").val();
        if (vehicleCode == "") {
            showMessage("车辆编号不能为空！");
            return;
        }
        if (username == "") {
            showMessage("负责人员不能为空！");
            return;
        }
        $("#carForm").submit();

    });
</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>