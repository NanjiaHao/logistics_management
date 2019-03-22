$(function(){
		console.info(999999);
	});
		jQuery(document).ready(function() {
			console.info(444);
			var billId = $("#paymentHeaderId").val();
			var formId = $("#formId").val();
			if (formId != '' && billId != '')
				console.info(11111111111);
				initFlow();
		});
		//判断是否有待办
		var f_isHasWait = function(phaes) {
			var isHasWait = false;
			var curlNodeTasks = phaes.TaskDetail;
			if (curlNodeTasks != null) {
				isHasWait = true;
			}
			return isHasWait;
		}
		//阶段是否最后节点
		var f_isHasEndNode = function(phase) {
			var result = false;
			if (phase.NodeType == "end") {
				result = true;
			}
			return result;
		}

		var reload = function() {
			var str = '<table border="0" align="center" cellpadding="0" cellspacing="0" width="400px">';
			str += '			<tr height="10px">';
			str += '				<td align="center" valign="middle"  width="100%" style="font-size: 14px; color: #FF0000; font-weight: bold;">';
			str += '								获取流程节点出错！<font color="#1a6b8b" onclick="initFlow()" >重新加载</font>';
			str += '							</td>';
			str += '			</tr>';
			str += '			<tr heigth="10px"><td >&nbsp;</td>';
			str += '			</tr>';
			str += '		</table>';
			var testdiv = document.getElementById("process");
			testdiv.innerHTML = str;
		}

		//公用函数,返回完整url
		function fullUrl(url) {
			if (url.substring(0, 4) == "http") {
				return url;
			}
			ref = document.location.href;
			xEnd = ref.lastIndexOf("/") + 1;
			baseUrl = ref.substring(0, xEnd);
			url = baseUrl + url;
			return url;
		}
		var initFlow12 = function() {
			var billId = $("#paymentHeaderId").val();
			var formId = $("#formId").val();
			var postData = "formId=" + formId + "&billId=" + billId;
			var xmlhttp;
			if (window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			} else {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if (xmlhttp) {
				xmlhttp.open("POST", fullUrl(ctx+'/payApplication/getWorkflow.json'), true);
				xmlhttp.setRequestHeader("Content-Length", postData.length);
				xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4) {
						document.getElementById("process").innerHTML = xmlhttp.responseText;
					}
				};
				xmlhttp.send(postData);
			}
		}

		var initFlow121 = function() {
			var userAgent = window.navigator.userAgent;
			var divOne = document.getElementById("process");
			var waitEle = "<table><tr><td width='270px'><td><td></td>";
			waitEle = waitEle + "</tr></table>";
			divOne.innerHTML = waitEle;
			var billId = $("#paymentHeaderId").val();
			var formId = $("#formId").val();
			$.ajax({
				url : ctx+'/payApplication/getWorkflow.json',
				timeout : 10000, //超时时间设置，单位毫秒
				type : "POST",
				dataType : "xml",
				data : {
					formId : formId,
					billId : billId
				},
				success : function(data) {
					$("#process").empty();
					if (!data) {
						reload();
					} else if (data.Code == "0") {
						reload();
					} else {
						$("#process").Html(data);
					}
				},
				error : function(x, e) {
				}
			});
		}

		var initFlow = function() {
			var userAgent = window.navigator.userAgent;
			var divOne = $("#process");
			var waitEle = "<table><tr><td width='270px'></td><td><img src='"+ctx+"/static/assets/global/images/load.gif' /></td>";
			waitEle = waitEle + "</tr></table>";
			var billId = $("#paymentHeaderId").val();
			var formId = $("#formId").val();
			
			$.ajax({
				url : ctx+'/payApplication/getWorkflow.json',
				timeout : 10000, //超时时间设置，单位毫秒
				type : "POST",
				dataType : "json",
				data : {
					formId : formId,
					billId : billId
				},
				beforeSend : function(){     //请求成功前触发的局部事件
					console.info(777777777);
					//$(".loading").css("display", "block");
		       },
				success : function(data) {
					$("#loadWorkflow").css("display", "none");
					
					$("#process").empty();
					if (!data) {
						reload();
					} else if (data.Code == "0") {
						reload();
					} else {
						if ((userAgent.indexOf("Safari") > -1) || (userAgent.indexOf("Chrome") > -1)
								|| (userAgent.indexOf("Firefox") > -1)) {
							chrome(data);
						} else if ((userAgent.indexOf("MSIE") > -1)) {
							IE(data);
						} else {
							chrome(data);
						}
					}
				},
				error : function(x, e) {
				}
			});
		}

		 function chrome(data) {

			var phaesDetail = data.Content.PhaseDetail;
			var flowStatus = data.Content.FlowStatus;
			if (phaesDetail.length > 0) {
				var nodeType = "";
				var processType = "";
				var arraysucessPhase = 0;
				for (var i = 0; i < phaesDetail.length; i++) {
						var _tempContent = "";
						var isNonWait = false;
						var isHasFinished = false;
						var isHasWait = false;
						var curPhaseNodes = phaesDetail[i].NodeDetail;
						if (curPhaseNodes != null) {
							for (var j = 0; j < curPhaseNodes.length; j++) {
								var curlNodeTasks = curPhaseNodes[j].TaskDetail;
								if (curlNodeTasks == null || curlNodeTasks.length == 0) {
									isNonWait = true;
								} else {
									isHasWait = true;
									for (var k = 0; k < curlNodeTasks.length; k++) {
										if (curlNodeTasks[k].TaskStatus == "Approved"
												|| curlNodeTasks[k].TaskStatus == "Canceled")
											isHasFinished = true;
									}
								}
							}
						}

						if (phaesDetail[i].PhaseStatus == "Proceed") {
							nodeType = " circle-l stateBgGreen";
							if (curPhaseNodes.length > 1) {
								nodeType = " circle-l stateBgGreen";
							} else {
								if (curPhaseNodes.length == 1) {
									nodeType = " circle-l stateBgGreen";
								}
							}
							arraysucessPhase++;
						} else if (phaesDetail[i].PhaseStatus == "Processing") {
							nodeType = " circle-l stateBgOrange";

							if (curPhaseNodes.length > 1)
								nodeType = " circle-l stateBgOrange";
							else {
								if (curPhaseNodes.length == 1 && curPhaseNodes[0].NodeType == "node")
									nodeType = " circle-l stateBgOrange";
							}
						} else {
							nodeType = " circle-l stateBgGray";

							var isAction = false;
							if (curPhaseNodes.length > 1)
								nodeType = " circle-l stateBgGray";
							else {
								if (curPhaseNodes.length == 1) {
									if (curPhaseNodes[0].NodeType == "node")
										nodeType = " circle-l stateBgGray";
									else {
										nodeType = " circle-l stateBgGray";

									}
								}
							}
							if ((phaesDetail[i - 1].PhaseStatus == "Proceed" && phaesDetail[i].PhaseStatus == "UnProcess")
									&& (flowStatus != 'Completed')) {
								isHasWait = true;
							}
							if (!isAction) {
								if (isHasWait) {
									nodeType = " circle-l stateBgOrange";

									if (curPhaseNodes.length > 1)
										nodeType = " circle-l stateBgOrange";
									else {
										if (curPhaseNodes.length == 1 && curPhaseNodes[0].NodeType == "node")
											nodeType = " circle-l stateBgOrange";
									}
								}
							}
							if ((flowStatus == 'Completed') && (i == phaesDetail.length - 1)) {
								nodeType = " circle-l stateBgGreen";

							}
						}

						if (nodeType == " circle-l stateBgGreen" || nodeType == " circle-l stateBgGreen"
								|| nodeType == " circle-l stateBgGreen") {
							console.info(2222);
							console.info(nodeType);
							processType = "line line-green";

						} else if (nodeType == " circle-l stateBgOrange" || nodeType == " circle-l stateBgOrange"
								|| nodeType == " circle-l stateBgOrange") {
							processType = "line line-gray";
						} else {
							processType = "line line-gray";
						}
						if (i == phaesDetail.length - 1) {
							if ((phaesDetail[i - 1].PhaseStatus != "UnProcess" && phaesDetail[i].PhaseStatus == "UnProcess")) {
								if (arraysucessPhase == i) {
									nodeType = " circle-l stateBgGreen";
								} else {
									nodeType = " circle-l stateBgGray";
								}

							}
						}

						if (i < phaesDetail.length - 1) {
							//相邻两个节点至少都是待办的情况下，显示绿色
							//待办 待办
							//待办 有已办的
							//有已办的 待办
							//有已办的 有已办的
							if ((phaesDetail[i + 1].PhaseStatus != "Proceed") && i == 0) {
								processType = "line line-orange";

							} else if ((phaesDetail[i].PhaseStatus != "UnProcess" && phaesDetail[i + 1].PhaseStatus != "UnProcess")
									|| (f_isHasWait(phaesDetail[i]) && f_isHasWait(phaesDetail[i + 1]))
									|| (f_isHasWait(phaesDetail[i]) && phaesDetail[i + 1].PhaseStatus != "UnProcess")
									|| (phaesDetail[i].PhaseStatus != "UnProcess" && f_isHasWait(phaesDetail[i + 1]))) {

								processType = "line line-green";

							} else if ((phaesDetail[i].PhaseStatus == "Proceed" && phaesDetail[i + 1].PhaseStatus == "UnProcess")
									&& i < phaesDetail.length - 2 && (flowStatus != 'Completed')) {
								processType = "line line-orange";

							} else if ((phaesDetail[i + 1].PhaseStatus == "UnProcess") && i >= phaesDetail.length - 2
									&& (flowStatus == 'Completed')) {
								processType = "line line-green";

							} else {
								if (!f_isHasEndNode(phaesDetail[i + 1])) {
									processType = "line line-gray";

								}
							}
						}
						if (i < phaesDetail.length - 1){
						$tr = $("<div class='circle'>" + " <div class='circlePart'>"
								+ "<p class='" + nodeType + "'></p></div>" + "<i class='" + processType + "'></i>"
								+ "<div class='circle-info'>" + "<p class='deptName' title='info'>"
								+ phaesDetail[i].PhaseName + "</p>" + " </div> </div>")
						       $("#process").append($tr);
						console.info($tr);
						}else{
					      $tr = $("<div class='circle'>" + " <div class='circlePart'>"
								+ "<p class='" + nodeType + "'></p></div>" + "<div class='circle-info'>"
								+ "<p class='deptName' title='info'>" + phaesDetail[i].PhaseName + "</p>"
								+ " </div> </div>")
					       $("#process").append($tr);
					}
				}

			}
		
		}
		function IE(data) {
			var phaesDetail = data.Content.PhaseDetail;
			var flowStatus = data.Content.FlowStatus;
			if (phaesDetail.length > 0) {
				var nodeType = "";
				var processType = "";
				var arraysucessPhase = 0;
				for (var i = 0; i < phaesDetail.length; i++) {
					if (i < phaesDetail.length - 1) {
						var _tempContent = "";
						var isNonWait = false;
						var isHasFinished = false;
						var isHasWait = false;
						var curPhaseNodes = phaesDetail[i].NodeDetail;
						if (curPhaseNodes != null) {
							for (var j = 0; j < curPhaseNodes.length; j++) {
								var curlNodeTasks = curPhaseNodes[j].TaskDetail;
								if (curlNodeTasks == null || curlNodeTasks.length == 0) {
									isNonWait = true;
								} else {
									isHasWait = true;
									for (var k = 0; k < curlNodeTasks.length; k++) {
										if (curlNodeTasks[k].TaskStatus == "Approved"
												|| curlNodeTasks[k].TaskStatus == "Canceled")
											isHasFinished = true;
									}
								}
							}
						}

						if (phaesDetail[i].PhaseStatus == "Proceed") {
							nodeType = " circle-l stateBgGreen";
							if (curPhaseNodes.length > 1) {
								nodeType = " circle-l stateBgGreen";
							} else {
								if (curPhaseNodes.length == 1) {
									nodeType = " circle-l stateBgGreen";
								}
							}
							arraysucessPhase++;
						} else if (phaesDetail[i].PhaseStatus == "Processing") {
							nodeType = " circle-l stateBgOrange";

							if (curPhaseNodes.length > 1)
								nodeType = " circle-l stateBgOrange";
							else {
								if (curPhaseNodes.length == 1 && curPhaseNodes[0].NodeType == "node")
									nodeType = " circle-l stateBgOrange";
							}
						} else {
							nodeType = " circle-l stateBgGray";

							var isAction = false;
							if (curPhaseNodes.length > 1)
								nodeType = " circle-l stateBgGray";
							else {
								if (curPhaseNodes.length == 1) {
									if (curPhaseNodes[0].NodeType == "node")
										nodeType = " circle-l stateBgGray";
									else {
										nodeType = " circle-l stateBgGray";

									}
								}
							}
							if ((phaesDetail[i - 1].PhaseStatus == "Proceed" && phaesDetail[i].PhaseStatus == "UnProcess")
									&& (flowStatus != 'Completed')) {
								isHasWait = true;
							}
							if (!isAction) {
								if (isHasWait) {
									nodeType = " circle-l stateBgOrange";

									if (curPhaseNodes.length > 1)
										nodeType = " circle-l stateBgOrange";
									else {
										if (curPhaseNodes.length == 1 && curPhaseNodes[0].NodeType == "node")
											nodeType = " circle-l stateBgOrange";
									}
								}
							}
							if ((flowStatus == 'Completed') && (i == phaesDetail.length - 1)) {
								nodeType = " circle-l stateBgGreen";

							}
						}

						if (nodeType == " circle-l stateBgGreen" || nodeType == " circle-l stateBgGreen"
								|| nodeType == " circle-l stateBgGreen") {
							console.info(2222);
							console.info(nodeType);
							processType = "line line-green";

						} else if (nodeType == " circle-l stateBgOrange" || nodeType == " circle-l stateBgOrange"
								|| nodeType == " circle-l stateBgOrange") {
							processType = "line line-gray";
						} else {
							processType = "line line-gray";
						}
						if (i == phaesDetail.length - 1) {
							if ((phaesDetail[i - 1].PhaseStatus != "UnProcess" && phaesDetail[i].PhaseStatus == "UnProcess")) {
								if (arraysucessPhase == i) {
									nodeType = " circle-l stateBgGreen";
								} else {
									nodeType = " circle-l stateBgGray";
								}

							}
						}

						if (i < phaesDetail.length - 1) {
							//相邻两个节点至少都是待办的情况下，显示绿色
							//待办 待办
							//待办 有已办的
							//有已办的 待办
							//有已办的 有已办的
							if ((phaesDetail[i + 1].PhaseStatus != "Proceed") && i == 0) {
								processType = "line line-orange";

							} else if ((phaesDetail[i].PhaseStatus != "UnProcess" && phaesDetail[i + 1].PhaseStatus != "UnProcess")
									|| (f_isHasWait(phaesDetail[i]) && f_isHasWait(phaesDetail[i + 1]))
									|| (f_isHasWait(phaesDetail[i]) && phaesDetail[i + 1].PhaseStatus != "UnProcess")
									|| (phaesDetail[i].PhaseStatus != "UnProcess" && f_isHasWait(phaesDetail[i + 1]))) {

								processType = "line line-green";

							} else if ((phaesDetail[i].PhaseStatus == "Proceed" && phaesDetail[i + 1].PhaseStatus == "UnProcess")
									&& i < phaesDetail.length - 2 && (flowStatus != 'Completed')) {
								processType = "line line-orange";

							} else if ((phaesDetail[i + 1].PhaseStatus == "UnProcess") && i >= phaesDetail.length - 2
									&& (flowStatus == 'Completed')) {
								processType = "line line-green";

							} else {
								if (!f_isHasEndNode(phaesDetail[i + 1])) {
									processType = "line line-gray";

								}
							}
						}

						$tr = $("<div class='circle'>" + " <div class='circlePart'>"
								+ "<p class='" + nodeType + "'></p></div>" + "<i class='" + processType + "'></i>"
								+ "<div class='circle-info'>" + "<p class='deptName' title='info'>"
								+ phaesDetail[i].PhaseName + "</p>" + " </div> </div>")

						$("#process").append($tr);

					} else if (i == phaesDetail.length - 1){
						if (phaesDetail[i].PhaseStatus == "Proceed") {
							nodeType = " circle-l stateBgGreen";
							
						} else if (phaesDetail[i].PhaseStatus == "Processing") {
							nodeType = " circle-l stateBgOrange";

						} else {
							nodeType = " circle-l stateBgGray";
						}
						$tr = $("<div class='circle'>" + " <div class='circlePart'>"
								+ "<p class='" + nodeType + "'></p></div>" + "<div class='circle-info'>"
								+ "<p class='deptName' title='info'>" + phaesDetail[i].PhaseName + "</p>"
								+ " </div> </div>")

					$("#process").append($tr);
				}

			}
		}
	}