$(function () {
    $('#pointListTable thead th .checker').removeClass('checker');
    window.pointListTable = $('#pointListTable').DataTable({
        "processing": true,
        "serverSide": true,
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "ajax": {
            "url": "${ctx}/payApplication/paymentWorkflow.json",
            "type": "POST",
            "data": function (data) {
                $($("#pointListForm").serializeArray()).each(function (i, obj) {
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
                    return ermPayFilmCellData(data, "checkbox");
                }
            },
            {
                "data": function (data) {
                    return ermPayFilmCellData(data, "deliveryCode");
                }
            },
            {
                "data": function (data) {
                    return ermPayFilmCellData(data, "deliveryAddress");
                }
            }
        ],
        "rowCallback": function (nRow, aData, iDataIndex) {
            $(nRow).data("data", aData);
        },
        "language": DATATABLE_LANGUAGE
    });

});
function pointCellData(data, cell) {
    var _html = emptyString(data[cell]);
    switch (cell) {
        case "checkbox":
                _html='<td><input type="checkbox" name="checkOne" class="selectedAll checkboxes" name="financeChecked" />'+
                    '<input type="hidden" name="sn" value="' + data.sn+ '"/>'+
                    '<input type="hidden" name="paymentHeaderId" value="' + data.paymentHeaderId+ '"/>'+
                    '<input type="hidden" name="operateList" value="' + data.operateList+ '"/></td>';
            break;
    }

    return _html;
}
/新增操作
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