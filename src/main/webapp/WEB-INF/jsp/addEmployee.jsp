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
   <%-- <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/plugins/font-awesome/css/font-awesome.min.css"/>" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/plugins/simple-line-icons/simple-line-icons.min.css"/>" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/plugins/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/plugins/uniform/css/uniform.default.css"/>" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/admin/pages/css/login.css" />"rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/css/components.css" />"id="style_components" rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/global/css/plugins.css" />"rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/admin/layout/css/layout.css" />"rel="stylesheet" type="text/css"/>
    <link href="<c:url value="/resource/assets/admin/layout/css/themes/darkblue.css" />"rel="stylesheet" type="text/css" id="style_color"/>
    <link href="<c:url value="/resource/assets/admin/layout/css/custom.css" />"rel="stylesheet" type="text/css"/>--%>

    <%@ include file="/WEB-INF/common/head.jsp"%>
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
    <form class="login-form" action="<c:url value="/addEmp.html"/>" method="post" id="employeeForm">
        <input type="hidden" name="id" value="${employee.id}"/>
        <h3 class="form-title">添加员工</h3>
        <div class="alert alert-danger display-hide">
            <button class="close" data-close="alert"></button>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">姓名</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="姓名" name="username" id="username" value="${employee.name}" />
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">密码</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="密码" name="password" id="password" value="${employee.password}"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">性别</label>
            <label>
                <input class="form-control form-control-solid placeholder-no-fix" type="radio" value="0" name="sex" <c:if test="${employee.gender==0}">checked </c:if>>男&nbsp; &nbsp; &nbsp;
            </label>

            <label>
                <input class="form-control form-control-solid placeholder-no-fix"  type="radio" value="1" name="sex" <c:if test="${employee.gender==1}">checked </c:if>>女
            </label>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">电话</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="电话" name="telephone" id="telephone" value="${employee.teleNum}"/>
        </div>
        <div class="form-group date date-picker">
            <label class="control-label visible-ie8 visible-ie9">出生年月</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" placeholder="出生年月" name="birthDate" id="birthDate" value="${employee.birthDateStr}"/>
            <span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-calendar"></i></button></span>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">配送点安排</label>
            <select class="form-control" name="point" id="point" >
                <option>请选择</option>  
          <c:forEach var="item" items="${pointList}">
            <option value="${item.deliveryCode}" <c:if test="${employee.deliveryCode==item.deliveryCode}">selected </c:if>>${item.deliveryAddress}</option>  
          </c:forEach>  
      </select>  
        </div>
        <div class="form-group date date-picker">
            <label class="control-label visible-ie8 visible-ie9">入职时间</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" placeholder="入职时间" name="startDate" id="startDate" value="${employee.hiredateStr}"/>
            <span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-calendar"></i></button></span>
        </div>

        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">职位</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="职位" name="position" id="position" value="${employee.positionType}"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">薪资</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="薪资" name="salary" id="salary" value="${employee.salary}"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">地址</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="地址" name="address" id="address" value="${employee.address}"/>
        </div>
        <div class="form-actions" style="text-align:center">
            <button type="button" class="btn btn-success uppercase addEmployee">确认</button>
        </div>
    </form>
    <!-- END REGISTRATION FORM -->
</div>
<%@ include file="/WEB-INF/common/js.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
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
    $(function() {
        $('.date-picker').datepicker();
    });
    $(".addEmployee").on("click", function() {
        var username = $("#username").val();
        var telephone = $("#telephone").val();
        var point=$('#point option:selected').val()
        var startDate = $("#startDate").val();
        var birthDate = $("#birthDate").val();
        var position = $("#position").val();
        var salary = $("#salary").val();
        var address = $("#address").val();
        var password = $("#password").val();
        console.info(point);
        if (username == "") {
            showMessage("姓名不能为空！");
            return;
        }
        if (password == "") {
            showMessage("密码不能为空！");
            return;
        }
        if (birthDate == "") {
            showMessage("出生日期不能为空！");
            return;
        }
        if (telephone == "") {
            showMessage("电话不能为空！");
            return;
        }
        if (point == "") {
            showMessage("配送点不能为空！");
            return;
        }
        if (startDate == "") {
            showMessage("入职时间不能为空！");
            return;
        }
        if (salary == "") {
            showMessage("薪水不能为空！");
            return;
        }
        if (address == "") {
            showMessage("地址不能为空！");
            return;
        }
        if (position == "") {
            showMessage("职位不能为空！");
            return;
        }
        $("#employeeForm").submit();

    });

</script>
</body>
<!-- END BODY -->
</html>