$(function () {
    $('#attendTable thead th .checker').removeClass('checker');
    window.attendTable = $('#attendTable').DataTable({
        "processing": true,
        "serverSide": true,
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "ajax": {
            "url": "${ctx}/payApplication/paymentWorkflow.json",
            "type": "POST",
            "data": function (data) {
                $($("#attendForm").serializeArray()).each(function (i, obj) {
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
                    return attendCellData(data, "checkbox");
                },
            },
            {
                "data": function (data) {
                    return attendCellData(data, "vehicleCode");
                }
            },
            {
                "data": function (data) {
                    return attendCellData(data, "employeeName");
                }
            },
            {
                "data": function (data) {
                    return attendCellData(data, "status");
                }
            }
        ],
        "rowCallback": function (nRow, aData, iDataIndex) {
            $(nRow).data("data", aData);
        },
        "language": DATATABLE_LANGUAGE
    });

});
function attendCellData(data, cell) {
    var _html = emptyString(data[cell]);
    return _html;
}