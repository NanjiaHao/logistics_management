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
    <link rel="shortcut icon" href="favicon.ico"/>
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
    <form class="login-form" action="<c:url value="/orderGoods.html"/>" method="post" id="orderForm">
        <input type="hidden" name="id" id="id" value="${id}"/>
        <h3 class="form-title">下单</h3>
        <div class="alert alert-danger display-hide">
            <button class="close" data-close="alert"></button>
        </div>
        <div class="form-group">
            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
            <label class="control-label visible-ie8 visible-ie9">姓名</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off"  name="nickName" id="nickname" value="${userName}"/>
        </div>
       <%-- <div class="form-group">
        <label class="control-label visible-ie8 visible-ie9">电话</label>
        <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="电话" name="teleNum" id="telephone"/>
    </div>--%>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">配送地址</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="配送地址" name="shippingAddress" id="shippingAddress"/>
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">购买物品</label>
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="购买物品" name="goods" id="goods"/>
        </div>
        <div class="form-group date date-picker">
            <label class="control-label visible-ie8 visible-ie9">期望配送时间</label>
           <input class="form-control form-control-solid placeholder-no-fix" type="text" placeholder="期望配送时间" name="expectedDate" id="expectedDate"/>
           <span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-calendar"></i></button></span>
         </div>
        <div class="form-actions" style="text-align:center">
            <button type="button" class="btn btn-success uppercase" id="purchase">确认</button>
        </div>
    </form>
    <!-- END REGISTRATION FORM -->
</div>
<%@ include file="/WEB-INF/common/js.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/resource/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
<%--<script src="${pageContext.request.contextPath}/resource/assets/global/plugins/jquery.min.js" type="text/javascript"></script>--%>
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

    $("#purchase").on("click", function() {
        var userName = $("#nickname").val();
        var shippingAddress = $("#shippingAddress").val();
        var goods = $("#goods").val();
        var expectedDate = $("#expectedDate").val();
        if (userName == "") {
            showMessage("用户名不能为空！");
            return;
        }
        if (shippingAddress == "") {
            showMessage("配送地址不能为空！");
            return;
        }
        if (goods == "") {
            showMessage("商品不能为空！");
            return;
        }
        if (expectedDate == "") {
            showMessage("期望配送时间不能为空！");
            return;
        }
        $("#orderForm").submit();

    });


</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>