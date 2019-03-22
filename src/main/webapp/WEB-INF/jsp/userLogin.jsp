<!DOCTYPE html>

<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">
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
    <form class="login-form" action="" method="post" id="userLogin">
        <h3 class="form-title">登录</h3>
        <div class="alert alert-danger display-hide">
            <button class="close" data-close="alert"></button>
            <span>
			Enter any username and password. </span>
        </div>
        <div class="form-group">
            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
            <label class="control-label visible-ie8 visible-ie9">昵称</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="Username" name="username" id="username"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">密码</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="Password" name="password" id="password"/>
        </div>
        <div class="form-actions" style="text-align:center">
            <button type="button" class="btn btn-success uppercase" id="login">登录</button>
        </div>
        <div class="create-account">
            <p>
                <a href="javascript:;" id="register-btn" class="uppercase">注册账户</a>
            </p>
        </div>
    </form>

    <form class="register-form" action="" method="post" id="registerForm">
        <h3>注册</h3>
        <p class="hint">
           请下面填写你个人的详细信息:
        </p>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">昵称</label>
            <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Username" name="username" id="registerName"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">密码</label>
            <input class="form-control placeholder-no-fix" type="password" autocomplete="off"  placeholder="Password" name="password" id="rePassword"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">电话</label>
            <input class="form-control placeholder-no-fix" type="text" placeholder="Telephone" name="telephone" id="telephone"/>
        </div>
        <div class="form-actions">
            <button type="button" id="register-back-btn" class="btn btn-default">返回</button>
            <button type="button" id="register" class="btn btn-success uppercase pull-right">提交</button>
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

    $("#register").on("click", function() {
        var userName = $("#registerName").val();
        var password = $("#rePassword").val();
        var telephone = $("#telephone").val();
        if (userName == "") {
            showMessage("用户名不能为空！");
            return;
        }
        console.log(password);
        if (password == "") {
            showMessage("密码不能为空！");
            return;
        }
        if (telephone == "") {
            showMessage("电话不能为空！");
            return;
        }
        if(!(/^1[34578]\d{9}$/.test(telephone))){
            alert("手机号码有误，请重填");
            return false;
        }
        $.ajax({
            type : "POST",
            url : "register.json",
            async : false,
            data :   $("#registerForm").serialize(),
            success : function(data) {
                console.log(54784);
                console.info(data);
                if (data.code == "1") {
                     showMessage("注册成功！");
                     var model_id = showMessage("注册成功!", false);
                     $('#' + model_id).on('click', '.confirmOnly', function(e) {
                         window.location.href = "userLoginPage.html";
                     });
                 } else if(data.code=="0"){
                     showMessage("用户名已存在！");
                     return false;
                 }else{
                     showMessage("注册失败");
                 }
            }
        });

    });

    $("#login").on("click", function() {
        var userName = $("#userName").val();
        var password = $("#password").val();
        if (userName == "") {
            showMessage("用户名不能为空！");
            return;
        }
        if (password == "") {
            showMessage("密码不能为空！");
            return;
        }
        $.ajax({
            type : "POST",
            url : "userLogin.json",
            async : false,
            data :   $("#userLogin").serialize(),
            success : function(data) {
                if (data.code == "2") {
                    showMessage("登录成功！");
                    var model_id = showMessage("登录成功!", false);
                    $('#' + model_id).on('click', '.confirmOnly', function(e) {
                        window.location.href = "order.html?id="+data.id+"&name="+data.name;
                    });
                } else{
                    showMessage("用户名或密码错误！");
                    return false;
                }
            }
        });
    });
</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>