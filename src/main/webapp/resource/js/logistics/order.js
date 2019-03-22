$(function () {
    $('#orderListTable thead th .checker').removeClass('checker');
    window.orderListTable = $('#orderListTable').DataTable({
        "processing": true,
        "serverSide": true,
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "ajax": {
            "url": "${ctx}/payApplication/paymentWorkflow.json",
            "type": "POST",
            "data": function (data) {
                $($("#orderListForm").serializeArray()).each(function (i, obj) {
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
                    return orderCellData(data, "checkbox");
                }
            },
            {
                "data": function (data) {
                    return ermPayFilmCellData(data, "orderCode");
                }
            },
            {
                "data": function (data) {
                    return ermPayFilmCellData(data, "name");
                }
            },
            {
                "data": function (data) {
                    return ermPayFilmCellData(data, "telephone");
                }
            },
            {
                "data": function (data) {
                    return ermPayFilmCellData(data, "address");
                }
            },
            {
                "data": function (data) {
                    return ermPayFilmCellData(data, "goods");
                }
            },
            {
                "data": function (data) {
                    return ermPayFilmCellData(data, "expectedDate");
                }
            }
        ],
        "rowCallback": function (nRow, aData, iDataIndex) {
            $(nRow).data("data", aData);
        },
        "language": DATATABLE_LANGUAGE
    });

});
function orderCellData(data, cell) {
    var _html = emptyString(data[cell]);
    return _html;
}




