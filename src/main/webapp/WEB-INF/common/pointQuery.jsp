<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">

<style>
.checkboxes {
	width: 16px;
	height: 16px;
}

.moneys {
	display: inline-block;
	text-align: right;
}

.currency {
	display: inline-block;
	margin-left: 8px;
}
#deptTable tbody td:nth-child(2){
	text-align:left;
	padding-left:10% !important;
}
</style>
<script type="text/javascript">
	$(function() {
		window.pointNameResult = $('#pointTable').DataTable({
			"processing" : true,
			"serverSide" : true,
			"searching" : false,
			"ordering" : false,
			"lengthChange" : false,
			"retrieve" : true,
			"iDisplayLength": 5,
			"ajax" : {
				"url" : "${ctx}/sys/deptForPop.json",
				"type" : "POST",
				"data" : function(data) {
					$($("#pointNameQueryForm").serializeArray()).each(function(i, obj) {
						if (obj.value) {
							data[obj.name] = $.trim(obj.value);
						}
					});
				},
				"dataSrc" : function(result) {
					//AJAX处理错误信息
					if (result.code != "0") {
						bootbox.alert(result.msg);
						return;
					}
					return result.data;
				}
			},
			"columns" : [ {
				"data" : function(data) {
					return deptCellData(data, "pintRadio");
				}
			}, {
				"data" : function(data) {
					return deptCellData(data, "pointName");
				}
			} ],
			"rowCallback" : function(nRow, aData, iDataIndex) {
				$(nRow).data("data", aData);
			},
			"language" : DATATABLE_LANGUAGE
		});

		function deptCellData(data, cell) {
			var _html = emptyString(data[cell]);
			switch (cell) {
				case "deptRadio":
					_html = '<input onclick="changeDeptStyle(this);" type="radio" name="pointNameRadio" data-psDeptId="' + data["deptIdPs"] + '"  value="' + data["deptId"] + '">'
					break;
			}
			return _html;
		}
		$('#modal_point').on('show.bs.modal', function () {
			$("#pointNameQueryForm input").each(function() {
				$(this).val("");
			});
			window.pointNameResult.draw();
		});
		//选中
		$(".saveTask").on("click", function() {
			var deptId = "";
			var deptName = "";
			var psDeptId = "";
			var deptIpt = $("#pointNameTable tbody").find("input[name='pointNameRadio']");

			deptIpt.each(function() {
				if ($(this).attr("checked")) {
					deptId = $(this).val();
					deptName = $(this).parent().next().html();
				}
			});

			if (Trim(deptId) && Trim(deptName)) {
				putPointInfo(deptId, deptName);
				$("#modal_dept").modal('hide');
				deptIpt.each(function() {
					$(this).attr("checked", false);
				});
			} else {
				showMessage("请选择地点！", null);
			}
		});
	});
</script>
<div id="modal_point" class="modal fade" role="dialog" aria-hidden="true">
<input type="hidden" id="deptCheck" value="0" />
	<div class="modal-dialog" style="width: 1000px;">
		<div class="modal-content" style="width: 680px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
				<h4 class="modal-title">地点选择</h4>
			</div>
			<div class="modal-body">
				<form action="#" id=pointNameQueryForm class="form-horizontal">
					<div class="form-body" style="padding-left: 15px">
						<!--row-->
						<div class="row">
							<div class="col-md-12">
								<table class="table table-condensed table-bordered table-hover table-fixed" id="pointNameTable">
									<thead>
										<tr role="row" class="heading">
											<th width="3%"></th>
											<th width="96%">地点</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
						</div>
						<!--/row-->
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn blue saveTask">确定</button>
				<button class="btn red closebtn" data-dismiss="modal" aria-hidden="true" onclick="close();">取消</button>
			</div>
		</div>
	</div>
</div>
<!--end 选择PR单 -->

