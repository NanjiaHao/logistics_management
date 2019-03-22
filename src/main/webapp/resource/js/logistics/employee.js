$(function () {
    $('#employeeListTable thead th .checker').removeClass('checker');
    window.employeeListTable = $('#employeeListTable').DataTable({
        "processing": true,
        "serverSide": true,
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "ajax": {
            "url": "${ctx}/payApplication/paymentWorkflow.json",
            "type": "POST",
            "data": function (data) {
                $($("#employeeListForm").serializeArray()).each(function (i, obj) {
                    if (obj.value) {
                        data[obj.name] = $.trim(obj.value);
                    }
                });
            },
            "dataSrc":function(result){
                //AJAX处理错误信息
                if(result.code != "0"){
                    bootbox.alert(result.msg);
                    return;
                }
                return result.data;
            }
        },
        "columns":[
            {
                "data": function (data) {
                    return employeeCellData(data, "checkbox");
                }
            },
            {
                "data": function (data) {
                    return employeeCellData(data, "name");
                }
            },
            {
                "data": function (data) {
                    return employeeCellData(data, "code");
                }
            },
            {
                "data": function (data) {
                    return employeeCellData(data, "gender");
                }
            },
            {
                "data": function (data) {
                    return employeeCellData(data, "telephone");
                }
            },
            {
                "data": function (data) {
                    return employeeCellData(data, "deliveryCode");
                }
            }
        ],
        "rowCallback": function (nRow, aData, iDataIndex) {
            $(nRow).data("data", aData);
        },
        "language": DATATABLE_LANGUAGE
    });

});
$(".employeeListQuery").on("click", function () {
    window.employeeListTable.draw();
});
function employeeCellData(data, cell) {
    var _html = emptyString(data[cell]);
    switch (cell) {
        case "checkbox":
            _html='<td><input type="checkbox" name="checkOne" class="selectedAll checkboxes" name="financeChecked" />'+
                    '<input type="hidden" name="apprStatus" value="' + data.apprStatus+ '"/>'+
                    '<input type="hidden" name="operateList" value="' + data.operateList+ '"/></td>';
            break;
        case "amount":
            _html = '<div style="text-align:right;"><span class="moneys">'+NumberToMoney(data.amount)+'</span><span class="currency">'+data.currency+'</span></div>'
            break;
        case "deptFullName":
            _html = '<span  title="'+_html+'">'+_html+'</span>';
            break;
    }
    return _html;
}
//新增操作
$(".paymentCreate").on("click", function() {
    var url = "${ctx}/conApplication/contractSelect.html";
    changeTitle(url,"新建付款","新建付款");
    $(location).attr('href', '${ctx}/conApplication/contractSelect.html');
});

//审批操作
$(".auditing").on("click", function (){
    console.info($("input[name='checkOne']:checked").length);
    if($("input[name='checkOne']:checked").length == 0) {
        showMessage("请选择您要审批的记录");
        return;
    }
    else if($("input[name='checkOne']:checked").length > 1) {
        console.info($("input[name='checkOne']:checked").length);
        showMessage("您选择要审批的记录不能超过一条");
        return;
    }else if($("input[name='checkOne']:checked").length == 1){
        var j_input = $("input[name='checkOne']:checked").parent();
        var sn = j_input.find("[name=sn]").val();
        var apprStatus   = j_input.find("[name=apprStatus]").val();

    }
});


$(".paymentEdit").on("click", function() {
    var _id = $(".checkboxes:checked[name='checkOne']");

    if (_id.length == 0) {
        showMessage("请选择一个付款单！");
    }
    //var paymentHeaderId = _id.val();
    if (_id.length == 1) {
        var _data = $(".checkboxes:checked").parents("tr").data("data");

    } else {
        showMessage("请选择要修改的付款申请单！");
    }
});
//删除操作
$(".paymentDelete").on("click", function() {
    var _id = $(".checkboxes:checked");
    if (_id.length == 0) {
        showMessage("请选择要删除的付款申请单！");
    }
    if(_id.length==1){
        var val=$(".checkboxes:checked").parents("tr").data("data");

    }
});
function putPointInfo(vendorId, vendorName) {
    $("#vendor_id").val(vendorId);
    $("#vendor_name").val(vendorName);
    $("#vendor-reset").css("display", "block");
    $("#vannu").css("display", "none");
}
function clearPointInfo() {
    $("#dept_id").val("");
    $("#dept_name").val("");
    $("#dept-reset").css("display", "none");
    $("#annu").css("display", "block");
}