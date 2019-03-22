$(function () {
    $('#userListTable thead th .checker').removeClass('checker');
    window.userListTable = $('#userListTable').DataTable({
        "processing": true,
        "serverSide": true,
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "ajax": {
            "url": "userList.json",
            "type": "POST",
            "data": function (data) {
                $($("#userListForm").serializeArray()).each(function (i, obj) {
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
                    return userCellData(data, "checkbox");
                }
            },
            {
                "data": function (data) {
                    return userCellData(data, "nickName");
                }
            },
            {
                "data": function (data) {
                    return userCellData(data, "password");
                }
            },
            {
                "data": function (data) {
                    return userCellData(data, "teleNum");
                }
            }
        ],
        "rowCallback": function (nRow, aData, iDataIndex) {
            $(nRow).data("data", aData);
        },
        "language": DATATABLE_LANGUAGE
    });

});
function userCellData(data, cell) {
    var _html = emptyString(data[cell]);
    switch (cell) {
        case "checkbox":
            _html='<td><input type="checkbox" name="checkOne" class="selectedAll checkboxes" name="financeChecked" /></td>';
            break;
    }
    return _html;
}
