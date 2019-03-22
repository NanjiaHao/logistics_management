var fvTask = new FormValidate(false,"#dataForm");
fvTask.bind({
	selector: ".vEmpty",
	fun:function(element){
		if(element.hasClass("form-money")&&element.val()==""){
			return {status: false, msg: '不能为空！'};
		}
		var payLineAmount = element.parent().parent().find("input[name='payLineAmount']").val();
		if(payLineAmount!=""&&element.val()==""){
			return {status: false, msg: '不能为空！'};
		}else if (element.val().length > 120) {
			return {status : false,msg : '最多120个字！'};
		}
		return {status: true};
	}
}).bind({
	selector: ".form-money",
    fun:function(obj){
    	if(obj.attr("id")=="paymentAmountEdit"){
    		return {status: true};
    	}
    	if(obj.val()!=""){
    		if(obj.val().match(/^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/)||MoneyToNumber(obj.val())=="error"){
    			return {status: false, msg: FormValidate.REG_MSG_P_AMOUNT};
    		}
			if(typeof(obj.attr("placeholder"))!='undefined'){
    			var blanceAmount = obj.parent().parent().find("input[name='balanceAmount']").val();
    			if(MoneyToNumber(obj.val())>blanceAmount){
    				return {status: false, msg: "填写金额大于可用余额！"};
    			}
    		}
			obj.val(NumberToMoney(obj.val()));
    	}else{
    		if(obj.hasClass("vEmpty")){
    			return {status: false, msg: '不能为空！'};
    		}
    	}
		return {status: true};
    }
}).bind({
	selector : ".quantity",
	 fun:function(obj){
		 if(obj.val()!=""){     
			 if(!obj.val().match(/^(([0-9]+[\.]?[0-9]+)|[1-9])$/)){
				 return {status: false, msg: "请使用正数！"}; 
			 }
		 }
		 return {status: true};
	 }
});

$(function() {
	editPayAmount();
	bindPopMsgPayInfo($('.showPopMsg'));
	bindPopMsgPayInfo($('.showPopMsgPay'));
	showSumAmount();
	$(".goBack").on("click", function() {
		
		var model_id = showMessage("更改选项将清除已填写的付款明细，确定继续？", true);
        $('#' + model_id).on('click', '.confirm', function (e) {
        	window.location = ctx+"/conApplication/contractSelect.html";      
        }); 
	});
	$(".goNext").on("click", function() {
		goNext();
	});
	$(".addPayLine").on("click", function() {
	    var index=$("#numFixed").val();
	    console.info(index);
		addPayLine(index);
		$("#numFixed").val(parseInt(index)+1);
	});
	$(".deletePayLine").on("click", function() {
		deletePayLine();
	});
	$(".purchaseQueryModel").on("click", function() {
		$("#relationFrom").val("pr");
		$("#purchaseLineModal .purchaseLineConfirm").text("确定");
		$('#purchaseQueryModel').modal('show');
	});
	
	$(".conLine").keyup(function() {
		conLineShareAmount(this);
	});
	$(".conPrLine").keyup(function() {
		conPrLineShareAmount(this);
	});
});

function editPayAmount(){
	var payTypeText = $("#payType").find("option:selected").text();
	if("房租物业"==payTypeText||"自媒体代收代付"==payTypeText){
		$("#paymentAmountEdit").attr("type","text");
		$("#paymentAmount").css("display","none");
	}else{
		$("#paymentAmountEdit").attr("type","hidden");
		$("#paymentAmount").css("display","");
	}
	
}

function setPayAmount(obj){
	var payAmount = $(obj).val();
	if(payAmount!=""){
		if(payAmount.match(/^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/)||MoneyToNumber(payAmount)=="error"){
			showMessage("付款金额输入有误！");
			$("#paymentAmount").text("");
		}else{
			$(obj).val(NumberToMoney(payAmount));
			$("#paymentAmount").text(NumberToMoney(payAmount));
		}
	}else{
		$("#paymentAmount").text("");
	}
	
}


function selectdept(){
	var i=0;
	var frameContractRelationTabel = $(".frameContractRelationTabel");
	if(frameContractRelationTabel.length>0){
		frameContractRelationTabel.each(function(){
			if($(this).parent().css("display")!="none"){
				$(this).find("input[name='businessTypeName']").each(function(){
					if($(this).parent().css("display")!="none"&&$(this).val()!=""){
						i++;
					}
				});
			}
				
		});
	}
	var paymentLinesTable = $(".paymentLinesTable");
	if(paymentLinesTable.length>0){
		paymentLinesTable.find("input[name='businessTypeName']").each(function(){
			if($(this).parent().parent().css("display")!="none"&&$(this).val()!=""){
				i++;
			}
		});
	}
	if(i>0){
		var model_id = showMessage("更换费用部门会重置业务类型，是否继续？", true);
		$('#' + model_id).on('click', '.confirm', function(e) {
			$("#dataForm").find("input[name='businessTypeName']").each(function(){
				$(this).val("");
			});
			$("#dataForm").find("input[name='businessTypeCode']").each(function(){
				$(this).val("");
			});
			$('#modal_dept').modal('show');
		});
	}else{
		$('#modal_dept').modal('show');
	}
	
}

function putDeptInfo(deptId, deptName,psDeptId) {
	$("#deptId").val(deptId);
	$("#deptName").val(deptName);
	$("#psDeptId").val(psDeptId);
	$("#DeptCode").val(psDeptId);
	$(".dept-reset").css("display", "block");
}

function bindPopMsgPayInfo($this) {
	$this.focus(function () {
	    var obj = $(this);
	    var inputVal = obj.val();
	    obj.before('<div class="msg-tips-pay">{0}</div>'.format(obj.hasClass('money') ? $.formatMoney(inputVal) : inputVal));
	    obj.prev().css("left", obj.position().left);
	    obj.prev().css("bottom", obj.parents("div").eq(0).height()-obj.position().top+3);
	    obj.prev().css("width", obj.parent().width());
	  }).blur(function () {
	    $(this).parent().find('.msg-tips-pay').remove();
	    $(this).mouseleave();
	  }).keyup(function () {
	    var inputVal = this.value;
	    $(this).parent().find('.msg-tips-pay').text(inputVal);
	  });
}

//分摊合同行金额到关联的PR单行
function conLineShareAmount(obj){
	var result = true;
	var conRelationDiv = $(obj).parent().parent().parent().parent().parent();
	var conPrlineEles = conRelationDiv.find("input[name='payAmount']");
	var flag = false;
	if(conPrlineEles.length>0){
		var conRelationAmountStr =conRelationDiv.find("strong[name='contractRelationAmount']").text();
		var conRelationAmount = MoneyToNumber(conRelationAmountStr);
		var eleLength = conPrlineEles.length;
		conPrlineEles.each(function(m,n){
			if($(this).parent().parent().css("display")!="none"&&!$(this).prop("disabled")){
				var conPRTr = $(this).parent().parent();
				var balanceAmount = conPRTr.find("input[name='balanceAmount']").val();
				if(eleLength==1&&conRelationAmount>balanceAmount){
					flag = true;
					return false;
				}
				if(eleLength>1&&m==eleLength-1&&conRelationAmount>balanceAmount){
					flag = true;
					return false;
				}
				if(conRelationAmount<=balanceAmount){
					if(conRelationAmount==0){
						$(this).val("");
					}else{
						$(this).val(NumberToMoney(conRelationAmount));
						conRelationAmount = 0;
					}
				}else {
					$(this).val(NumberToMoney(balanceAmount));
					conRelationAmount = conRelationAmount-balanceAmount;
				}
				$(this).blur();
			}else{
				eleLength = eleLength-1;
			}
			
		});
		if(flag){
			conPrlineEles.each(function(m,n){
				if($(this).parent().parent().css("display")!="none"&&!$(this).prop("disabled")){
					$(this).val("");
				}
			});
			showMessage("合同关联金额大于PR单可用余额！");
			result = false;
		}
		sumAmount();
	}
	return result;
}


//分摊合同关联PR单金额到合同行上
function conPrLineShareAmount(obj){
	var conRelationDiv = $(obj).parent().parent().parent().parent().parent().parent();
	var conlineEles = conRelationDiv.find("input[name='payLineAmount']");
	conlineEles.each(function(m,n){
		if(!$(this).prop("disabled")){
			$(this).val("");
		}
	});
	var flag = false;
	if(conlineEles.length>0){
		var prRelationAmount = 0;
		var payAmountEles = conRelationDiv.find("input[name='payAmount']");
		payAmountEles.each(function(){
			if($(this).val()!=""){
				prRelationAmount+=MoneyToNumber($(this).val());
			}
		});
		
		if(NumberToMoney(prRelationAmount)!="error"){
			var eleLength = conlineEles.length;
			conlineEles.each(function(m,n){
				if(!$(this).prop("disabled")){
					var conTr = $(this).parent().parent();
					var balanceAmount = conTr.find("input[name='balanceAmount']").val();
					balanceAmount = MoneyToNumber(balanceAmount);
					if(eleLength==1&&prRelationAmount>balanceAmount){
	    				flag = true;
	    				return false;
	    			}
					
	    			if(m !=0 && m == eleLength-1&&prRelationAmount>balanceAmount){
	    				flag = true;
	    				return false;
	    			}
	    			if(prRelationAmount<=balanceAmount){
	    				if(prRelationAmount==0){
	    					$(this).val("");
	    				}else{
	    					$(this).val(NumberToMoney(prRelationAmount));
	    				}
	    				return false;
	    			}else{
	    				$(this).val(NumberToMoney(balanceAmount));
	    				prRelationAmount = prRelationAmount-balanceAmount;
	    			}
	    			
				}else{
					eleLength = eleLength-1;
				}
    		});
    		if(flag){
    			showMessage("PR单关联金额大于合同可用余额！");
    		}else{
    			sumAmount();
    		}
		}
	}
	conlineEles.each(function(m,n){
		if(!$(this).prop("disabled")){
			$(this).blur();
		}
	});
}

var tdEle;
function selectBussinessType(obj){
	tdEle = $(obj).parent();
	$('#businessTypeModal').modal('show');
}
function addBussinessType(typeName,typeCode){
	tdEle.find("input[name='businessTypeName']").val(typeName);
	tdEle.find("input[name='businessTypeCode']").val(typeCode);
	tdEle.find("input[name='businessTypeName']").blur();
}

var frameConPrDiv;
function selectContractPr(obj){
	$("#relationFrom").val("con");
	$("#purchaseLineModal .purchaseLineConfirm").text("确定");
	$('#purchaseQueryModel').modal('show');
	frameConPrDiv = $(obj).parent().parent().parent();
}

function addConPrRelation(divObj){
	
	var billCurrency = $("#currency").val(),balanceAmount,trEles = divObj.children();
	var deleteHtml = "<td><i class='fa  fa-times-circle items ori-style' style='cursor: pointer;font-size:20px;' onclick='deleteConPrLine(this)'></i></td>";
	trEles.each(function(){
		var firstTd = $(this).find("td:first-child");
		var payAmountTd = $(this).find("td:last-child");
		balanceAmount = payAmountTd.find("input").val();
		firstTd.prepend("<input type='hidden' name='payConPrRelationId'>" +
						'<input type="hidden" name="purchaseNumber" value="'+firstTd.text()+'"> '+
						'<input type="hidden" name="lineNumber" value="'+$(this).find("td").eq(1).text()+'">'+
						'<input type="hidden" name="businessTypeName" value="'+$(this).find("td").eq(2).text()+'">'+
						'<input type="hidden" name="businessTypeCode" value="'+$(this).find("input[name='prTypeCode']").val()+'">'+
						'<input type="hidden" name="totalAmount" value="'+$(this).find("input[name='totalAmount']").val()+'">'+
						'<input type="hidden" name="purchaseDesc" value="'+$(this).find("td").eq(3).text()+'">'+
						'<input type="hidden" name="prCurrency" value="'+$(this).find("input[name='prCurrency']").val()+'">'+
						'<input type="hidden" name="usedAmount" value="'+$(this).find("input[name='usedAmount']").val()+'">'+
						'<input type="hidden" name="balanceAmount" value="'+balanceAmount+'">'+
						"<input type='hidden' name='disabled'>");
		var payAmountTdHtml = "<input type='text' class='form-control form-money conPrLine' onkeyup='conPrLineShareAmount(this)' name='payAmount' placeholder='余额："+NumberToMoney(balanceAmount)+" "+billCurrency+"'>";
		payAmountTd.html(payAmountTdHtml);
		$(this).children().eq(2).css("text-align","left");
		$(this).children().eq(3).css("text-align","left");
		$(this).children().eq(4).css("text-align","right");
		$(this).children().eq(5).css("text-align","right");
		$(this).append(deleteHtml);
	});
	var prRelationTableEle = frameConPrDiv.find(".conPRRelationTable");
	if(prRelationTableEle.length>0){
		prRelationTableEle.children("tbody").append(divObj.html());
		prRelationTableEle.parent().prev().show();
		prRelationTableEle.parent().show();
		prRelationTableEle.show();
	}else{
		var relationHtml = $("#frameConPrRelationHtml").html();
		frameConPrDiv.append(relationHtml);
		prRelationTableEle = frameConPrDiv.find(".conPRRelationTable");
		prRelationTableEle.children("tbody").append(divObj.html());
	}
	//移除业务类型
	removeBusType();
	$("#purchaseQueryModel").modal('hide');
}


function deleteConPrLine(obj){
	var model_id = showMessage("您确定要删除吗？", true);
	$('#' + model_id).on('click', '.confirm', function(e) {
		var trEle = $(obj).parent().parent();
		var conPRRelationTable = trEle.parent().parent();
		var payConPrRelationId = trEle.find("input[name='payConPrRelationId']").val();
		if(payConPrRelationId==""){
			trEle.remove();
		}else{
			trEle.css("display","none");
			trEle.find("input[name='disabled']").val("1");
		}
		if(conPRRelationTable.hasClass("conPRRelationTable")){
			showBusType(conPRRelationTable);
		}
		
		if(conPRRelationTable.hasClass("prRelationTabel")&&conPRRelationTable.find("tbody tr:visible").length==0){
			//清除Pr单关联金额合计、关联PR单的thead
			conPRRelationTable.hide();
			$(".prRelation").find("div").first().hide();
		}
		sumAmount();
	});
}

function removeBusType(){
	var contractRelationTabel = frameConPrDiv.find(".frameContractRelationTabel");
	var thTrEle = contractRelationTabel.find("thead tr");
	thTrEle.children("td").eq(1).css("display","none");
	var tbTrEles = contractRelationTabel.find("tbody tr");
	tbTrEles.each(function(k,v){
		if(k!=tbTrEles.length-1){
			$(this).children("td").eq(1).css("display","none");
			$(this).children("td").eq(1).find("input").each(function(){
				$(this).val("");
			});
		}else{
			$(this).children("td").eq(0).attr("colspan","2");
		}
	});
}
function showBusType(obj){
	if($(obj).find("tbody tr:visible").length==0){
		var contractRelationTabel = $(obj).parent().parent().children(".frameContractRelationTabel");
		var thTrEle = contractRelationTabel.find("thead tr");
		thTrEle.children("td").eq(1).css("display","");
		var tbTrEles = contractRelationTabel.find("tbody tr");
		tbTrEles.each(function(k,v){
			if(k!=tbTrEles.length-1){
				$(this).children("td").eq(1).css("display","");
			}else{
				$(this).children("td").eq(0).attr("colspan","3");
			}
		});
		$(obj).hide();
		$(obj).parent().hide();
		$(obj).parent().prev().hide();
	}
}

function resetBalanceAmount(obj){
	var currency = $(obj).val();
	
	//标准合同
	var autoInput= '<span class=" fa fa-check-square no-selecteds" style="font-size:18px;" onclick="autoInput(this);"></span>'+
				   '<span class=" fa fa-check-square none selecteds" style="font-size:18px;color:#51A8DD;" onclick="autoInput(this);"></span>';
	var contractRelationTabels = $(".contractRelationTabel");
	if(contractRelationTabels.length>0){
		contractRelationTabels.each(function(){
			var trEles = $(this).find("tbody tr");
			if(trEles.length>0){
				trEles.each(function(k,v){
					if(k!=trEles.length-1){//过滤合计行
						var lastTdEle = $(this).children("td:last-child");
						var conCurrency = $(this).find("input[name='currency']").val();
						var balanceAmount = $(this).find("input[name='balanceAmount']").val();
						var payLineDescInput = $(this).find("input[name='payLineDesc']");
						var payLineAmountInput = $(this).find("input[name='payLineAmount']");
						if(currency == conCurrency && balanceAmount>0){
							payLineDescInput.removeAttr("disabled");
							payLineAmountInput.removeAttr("disabled");
							lastTdEle.html(autoInput);
						}else{
							payLineDescInput.val("");
							payLineDescInput.attr("disabled","disabled");
							payLineAmountInput.val("");
							payLineAmountInput.attr("disabled","disabled");
							lastTdEle.html("");
						}
					}
					
				});
			}
			
			var conPRRelationTable =  $(this).parent().find(".conPRRelationTable");
			if(conPRRelationTable.length>0){
				var contractId = $(this).parent().find("input[name='contractId']").val();
				$.ajax({
					type : 'post',
					url : ctx+'/conApplication/queryConPRRelation4PayedAmount.json',
					data:{
			        	"contractId":contractId,
			        	"billType":"CONTRACT_WORKFLOW",
			        	"billCurrency":currency
			        },
					async : false,
					success : function(data) {
						var dataList = data.data;
						for(var i = 0;i<dataList.length;i++){
							$.each(dataList, function(k, v) {
								var relationId = v.relationId;
								var relationIdEle = conPRRelationTable.find("input[name='relationId'][value="+relationId+"]");
								var trEle = relationIdEle.parent().parent();
								trEle.find("input[name='balanceAmount']").val(v.balanceAmount.toFixed(2));
								trEle.find("input[name='payAmount']").attr("placeholder","余额："+v.balanceAmountStr+" "+currency);
								trEle.find("input[name='payAmount']").val("");
							});
						}
						
					}
				});
			}
		});
	}
	
	//框架合同
	var contractRelationTabels = $(".frameContractRelationTabel");
	if(contractRelationTabels.length>0){
		contractRelationTabels.each(function(){
			var trEles = $(this).find("tbody tr");
			if(trEles.length>0){
				trEles.each(function(k,v){
					if(k!=trEles.length-1){//过滤合计行
						var lastTdEle = $(this).children("td:last-child");
						var conCurrency = $(this).find("input[name='currency']").val();
						var balanceAmount = $(this).find("input[name='balanceAmount']").val();
						var payLineDescInput = $(this).find("input[name='payLineDesc']");
						var payLineAmountInput = $(this).find("input[name='payLineAmount']");
						var businessTypeNameInput = $(this).find("input[name='businessTypeName']");
						var businessTypeCodeInput = $(this).find("input[name='businessTypeCode']");
						if(currency == conCurrency && balanceAmount>0){
							payLineDescInput.removeAttr("disabled");
							payLineAmountInput.removeAttr("disabled");
							if(businessTypeNameInput.length>0){
								businessTypeNameInput.removeAttr("disabled");
							}
							lastTdEle.html(autoInput);
						}else{
							if(businessTypeNameInput.length>0){
								businessTypeCodeInput.val("");
								businessTypeNameInput.val("");
								businessTypeNameInput.attr("disabled","disabled");
							}
							payLineDescInput.val("");
							payLineDescInput.attr("disabled","disabled");
							payLineAmountInput.val("");
							payLineAmountInput.attr("disabled","disabled");
							lastTdEle.html("");
						}
					}
				});
			}
			
			var conPRRelationTable =  $(this).parent().find(".conPRRelationTable");
			if(conPRRelationTable.length>0){
				var prTrEles = conPRRelationTable.find("tbody tr");
				var prLineIds = "";
				prTrEles.each(function(){
					var prLineId = $(this).find("input[name='purchaseLineId']").val();
					prLineIds+=prLineId+",";
				});
				$.ajax({
					type : 'post',
					url : ctx+'/prApplication/queryPurchaseLines4Select.json',
					data:{
			        	"prLineIds":prLineIds,
			        	"currency":currency
			        },
					async : false,
					success : function(data) {
						var dataList = data.data;
						for(var i = 0;i<dataList.length;i++){
							$.each(dataList, function(k, v) {
								var purchaseLineId = v.purchaseLineId;
								var purchaseLineIdEle = conPRRelationTable.find("input[name='purchaseLineId'][value="+purchaseLineId+"]");
								var trEle = purchaseLineIdEle.parent().parent();
								trEle.find("input[name='balanceAmount']").val(v.balanceAmount.toFixed(2));
								trEle.find("input[name='payAmount']").attr("placeholder","余额："+v.balanceAmountStr+" "+currency);
								trEle.find("input[name='payAmount']").val("");
							});
						}
						
					}
				});
			}
		});
	}
	
	
	//关联PR单
	var prRelationTabel = $(".prRelationTabel");
	if(prRelationTabel.length>0){
		var prTrEles = prRelationTabel.find("tbody tr");
		var prLineIds = "";
		prTrEles.each(function(){
			var prLineId = $(this).find("input[name='purchaseLineId']").val();
			prLineIds+=prLineId+",";
		});
		$.ajax({
			type : 'post',
			url : ctx+'/prApplication/queryPurchaseLines4Select.json',
			data:{
	        	"prLineIds":prLineIds,
	        	"currency":currency
	        },
			async : false,
			success : function(data) {
				var dataList = data.data;
				for(var i = 0;i<dataList.length;i++){
					$.each(dataList, function(k, v) {
						var purchaseLineId = v.purchaseLineId;
						var purchaseLineIdEle = prRelationTabel.find("input[name='purchaseLineId'][value="+purchaseLineId+"]");
						var trEle = purchaseLineIdEle.parent().parent();
						trEle.find("input[name='balanceAmount']").val(v.balanceAmount.toFixed(2));
						trEle.find("input[name='payLineAmount']").attr("placeholder","余额："+v.balanceAmountStr+" "+currency);
					});
				}
				
			}
		});
	}
	
	$(".relationCurrency").each(function(){
		$(this).text(currency);
	});
	
	sumAmount();
}

function onBlur(obj){
	var j_tr = $(obj).parent().parent();
	var unitPrice = j_tr.find("[name=unitAmount]").val();
	var num = j_tr.find("[name=quantity]").val();
	console.info(unitPrice);
	console.info(num);
	 if(num === "" || num ==null || unitPrice === "" || unitPrice ==null){
		 j_tr.find("[name=payLineAmount]").val("")
		 return;
	    }
	 console.info(MoneyToNumber(unitPrice));
	 console.info((MoneyToNumber(num)*MoneyToNumber(unitPrice)).toFixed(2));
	 //j_tr.find("[name=payLineAmount]").val((Number(num)*Number(unitPrice)).toFixed(2));
	j_tr.find("[name=payLineAmount]").val((MoneyToNumber(num)*MoneyToNumber(unitPrice)).toFixed(2));
	
	sumAmount();
	return;
	
}
function autoInput(obj){

	var classNames = $(obj).attr('class');
	var isChecked = false;
	if(classNames.indexOf('no')>0){
		isChecked = true;
		$(obj).siblings('.selecteds').removeClass('none');
		$(obj).addClass('none');
	}else{
	    $(obj).siblings('.no-selecteds').removeClass('none');
	    $(obj).addClass('none');
	}
     
	var payLineAmount = $(obj).parent().parent().find("input[name='payLineAmount']");
	if(isChecked){
		var balanceAmount = $(obj).parent().parent().find("input[name='balanceAmount']");
		payLineAmount.val(MoneyToNumber(balanceAmount.val()).toFixed(2));
	}else{
		payLineAmount.val("");
	}
	sumAmount();
	if(!conLineShareAmount(payLineAmount)){
		$(obj).siblings('.selecteds').addClass('none');
		$(obj).parent().find('.no-selecteds').removeClass('none');
		payLineAmount.val("");
		sumAmount();
	}
	
}

function checkSave(){
	var paymentAmountEdit = $("#paymentAmountEdit");
	var payAmount = paymentAmountEdit.val();
	if(paymentAmountEdit.attr("type")=="text"&&payAmount!=""){
		if(payAmount.match(/^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/)||MoneyToNumber(payAmount)=="error"){
			showMessage("付款金额输入有误！");
			return false;
		}
	}
	var paymentAmount = $("#paymentAmount").text();
	if(paymentAmount==""||MoneyToNumber(paymentAmount)==0){
		showMessage("付款金额不能为0！");
		return false;
	}
	if(!fvTask.validate()){
		return false;
	}
	
	if(!checkConPRAmount()){
		return false;
	}
	return true;
}

function checkConPRAmount(){
	var result = true;
	var checkAmount = $(".checkAmount");
	if(checkAmount.length>0){
		checkAmount.each(function(){
			if($(this).css("display")!="none"){
				var conPRRelationTable = $(this).find(".conPRRelationTable");
				if(conPRRelationTable.length>0){
					var prRelationAmount = 0;
					var payAmountEles =conPRRelationTable.find("input[name='payAmount']");
					payAmountEles.each(function(){
						if($(this).val()!=""&&$(this).parent().parent().css("display")!="none"){
							prRelationAmount+=MoneyToNumber($(this).val());
						}
					});
					var conAmount = $(this).find("strong[name='contractRelationAmount']").text();
					if(MoneyToNumber(conAmount)!=MoneyToNumber(prRelationAmount)){
						showMessage('关联合同金额与合同关联PR单的金额不相等！');
						result = false;
						return false;
					}
				}
			}
		});
	}
	return result;
}

function sumAmount(){
	var currency = $("#currency").val();
	var paymentAmount = 0;
	//直接付款的
	var paymentLineTrs = $(".paymentLinesTable tbody tr");
	var paymentLineSumAmount = 0;
	if(paymentLineTrs){
		paymentLineTrs.each(function(){
			if($(this).css("display")!="none"){
				var payLineAmonut = $(this).find("input[name='payLineAmount']").val();
				if(payLineAmonut==""){
					payLineAmonut= 0;
				}
				if(MoneyToNumber(payLineAmonut)!="error"){
					paymentLineSumAmount+=MoneyToNumber(payLineAmonut);
				}
			}
		});
	}
	
	var ifSumFrameConLine = 0;
	
	//标准合同的
	var conSumAmount = 0;
	var contractRelationTabel = $(".contractRelationTabel");
	if(contractRelationTabel&&contractRelationTabel.length>0){
		contractRelationTabel.each(function(){
			var contractRelationAmount = 0;
			if($(this).parent().css("display")!="none"){
				ifSumFrameConLine++;
				var payLineAmountEles = $(this).find("input[name='payLineAmount']");
				payLineAmountEles.each(function(){
					if(MoneyToNumber($(this).val())!="error"){
						contractRelationAmount+=MoneyToNumber($(this).val());
					}else{
						contractRelationAmount+=0;
					}
					var balanceAmount = $(this).parent().parent().find("input[name='balanceAmount']").val();
					if(MoneyToNumber($(this).val())!=balanceAmount){
						$(this).parent().next().find('.no-selecteds').removeClass('none');
						$(this).parent().next().find('.selecteds').addClass('none');
					}else{
						$(this).parent().next().find('.no-selecteds').addClass('none');
						$(this).parent().next().find('.selecteds').removeClass('none');
					}
					
				});
				if(NumberToMoney(contractRelationAmount)=="0"){
					$(this).find("strong[name='contractRelationAmount']").text("0.00 ");
					$(this).find("strong[name='contractRelationAmount']").next().text(" "+currency)
				}else{
					$(this).find("strong[name='contractRelationAmount']").text(NumberToMoney(contractRelationAmount));
					$(this).find("strong[name='contractRelationAmount']").next().text(" "+currency)
				}
				//关联PR单金额
				var conPRRelationTable = $(this).parent().find(".conPRRelationTable");
				if(conPRRelationTable.length>0){
					conPRRelationTable.find("input[name='payAmount']").each(function(){
						if(MoneyToNumber($(this).val())!="error"){
							conSumAmount+=MoneyToNumber($(this).val());
						}else{
							conSumAmount+=0;
						}
					});
				}
			}
		});
		if(NumberToMoney(conSumAmount)=="0"){
			$("#contractSumAmount").text("0.00");
		}else{
			$("#contractSumAmount").text(NumberToMoney(conSumAmount));
		}
		
	}else{
		$("#contractSumAmount").text("0.00");
	}
	
	
	//框架合同的
	var frameConSumAmount = 0 ;
	var frameContractRelationTabel = $(".frameContractRelationTabel");
	if(frameContractRelationTabel&&frameContractRelationTabel.length>0){
		frameContractRelationTabel.each(function(){
			var frameContractRelationAmount = 0;
			if($(this).parent().css("display")!="none"){
				var payLineAmountEles = $(this).find("input[name='payLineAmount']");
				payLineAmountEles.each(function(){
					if(MoneyToNumber($(this).val())!="error"){
						frameContractRelationAmount+=MoneyToNumber($(this).val());
					}else{
						frameContractRelationAmount+=0;
					}
					var balanceAmount = $(this).parent().parent().find("input[name='balanceAmount']").val();
					if(MoneyToNumber($(this).val())!=balanceAmount){
						$(this).parent().next().find('.no-selecteds').removeClass('none');
						$(this).parent().next().find('.selecteds').addClass('none');
					}else{
						$(this).parent().next().find('.no-selecteds').addClass('none');
						$(this).parent().next().find('.selecteds').removeClass('none');
					}
				});
				if(frameContractRelationAmount==0){
					$(this).find("strong[name='contractRelationAmount']").text("0.00 ");
					$(this).find("strong[name='contractRelationAmount']").next().text(" "+currency)
				}else{
					$(this).find("strong[name='contractRelationAmount']").text(NumberToMoney(frameContractRelationAmount));
					$(this).find("strong[name='contractRelationAmount']").next().text(" "+currency)
				}
				
				//关联PR单金额
				var conPRRelationTable = $(this).parent().find(".conPRRelationTable");
				if(conPRRelationTable.length>0){
					ifSumFrameConLine++;
					conPRRelationTable.find("input[name='payAmount']").each(function(){
						if(MoneyToNumber($(this).val())!="error"
								&&$(this).parent().parent().css("display")!="none"){
							frameConSumAmount+=MoneyToNumber($(this).val());
						}else{
							frameConSumAmount+=0;
						}
					});
				}
			}
			
		});
	}
	
	//PR单的
	var prSumAmount = 0;
	var prRelationTabel = $(".prRelationTabel");
	if(prRelationTabel&&prRelationTabel.length>0){
		var payLineAmountEles = prRelationTabel.find("input[name='payLineAmount']");
		payLineAmountEles.each(function(){
			if($(this).parent().css("display")!="none"){
				ifSumFrameConLine++;
				if(MoneyToNumber($(this).val())!="error"){
					prSumAmount+=MoneyToNumber($(this).val());
				}else{
					prSumAmount+=0;
				}
			}
		});
		if(NumberToMoney(prSumAmount)=="0"){
			$("#prRelationAmount").text("0.00");
		}else{
			$("#prRelationAmount").text(NumberToMoney(prSumAmount));
		}
	}else{
		$("#prRelationAmount").text("0.00");
	}
	
	
	
	//只有框架合同并且框架合同没有PR单的时候付款金额按框架合同行金额计算
	if(ifSumFrameConLine==0&&frameContractRelationTabel.length>0){
		frameContractRelationTabel.each(function(){
			if($(this).parent().css("display")!="none"){
				var payLineAmountEles = $(this).find("input[name='payLineAmount']");
				payLineAmountEles.each(function(){
					if(MoneyToNumber($(this).val())!="error"){
						paymentAmount+=MoneyToNumber($(this).val());
					}else{
						paymentAmount+=0;
					}
				});
			}
		});
		paymentAmount = NumberToMoney(paymentAmount);
	}else{
		paymentAmount = NumberToMoney(paymentLineSumAmount+conSumAmount+frameConSumAmount+prSumAmount);
	}
	
	
	if(paymentAmount==0){
		paymentAmount="0.00";
	}
	$("#paymentAmount").text(paymentAmount);
	$("#paymentAmountEdit").val(paymentAmount);
}

function deleteContract(obj){
	var model_id = showMessage("您确定要删除此合同吗？", true);
	$('#' + model_id).on('click', '.confirm', function(e) {
		var conRelationEle = $(obj).parent().parent().parent();
		var relationId = conRelationEle.find("input[name='relationId']").val();
		if(relationId!=""){
			conRelationEle.find("input[name='disabled']").val("1");
			conRelationEle.hide();
		}else{
			conRelationEle.remove();
		}
		sumAmount();
		showSumAmount();
	});
	
}

function deletePr(obj){
	var model_id = showMessage("您确定要删除此PR单吗？", true);
	$('#' + model_id).on('click', '.confirm', function(e) {
		var prRelationEle = $(obj).parent().parent().parent();
		var relationId = prRelationEle.find("input[name='relationId']").val();
		if(relationId!=""){
			prRelationEle.find("input[name='disabled']").val("1");
			prRelationEle.hide();
		}else{
			prRelationEle.remove();
		}
		sumAmount();
		showSumAmount();
	});
	
}


function goNext() {
	if(checkSave()){
		var contractIdEles = $("#dataForm").find("input[name='contractId']");
		var ifOneVendor = true;
		var vendorName="" ;
		contractIdEles.each(function(){
			if($(this).parent().parent().parent().css("display")!="none"){
				if(vendorName!=""){
					if(vendorName!=$(this).parent().parent().find(".vendorName").text()){
						ifOneVendor = false;
						return false;
					}
				}else{
					vendorName = $(this).parent().parent().find(".vendorName").text();
				}
			}
		});
		//console.info(vendorName);
		if(!ifOneVendor){
			var model_id = showMessage("合同对方主体不一致，确定继续？", true);
			$('#' + model_id).on('click', '.confirm', function(e) {
				sendPaymentRelation2Redis();
			});
		}else{
			sendPaymentRelation2Redis();
		}
	}
	
}
function sendPaymentRelation2Redis(){
	var paymentHeaderId = $("#dataForm").find("input[name='paymentHeaderId']").val();
	var paymentNumber = $("#dataForm").find("input[name='paymentNumber']").val();
	var paymentAmount = $("#paymentAmount").text();
	if(paymentAmount==""){
		paymentAmount=0;
	}
	var data = {
			'headerInfo.amount':MoneyToNumber(paymentAmount),
			'headerInfo.currency':$('#currency').val(),
			'headerInfo.payType':$('#payType').val(),
			'headerInfo.deptId':$('#deptId').val(),
			'headerInfo.deptName':$('#deptName').val(),
			'headerInfo.payTypeName':$("#payType").find("option:selected").text(),
			'headerInfo.paymentHeaderId':paymentHeaderId,
			'headerInfo.paymentNumber':paymentNumber,
	};
	//直接付款
	var trEles =  $(".paymentLinesTable tbody tr");
	if(typeof(trEles)!="undefined"){
		trEles.each(function(k,v){
			var trEle=$(this);
			if(""!=trEle.find("input[name='payLineAmount']").val()){
				var unitAmount = trEle.find("input[name='unitAmount']").val();
				if(unitAmount!=""){
					unitAmount = MoneyToNumber(unitAmount);
				}
				var payLineAmount = trEle.find("input[name='payLineAmount']").val();
				if(payLineAmount!=""){
					payLineAmount = MoneyToNumber(payLineAmount);
				}
				data["paymentLineList["+k+"].paymentPlanLinesId"]=trEle.find("input[name='paymentPlanLineId']").val();
				data["paymentLineList["+k+"].disabled"]=trEle.find("input[name='disabled']").val();
				data["paymentLineList["+k+"].businessTypeCode"]=trEle.find("input[name='businessTypeCode']").val();
				data["paymentLineList["+k+"].businessTypeName"]=trEle.find("input[name='businessTypeName']").val();
				data["paymentLineList["+k+"].paymentDesc"]=trEle.find("input[name='payLineDesc']").val();
				data["paymentLineList["+k+"].unitAmount"]=unitAmount;
				data["paymentLineList["+k+"].quantity"]=trEle.find("input[name='quantity']").val();
				data["paymentLineList["+k+"].totalAmount"]=payLineAmount;
			}
			
		});
	}
	//关联合同
	var contractRelationTabel = $(".contractRelationTabel");
	if(typeof(contractRelationTabel)!="undefined"){
		contractRelationTabel.each(function(k,v){
			var contractId  = $(this).parent().find("input[name='contractId']").val();
			var relationId  = $(this).parent().find("input[name='relationId']").val();
			var disabled  = $(this).parent().find("input[name='disabled']").val();
			var contractAmount  = $(this).parent().find("input[name='contractAmount']").val();
			var contractCurrency  = $(this).parent().find("input[name='contractCurrency']").val();
			var contractNumber  = $(this).parent().find(".contractNumber").text();
			var contractName  = $(this).parent().find(".contractName").text();
			var vendorName  = $(this).parent().find(".vendorName").text();
			var legalNumber  = $(this).parent().find(".legalNumber").text();
			var contractRelationAmount = $(this).find("strong[name='contractRelationAmount']").text();
			data["contractRelationList["+k+"].contractId"]=contractId;
			data["contractRelationList["+k+"].relationId"]=relationId;
			data["contractRelationList["+k+"].disabled"]=disabled;
			data["contractRelationList["+k+"].contractAmount"]=MoneyToNumber(contractAmount);
			data["contractRelationList["+k+"].currency"]=contractCurrency;
			data["contractRelationList["+k+"].contractNumber"]=contractNumber;
			data["contractRelationList["+k+"].contractName"]=contractName;
			data["contractRelationList["+k+"].vendorName"]=vendorName;
			data["contractRelationList["+k+"].legalNumber"]=legalNumber;
			data["contractRelationList["+k+"].contractRelationAmount"]=MoneyToNumber(contractRelationAmount);
			//合同行信息
			var conLines = $(this).find("tbody tr");
			conLines.each(function(m,n){
				var payLineAmount = $(this).find("input[name='payLineAmount']").val();
				if(typeof(payLineAmount)!="undefined"){//排除合计
					var payPlanId = $(this).find("input[name='payPlanId']").val();
					var paymentLineId = $(this).find("input[name='paymentLineId']").val();
					var payStageStr = $(this).find("input[name='payStageStr']").val();
					var payRequirements = $(this).find("input[name='payRequirements']").val();
					var payLineDesc = $(this).find("input[name='payLineDesc']").val();
					var payPlanMoney = $(this).find("input[name='payPlanMoney']").val();
					var currency = $(this).find("input[name='currency']").val();
					var paidAmount = $(this).find("input[name='paidAmount']").val();
					var blanceAmount = $(this).find("input[name='balanceAmount']").val();
					data["contractRelationList["+k+"].conPayPlanList["+m+"].contractId"]=contractId;
					data["contractRelationList["+k+"].conPayPlanList["+m+"].disabled"]=disabled;
					data["contractRelationList["+k+"].conPayPlanList["+m+"].payPlanId"]=payPlanId;
					data["contractRelationList["+k+"].conPayPlanList["+m+"].paymentLineId"]=paymentLineId;
					data["contractRelationList["+k+"].conPayPlanList["+m+"].payStageStr"]=payStageStr;
					data["contractRelationList["+k+"].conPayPlanList["+m+"].payRequirements"]=payRequirements;
					data["contractRelationList["+k+"].conPayPlanList["+m+"].payLineDesc"]=payLineDesc;
					data["contractRelationList["+k+"].conPayPlanList["+m+"].payPlanMoney"]=MoneyToNumber(payPlanMoney);
					data["contractRelationList["+k+"].conPayPlanList["+m+"].currency"]=currency;
					data["contractRelationList["+k+"].conPayPlanList["+m+"].paidAmount"]=MoneyToNumber(paidAmount);
					data["contractRelationList["+k+"].conPayPlanList["+m+"].payLineAmount"]=(payLineAmount==""?"":MoneyToNumber(payLineAmount));
					data["contractRelationList["+k+"].conPayPlanList["+m+"].blanceAmount"]=MoneyToNumber(blanceAmount);
				}
			});
			
			//合同关联PR单
			var conPRRelationTable =  $(this).parent().find(".conPRRelationTable");
			if(conPRRelationTable.length>0){
				var conPRRelationTrs = conPRRelationTable.find("tbody tr");
				conPRRelationTrs.each(function(m,n){
					var prRelationId = $(this).find("input[name='relationId']").val();
					var payConPrRelationId = $(this).find("input[name='payConPrRelationId']").val();
					var purchaseHeaderId = $(this).find("input[name='purchaseHeaderId']").val();
					var purchaseLineId = $(this).find("input[name='purchaseLineId']").val();
					var purchaseNumber = $(this).find("input[name='purchaseNumber']").val();
					var lineNumber = $(this).find("input[name='lineNumber']").val();
					var businessTypeName = $(this).find("input[name='businessTypeName']").val();
					var businessTypeCode = $(this).find("input[name='businessTypeCode']").val();
					var purchaseDesc = $(this).find("input[name='purchaseDesc']").val();
					var currency = $(this).find("input[name='currency']").val();
					var balanceAmount = $(this).find("input[name='balanceAmount']").val();
					var usedPurchaseAmount = $(this).find("input[name='usedPurchaseAmount']").val();
					var relationPayedAmount = $(this).find("input[name='relationPayedAmount']").val();
					var payAmount = $(this).find("input[name='payAmount']").val();
					
					data["contractRelationList["+k+"].prRelationList["+m+"].relationId"]=prRelationId;
					data["contractRelationList["+k+"].prRelationList["+m+"].payConPrRelationId"]=payConPrRelationId;
					data["contractRelationList["+k+"].prRelationList["+m+"].billId"]=contractId;
					data["contractRelationList["+k+"].prRelationList["+m+"].purchaseLineId"]=purchaseLineId;
					data["contractRelationList["+k+"].prRelationList["+m+"].purchaseHeaderId"]=purchaseHeaderId;
					data["contractRelationList["+k+"].prRelationList["+m+"].purchaseNumber"]=purchaseNumber;
					data["contractRelationList["+k+"].prRelationList["+m+"].businessTypeName"]=businessTypeName;
					data["contractRelationList["+k+"].prRelationList["+m+"].businessTypeCode"]=businessTypeCode;
					data["contractRelationList["+k+"].prRelationList["+m+"].lineNumber"]=lineNumber;
					data["contractRelationList["+k+"].prRelationList["+m+"].purchaseDesc"]=purchaseDesc;
					data["contractRelationList["+k+"].prRelationList["+m+"].currency"]=currency;
					data["contractRelationList["+k+"].prRelationList["+m+"].relationPayedAmount"]=MoneyToNumber(relationPayedAmount);
					data["contractRelationList["+k+"].prRelationList["+m+"].usedPurchaseAmount"]=MoneyToNumber(usedPurchaseAmount);
					data["contractRelationList["+k+"].prRelationList["+m+"].payAmount"]=(payAmount==""?"":MoneyToNumber(payAmount));
					data["contractRelationList["+k+"].prRelationList["+m+"].balanceAmount"]=MoneyToNumber(balanceAmount);
					
				});
			}
			
		});
		
	}
	//关联框架合同
	var frameContractRelationTabel = $(".frameContractRelationTabel");
	if(typeof(frameContractRelationTabel)!="undefined"){
		frameContractRelationTabel.each(function(k,v){ 
			var contractId  = $(this).parent().find("input[name='contractId']").val();
			var relationId  = $(this).parent().find("input[name='relationId']").val();
			var disabled  = $(this).parent().find("input[name='disabled']").val();
			var contractAmount  = $(this).parent().find("input[name='contractAmount']").val();
			var contractCurrency  = $(this).parent().find("input[name='contractCurrency']").val();
			var contractNumber  = $(this).parent().find(".contractNumber").text();
			var contractName  = $(this).parent().find(".contractName").text();
			var vendorName  = $(this).parent().find(".vendorName").text();
			var legalNumber  = $(this).parent().find(".legalNumber").text();
			var contractRelationAmount = $(this).find("strong[name='contractRelationAmount']").text();
			var contractPaySumAmount = $(this).find("strong[name='contractPaySumAmount']").text();
			if(!contractRelationAmount){
				contractRelationAmount=0;
			}
			if(!contractPaySumAmount){
				contractPaySumAmount=0;
			}
			data["frameConRelationList["+k+"].contractId"]=contractId;
			data["frameConRelationList["+k+"].contractRelationAmount"]=MoneyToNumber(contractRelationAmount);
			data["frameConRelationList["+k+"].contractPaySumAmount"]=MoneyToNumber(contractPaySumAmount);
			data["frameConRelationList["+k+"].relationId"]=relationId;
			data["frameConRelationList["+k+"].disabled"]=disabled;
			data["frameConRelationList["+k+"].contractAmount"]=MoneyToNumber(contractAmount);
			data["frameConRelationList["+k+"].currency"]=contractCurrency;
			data["frameConRelationList["+k+"].contractNumber"]=contractNumber;
			data["frameConRelationList["+k+"].contractName"]=contractName;
			data["frameConRelationList["+k+"].vendorName"]=vendorName;
			data["frameConRelationList["+k+"].legalNumber"]=legalNumber;
			//框架合同行信息
			var conLines = $(this).find("tbody tr");
			conLines.each(function(m,n){
				var payLineAmount = $(this).find("input[name='payLineAmount']").val();
				if(typeof(payLineAmount)!="undefined"){//排除合计
					var payPlanId = $(this).find("input[name='payPlanId']").val();
					var paymentLineId = $(this).find("input[name='paymentLineId']").val();
					var payStageStr = $(this).find("input[name='payStageStr']").val();
					var businessTypeCode = $(this).find("input[name='businessTypeCode']").val();
					var businessTypeName = $(this).find("input[name='businessTypeName']").val();
					var payLineDesc = $(this).find("input[name='payLineDesc']").val();
					var payPlanMoney = $(this).find("input[name='payPlanMoney']").val();
					var currency = $(this).find("input[name='currency']").val();
					var paidAmount = $(this).find("input[name='paidAmount']").val();
					var blanceAmount = $(this).find("input[name='balanceAmount']").val();
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].contractId"]=contractId;
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].disabled"]=disabled;
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].payPlanId"]=payPlanId;
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].paymentLineId"]=paymentLineId;
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].payStageStr"]=payStageStr;
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].businessTypeCode"]=businessTypeCode;
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].businessTypeName"]=businessTypeName;
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].payLineDesc"]=payLineDesc;
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].payPlanMoney"]=MoneyToNumber(payPlanMoney);
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].currency"]=currency;
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].paidAmount"]=MoneyToNumber(paidAmount);
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].payLineAmount"]=(payLineAmount==""?"":MoneyToNumber(payLineAmount));
					data["frameConRelationList["+k+"].conPayPlanList["+m+"].blanceAmount"]=MoneyToNumber(blanceAmount);
				}
			});
			
			//框架合同关联PR单
			var conPRRelationTable =  $(this).parent().find(".conPRRelationTable");
			if(conPRRelationTable.length>0){
				var conPRRelationTrs = conPRRelationTable.find("tbody tr");
				conPRRelationTrs.each(function(m,n){
					var payConPrRelationId = $(this).find("input[name='payConPrRelationId']").val();
					var purchaseHeaderId = $(this).find("input[name='purchaseHeaderId']").val();
					var purchaseLineId = $(this).find("input[name='purchaseLineId']").val();
					var purchaseNumber = $(this).find("input[name='purchaseNumber']").val();
					var lineNumber = $(this).find("input[name='lineNumber']").val();
					var businessTypeName = $(this).find("input[name='businessTypeName']").val();
					var businessTypeCode = $(this).find("input[name='businessTypeCode']").val();
					var purchaseDesc = $(this).find("input[name='purchaseDesc']").val();
					var prCurrency = $(this).find("input[name='prCurrency']").val();
					var balanceAmount = $(this).find("input[name='balanceAmount']").val();
					var totalAmount = $(this).find("input[name='totalAmount']").val();
					var usedAmount = $(this).find("input[name='usedAmount']").val();
					var payAmount = $(this).find("input[name='payAmount']").val();
					
					data["frameConRelationList["+k+"].prRelationList["+m+"].payConPrRelationId"]=payConPrRelationId;
					data["frameConRelationList["+k+"].prRelationList["+m+"].billId"]=contractId;
					data["frameConRelationList["+k+"].prRelationList["+m+"].purchaseHeaderId"]=purchaseHeaderId;
					data["frameConRelationList["+k+"].prRelationList["+m+"].purchaseLineId"]=purchaseLineId;
					data["frameConRelationList["+k+"].prRelationList["+m+"].purchaseNumber"]=purchaseNumber;
					data["frameConRelationList["+k+"].prRelationList["+m+"].businessTypeName"]=businessTypeName;
					data["frameConRelationList["+k+"].prRelationList["+m+"].businessTypeCode"]=businessTypeCode;
					data["frameConRelationList["+k+"].prRelationList["+m+"].lineNumber"]=lineNumber;
					data["frameConRelationList["+k+"].prRelationList["+m+"].purchaseDesc"]=purchaseDesc;
					data["frameConRelationList["+k+"].prRelationList["+m+"].totalAmount"]=MoneyToNumber(totalAmount);
					data["frameConRelationList["+k+"].prRelationList["+m+"].prCurrency"]=prCurrency;
					data["frameConRelationList["+k+"].prRelationList["+m+"].usedAmount"]=MoneyToNumber(usedAmount);
					data["frameConRelationList["+k+"].prRelationList["+m+"].payAmount"]=(payAmount==""?"":MoneyToNumber(payAmount));
					data["frameConRelationList["+k+"].prRelationList["+m+"].balanceAmount"]=MoneyToNumber(balanceAmount);
					
				});
			}
		});
	}
	
	//关联PR单
	var prRelationTabel = $(".prRelationTabel");
	if(typeof(prRelationTabel)!="undefined"){
		var prLines = prRelationTabel.find("tbody tr");
		prLines.each(function(m,n){
			var disabled = $(this).find("input[name='disabled']").val();
			var purchaseHeaderId = $(this).find("input[name='purchaseHeaderId']").val();
			var purchaseNumber = $(this).find("input[name='purchaseNumber']").val();
			var purchaseName = $(this).find("input[name='purchaseName']").val();
			var purchaseLineId = $(this).find("input[name='purchaseLineId']").val();
			var businessTypeCode = $(this).find("input[name='businessTypeCode']").val();
			var businessTypeName = $(this).find("input[name='businessTypeName']").val();
			var paymentLineId = $(this).find("input[name='payConPrRelationId']").val();
			var lineNumber = $(this).find("input[name='lineNumber']").val();
			var paymentDesc = $(this).find("input[name='paymentDesc']").val();
			var totalAmount = $(this).find("input[name='totalAmount']").val();
			var currency = $(this).find("input[name='currency']").val();
			var balanceAmount = $(this).find("input[name='balanceAmount']").val();
			var payLineAmount = $(this).find("input[name='payLineAmount']").val();
			data["prLineList["+m+"].purchaseHeaderId"]=purchaseHeaderId;
			data["prLineList["+m+"].purchaseNumber"]=purchaseNumber;
			data["prLineList["+m+"].purchaseName"]=purchaseName;
			data["prLineList["+m+"].purchaseLineId"]=purchaseLineId;
			data["prLineList["+m+"].disabled"]=disabled;
			data["prLineList["+m+"].businessTypeCode"]=businessTypeCode;
			data["prLineList["+m+"].businessTypeName"]=businessTypeName;
			data["prLineList["+m+"].paymentLineId"]=paymentLineId;
			data["prLineList["+m+"].lineNumber"]=lineNumber;
			data["prLineList["+m+"].paymentDesc"]=paymentDesc;
			data["prLineList["+m+"].totalAmount"]=MoneyToNumber(totalAmount);
			data["prLineList["+m+"].prCurrency"]=currency;
			data["prLineList["+m+"].balanceAmount"]=MoneyToNumber(balanceAmount);
			data["prLineList["+m+"].paymentLineAmount"]=(payLineAmount==""?"":MoneyToNumber(payLineAmount));
		});
	}
	
	//console.info(data);
	$.ajax({
        type : "POST",
        url : ctx+"/payApplication/sendPaymentRelation2Redis.json",
        data : data,
        async : false,
        success : function(ret) {
        	if(ret.code==0){
        		window.location = ctx+"/payApplication/payment_lastpage.html";
        	}else{
        		showMessage("缓存失败："+ret.msg);
        	}
      	}
	});
}

function deletePayLine() {
	var eles = $(".paymentLinesTable tbody input:checked");
	if(eles){
		eles.each(function(){
			if($(this).val()==""){
				$(this).parent().parent().remove();
			}else{
				$(this).parent().find("input[name='disabled']").val("1");
				$(this).parent().parent().hide();
			}
		});
	}
	sumAmount();
}

function addPayLine(index) {
	var trHtml = '<tr>'+
					'<td><input  type="checkbox" name="paymentPlanLineId" value=""><input type="hidden" name="disabled" value=""></td>'+
					'<td><input type="hidden" name="businessTypeCode" value="">'+
						'<input readonly="readonly" type="text" class="form-control vEmpty" name="businessTypeName"'+
						'onclick="selectBussinessType(this)" value=""></td>'+
					'<td><input type="text" class="form-control vEmpty showPopMsg" name="payLineDesc" value=""></td>'+
					'<td><input type="text" class="form-control form-money" name="unitAmount" onblur="onBlur(this)" id="unitAmount'+index+'" value=""></td>'+
					'<td><input style="text-align: right;" type="number" class="form-control quantity" name="quantity" onblur="onBlur(this)" id="quantity'+index+'" value=""></td>'+
					'<td><input type="text" class="form-control vEmpty form-money" onkeyup="sumAmount()" name="payLineAmount" id="payLineAmount'+index+'" value=""></td>'+
				'</tr>';
	$(".paymentLinesTable tbody").append(trHtml);
	bindPopMsgPayInfo($('.showPopMsg'));
}
//全选
function selectAll(){
	  var sel=document.getElementById('checkAll');
	  var f =sel.checked;
	  //console.info(f);
	  var checkboxes=document.getElementsByName('paymentPlanLineId');
	  for(var i=0;i<checkboxes.length;i++){
		  checkboxes[i].checked=f;
	  }
	}
$(".paymentLinesTable").on("click","input",function(){//给input框添加click事件
	 var f=true;
	   var checkboxes=document.getElementsByName('paymentPlanLineId');
	   var sel=document.getElementById('checkAll');
	     for(var i=0;i<checkboxes.length;i++){
	   if(checkboxes[i].checked!=f){
	  sel.checked=false;
	  break;
	}
	sel.checked=f;
	}
});

function showSumAmount() {
	var showConAmount=false;
	var contractRelationTabel = $(".contractRelationTabel");
	if(contractRelationTabel&&contractRelationTabel.length>0){
		contractRelationTabel.each(function(){
			if($(this).parent().css("display")!="none"){
				showConAmount = true;
				return false;
			}
		});
	}
	if (showConAmount) {
		$(".contractRelation").find("div").first().show();
	} else {
		$(".contractRelation").find("div").first().hide();
	}
	
	var showPrAmount=false;
	var prRelationTabel = $(".prRelationTabel");
	if(prRelationTabel&&prRelationTabel.length>0){
		prRelationTabel.each(function(){
			if($(this).parent().css("display")!="none"){
				showPrAmount = true;
				return false;
			}
		});
	}
	if (showPrAmount) {
		$(".prRelation").find("div").first().show();
	} else {
		$(".prRelation").find("div").first().hide();
	}
}

function addContract(contractIds){
	var currency = $("#currency").val();
	$.ajax({
		type : 'post',
		url : ctx+'/conApplication/queryContract4Select.json',
		data:{
        	"contractIds":contractIds,
        	"currency":currency
        },
		async : false,
		success : function(data) {
			var dataList = data.data;
			for(var i = 0;i<dataList.length;i++){
				if("CONTRACT_TYPE_FRAME"==dataList[i].contractTypeCode){
					addFrameContract(dataList[i],currency);
				}else{
					addStandardContract(dataList[i],currency);
				}
			}
			showSumAmount();
			bindPopMsgPayInfo($('.showPopMsgPay'));
		}
	});
}	
//框架合同合同
function addFrameContract(dataList,currency){
	var trsHtml = "";
	var conPayPlanLines = dataList.conPayPlanList;
	if(conPayPlanLines){
		//遍历合同行
		for(var j = 0;j<conPayPlanLines.length;j++){
			trsHtml+='<tr>'+
						 '<td><input type="hidden" name="payPlanId" value="'+conPayPlanLines[j].payPlanId+'">'+
						 '<input type="hidden" name="paymentLineId" value="">'+
						 '<input type="hidden" name="payStageStr" value="'+conPayPlanLines[j].payStageStr+'">'+
						 '<input type="hidden" name="payPlanMoney" value="'+conPayPlanLines[j].payPlanMoney+'">'+
						 '<input type="hidden" name="currency" value="'+conPayPlanLines[j].currency+'">'+
						 '<input type="hidden" name="paidAmount" value="'+conPayPlanLines[j].paidAmount+'">'+
						 '<input type="hidden" name="balanceAmount" value="'+conPayPlanLines[j].blanceAmount+'">'+
							conPayPlanLines[j].payStageStr+'</td>';
			if(conPayPlanLines[j].blanceAmount>0&&conPayPlanLines[j].currency==currency){
				trsHtml+='<td><input type="hidden" name="businessTypeCode">'+
					'<input type="text" readonly="readonly" class="form-control vEmpty" name="businessTypeName" onclick="selectBussinessType(this)"></td>'+
					'<td><input type="text" class="form-control vEmpty showPopMsgPay" name="payLineDesc" value="'+conPayPlanLines[j].payLineDesc+'"></td>'+
					'<td style="text-align: right;">'+conPayPlanLines[j].payPlanMoneyStr+' '+conPayPlanLines[j].currency+'</td>'+
					'<td style="text-align: right;padding-right: 10px;">'+conPayPlanLines[j].paidAmountStr+' '+conPayPlanLines[j].currency+'</td>'+
					'<td style="text-align: right;">'+
							'<input type="text" class="form-control form-money conLine"'+
								'name="payLineAmount" value=""onkeyup="sumAmount();conLineShareAmount(this)" '+
								'placeholder="余额：'+conPayPlanLines[j].blanceAmountStr+'&nbsp;'+conPayPlanLines[j].currency+'">'+
					 '</td>'+
					 '<td><span class=" fa fa-check-square no-selecteds" style="font-size:18px;" onclick="autoInput(this);"></span>'+
						 '<span class=" fa fa-check-square none selecteds" style="font-size:18px;color:#51A8DD;" onclick="autoInput(this);"></span></td>'+
				 '</tr>';
			}else{
				trsHtml+='<td ><input type="hidden" name="businessTypeCode"><input type="text" class="form-control vEmpty" name="businessTypeName" disabled></td>'+
				'<td><input type="text" class="form-control vEmpty" disabled name="payLineDesc" value="'+conPayPlanLines[j].payLineDesc+'"></td>'+
				'<td style="text-align: right;">'+conPayPlanLines[j].payPlanMoney+' '+conPayPlanLines[j].currency+'</td>'+
				'<td style="text-align: right;padding-right: 10px;">'+conPayPlanLines[j].paidAmountStr+' '+conPayPlanLines[j].currency+'</td>'+
				'<td style="text-align: right;"><input type="text" class="form-control form-money conLine" disabled name="payLineAmount" value="" '+
						'onkeyup="sumAmount();conLineShareAmount(this)" placeholder="余额：'+conPayPlanLines[j].blanceAmountStr+'&nbsp;'+conPayPlanLines[j].currency+'"></td>'+
				'<td></td>'+
			 '</tr>';
			}
					
		}
		//拼合计
		trsHtml+='<tr>'+
					'<td style="text-align: right;" colspan="3"><strong>合计：</strong></td>'+
					'<td style="text-align: right;"><strong>'+dataList.contractAmountStr+ '&nbsp;'+dataList.currency+'</strong></td>'+
					'<td style="text-align: right;padding-right: 10px;"><strong name="contractPaySumAmount">'+dataList.contractPaySumAmountStr+ '</strong><strong>&nbsp;'+dataList.currency+'</strong></td>'+
					'<td style="text-align: right;padding-right: 10px;"><strong name="contractRelationAmount">0.00</strong><strong>&nbsp;'+currency+'</strong></td>'+
				 '</tr>';
	}
	
	var appHtml='<div class="form-group checkAmount" style="background-color: #F7F9F6;position:relative">'+
					'<div class="row">'+
						'<div class="col-md-12">'+
							'<font color="#51A8DD">（框架）合同 ：</font>&nbsp;&nbsp;'+
							'<p class="form-control-static contractName" ><strong>'+dataList.contractName+'</strong></p>\n'+
							'<i class="fa  fa-times-circle items  ori-style" style="cursor: pointer;font-size:20px;" onclick="deleteContract(this)"></i>'+
							'<button type="button" onclick="selectContractPr(this);" title="若关联PR单则使用PR行的业务类型" '+
								'class="btn blue btn-sm" style="margin-left: 10px; padding: 2px;">关联PR单</button>'+
						'</div>'+
					'</div>'+
					'<div class="row">'+
						'<label class="control-label col-md-1">合同编号：</label>'+
						'<div class="col-md-3">'+
							'<input type="hidden" name="contractId" value="'+dataList.contractId+'"/>'+
							'<input type="hidden" name="relationId" value="" />'+
							'<input type="hidden" name="contractAmount" value="'+dataList.contractAmount+'" />'+
							'<input type="hidden" name="contractCurrency" value="'+dataList.currency+'" />'+
							'<input type="hidden" name="disabled" value="" />'+
							'<p class="form-control-static contractNumber"><a href="'+ctx+'/sys/openWindowPage.html?code='
								+dataList.detailUrl+'" target="_blank">'+dataList.contractNumber+'</a></p>'+
						'</div>'+
						'<label class="control-label col-md-1">法律编号：</label>'+
						'<div class="col-md-3">'+
							'<p class="form-control-static legalNumber">'+
								'<a href="'+ctx+'/sys/openWindowPage.html?code='+dataList.detailUrlByLegalNumber+'" target="_blank">'+
								dataList.legalNumber+'</a></p>'+
						'</div>'+
						'<label class="control-label col-md-1">对方主体：</label>'+
						'<div class="col-md-3">'+
							'<p class="form-control-static vendorName">'+dataList.vendorName+'</p>'+
						'</div>'+
						'<div class="col-md-12" style="height: 1px; background: #E0E0E0; margin: 15px 0px;"></div>'+
					'</div>'+
					'<table class="contractTable frameContractRelationTabel">'+
						'<thead>'+
							'<tr>'+
								'<td width="8%">付款阶段</td>'+
								'<td width="10%"><i class="marks">*</i>业务类型</td>'+
								'<td width="22%"><i class="marks">*</i>付款说明</td>'+
								'<td width="20%">计划付款金额</td>'+
								'<td width="18%">已付金额</td>'+
								'<td width="18%"><i class="marks">*</i>付款金额</td>'+
								'<td width="2%"></td>'+
							'</tr>'+
						'</thead>'+
						'<tbody>'+
							trsHtml+
						'</tbody>'+
					'</table>'+
				'</div>';
	$(".frameContractRelationInfo").append(appHtml);
}
//标准合同
function addStandardContract(dataList,currency){
	var trsHtml = "";
	var conPayPlanLines = dataList.conPayPlanList;
	if(conPayPlanLines){
		//遍历合同行
		for(var j = 0;j<conPayPlanLines.length;j++){
			trsHtml+='<tr>'+
					'<td><input type="hidden" name="payPlanId" value="'+conPayPlanLines[j].payPlanId+'">'+
						 '<input type="hidden" name="paymentLineId" value="">'+
						 '<input type="hidden" name="payRequirements" value="'+conPayPlanLines[j].payRequirements+'"> '+
						 '<input type="hidden" name="payStageStr" value="'+conPayPlanLines[j].payStageStr+'">'+
						 '<input type="hidden" name="payPlanMoney" value="'+conPayPlanLines[j].payPlanMoney+'">'+
						 '<input type="hidden" name="currency" value="'+conPayPlanLines[j].currency+'">'+
						 '<input type="hidden" name="paidAmount" value="'+conPayPlanLines[j].paidAmount+'">'+
						 '<input type="hidden" name="balanceAmount" value="'+conPayPlanLines[j].blanceAmount+'">'+
							conPayPlanLines[j].payStageStr+'</td>';
			if(conPayPlanLines[j].blanceAmount>0&&conPayPlanLines[j].currency==currency){
				trsHtml+='<td>'+conPayPlanLines[j].payRequirements+'</td>'+
				'<td><input type="text" class="form-control vEmpty showPopMsgPay" name="payLineDesc" value="'+conPayPlanLines[j].payLineDesc+'"></td>'+
				'<td style="text-align: right;">'+conPayPlanLines[j].payPlanMoneyStr+' '+conPayPlanLines[j].currency+'</td>'+
				'<td style="text-align: right;padding-right: 10px;">'+conPayPlanLines[j].paidAmountStr+' '+conPayPlanLines[j].currency+'</td>'+
				'<td style="text-align: right;">'+
						'<input type="text" class="form-control form-money conLine"'+
							'name="payLineAmount" value="" onkeyup="sumAmount();conLineShareAmount(this)" '+
							'placeholder="余额：'+conPayPlanLines[j].blanceAmountStr+'&nbsp;'+conPayPlanLines[j].currency+'">'+
				 '</td>'+
				 '<td><span class=" fa fa-check-square no-selecteds" style="font-size:18px;" onclick="autoInput(this);"></span>'+
					'<span class=" fa fa-check-square none selecteds" style="font-size:18px;color:#51A8DD;" onclick="autoInput(this);"></span></td>'+
			 '</tr>';
			}else{
				trsHtml+='<td >'+conPayPlanLines[j].payRequirements+'</td>'+
				'<td><input type="text" class="form-control vEmpty" disabled name="payLineDesc" value="'+conPayPlanLines[j].payLineDesc+'"></td>'+
				'<td style="text-align: right;">'+conPayPlanLines[j].payPlanMoney+' '+conPayPlanLines[j].currency+'</td>'+
				'<td style="text-align: right;padding-right: 10px;">'+conPayPlanLines[j].paidAmountStr+' '+conPayPlanLines[j].currency+'</td>'+
				'<td style="text-align: right;"><input type="text" class="form-control form-money conLine" disabled name="payLineAmount" value="" '+
						'onkeyup="sumAmount();conLineShareAmount(this)" placeholder="余额：'+conPayPlanLines[j].blanceAmountStr+'&nbsp;'+conPayPlanLines[j].currency+'"></td>'+
				'<td></td>'+
			 '</tr>';
			}
					
		}
		//拼合计
		trsHtml+='<tr>'+
					'<td style="text-align: right;" colspan="3"><strong>合计：</strong></td>'+
					'<td style="text-align: right;"><strong>'+dataList.contractAmountStr+ '&nbsp;'+dataList.currency+'</strong></td>';
		trsHtml+='<td style="text-align: right;padding-right: 10px;"><strong name="contractPaySumAmount">'+dataList.contractPaySumAmountStr+ '</strong><strong>&nbsp;'+dataList.currency+'</strong></td>';
		trsHtml+='<td style="text-align: right;padding-right: 10px;"><strong name="contractRelationAmount">0.00</strong><strong>&nbsp;'+currency+'</strong></td></tr>';
	}
	
	var appHtml='<div class="form-group checkAmount" style="background-color: #F7F9F6;position:relative">'+
					'<div class="row">'+
						'<div class="col-md-12">'+
							'<font color="#51A8DD">（标准）合同：</font>&nbsp;&nbsp;'+
							'<p class="form-control-static contractName" ><strong>'+dataList.contractName+'</strong></p>\n'+
							'<i class="fa  fa-times-circle items  ori-style" style="cursor: pointer;font-size:20px;" onclick="deleteContract(this)"></i>'+
						'</div>'+
					'</div>'+
					'<div class="row">'+
						'<label class="control-label col-md-1">合同编号：</label>'+
						'<div class="col-md-3">'+
							'<input type="hidden" name="contractId" value="'+dataList.contractId+'"/>'+
							'<input type="hidden" name="relationId" value="" />'+
							'<input type="hidden" name="contractAmount" value="'+dataList.contractAmount+'" />'+
							'<input type="hidden" name="contractCurrency" value="'+dataList.currency+'" />'+
							'<input type="hidden" name="disabled" value="" />'+
							'<p class="form-control-static contractNumber"><a href="'+ctx+'/sys/openWindowPage.html?code='
								+dataList.detailUrl+'" target="_blank">'+dataList.contractNumber+'</a></p>'+
						'</div>'+
						'<label class="control-label col-md-1">法律编号：</label>'+
						'<div class="col-md-3">'+
							'<p class="form-control-static legalNumber">'+
								'<a href="'+ctx+'/sys/openWindowPage.html?code='+dataList.detailUrlByLegalNumber+'" target="_blank">'+
								dataList.legalNumber+'</a></p>'+
						'</div>'+
						'<label class="control-label col-md-1">对方主体：</label>'+
						'<div class="col-md-3">'+
							'<p class="form-control-static vendorName">'+dataList.vendorName+'</p>'+
						'</div>'+
						'<div class="col-md-12" style="height: 1px; background: #E0E0E0; margin: 15px 0px;"></div>'+
					'</div>'+
					'<table class="contractTable contractRelationTabel">'+
						'<thead>'+
							'<tr>'+
								'<td width="8%">付款阶段</td>'+
								'<td width="18%">付款条件</td>'+
								'<td width="20%"><i class="marks">*</i>付款说明</td>'+
								'<td width="20%">计划付款金额</td>'+
								'<td width="18%">已付金额</td>'+
								'<td width="18%"><i class="marks">*</i>付款金额</td>'+
								'<td></td>'+
							'</tr>'+
						'</thead>'+
						'<tbody>'+
							trsHtml+
						'</tbody>'+
					'</table>';
	var prRelationList = dataList.prRelationList;
	if(prRelationList.length>0){
		var prTrHtml ="";
		$.each(prRelationList, function(k, v) {
			var payMoneyHtml = "";
			if(v.balanceAmount>0){
				payMoneyHtml = '<td><input type="text" class="form-control form-money conPrLine" onkeyup="conPrLineShareAmount(this)" name="payAmount" '+
							'placeholder="余额：'+v.balanceAmountStr+' '+ currency +'" ></td>';
			}else{
				payMoneyHtml = '<td><input type="text" class="form-control form-money conPrLine" onkeyup="conPrLineShareAmount(this)" disabled name="payAmount" '+
							'placeholder="余额：'+v.balanceAmountStr+' '+ currency +'" ></td>';
			}
			prTrHtml+='<tr>'+
						'<td>'+
							'<input type="hidden" name="relationId" value="'+v.relationId+'"> '+
							'<input type="hidden" name="payConPrRelationId" value=""> '+
							'<input type="hidden" name="purchaseHeaderId" value="'+v.purchaseHeaderId+'"> '+
							'<input type="hidden" name="purchaseLineId" value="'+v.purchaseLineId+'"> '+
							'<input type="hidden" name="purchaseNumber" value="'+v.purchaseNumber+'"> '+
							'<input type="hidden" name="lineNumber" value="'+v.lineNumber+'">'+
							'<input type="hidden" name="businessTypeName" value="'+emptyString(v.businessTypeName)+'">'+
							'<input type="hidden" name="businessTypeCode" value="'+v.businessTypeCode+'">'+
							'<input type="hidden" name="purchaseDesc" value="'+v.purchaseDesc+'">'+
							'<input type="hidden" name="usedPurchaseAmount" value="'+v.usedPurchaseAmount+'">'+
							'<input type="hidden" name="currency" value="'+v.currency+'">'+
							'<input type="hidden" name="relationPayedAmount" value="'+v.relationPayedAmount+'">'+
							'<input type="hidden" name="balanceAmount" value="'+v.balanceAmount+'">'+
							'<a href="${ctx}/sys/openWindowPage.html?code='+v.detailUrl+'" target="_blank">'+v.purchaseNumber+'</a> '+
						'</td>'+
						'<td>'+v.lineNumber+'</td>'+
						'<td style="text-align: left;">'+emptyString(v.businessTypeName)+'</td>'+
						'<td style="text-align: left;" title="'+v.purchaseDesc +'">'+v.purchaseDesc+'</td>'+
						'<td style="text-align: right;">'+v.usedPurchaseAmountString+ ' '+v.currency+'</td>'+
						'<td style="text-align: right;">'+v.relationPayedAmountStr+ ' '+v.currency+'</td>'+
						payMoneyHtml+
					'</tr>';
		});
		
		appHtml+='<div class="col-md-12" style="height: 1px; background: #E0E0E0; margin: 15px 0px;"></div>'+
				'<div class="row conPrRelationInfo">'+
					'<table class="conPRRelationTable table-fixed">'+
						'<thead>'+
							'<tr>'+
								'<td width="10%">PR单号</td>'+
								'<td width="5%">行号</td>'+
								'<td width="15%">业务类型</td>'+
								'<td width="20%">关联说明</td>'+
								'<td width="15%">合同关联金额</td>'+
								'<td width="15%">已付金额</td>'+
								'<td width="18%"><i class="marks">*</i>付款金额</td>'+
							'</tr>'+
						'</thead>'+
						'<tbody>'+
							prTrHtml+
						'</tbody>'+
					'</table>'+
				'</div><br>';
	}
	appHtml+='</div>';
	$(".contractRelationInfo").append(appHtml);
}

function addPayPurchase(prLineIds) {
	var currency = $("#currency").val();
	$.ajax({
		type : 'post',
		url : ctx+'/prApplication/queryPurchaseLines4Select.json',
		data:{
        	"prLineIds":prLineIds,
        	"currency":currency
        },
		async : false,
		success : function(data) {
			var trsHtml = "";
			var dataList = data.data;
			for(var i = 0;i<dataList.length;i++){
				trsHtml+='<tr>'+
							'<td><input type="hidden" name="payConPrRelationId" value="">'+
								'<input type="hidden" name="disabled" value="">'+
								'<input type="hidden" name="purchaseHeaderId" value="'+dataList[i].purchaseHeaderId+'">'+
								'<input type="hidden" name="purchaseLineId" value="'+dataList[i].purchaseLineId+'">'+
								'<input type="hidden" name="purchaseName" value="'+dataList[i].purchaseName+'">'+ 
								'<input type="hidden" name="purchaseNumber" value="'+dataList[i].purchaseNumber+'">'+
								'<input type="hidden" name="lineNumber" value="'+dataList[i].lineNumber+'">'+
								'<input type="hidden" name="businessTypeCode" value="'+emptyString(dataList[i].businessTypeCode)+'">'+
								'<input type="hidden" name="businessTypeName" value="'+emptyString(dataList[i].businessTypeName)+'">'+
								/*'<input type="hidden" name="purchaseDesc" value="'+dataList[i].purchaseDesc+'">'+*/
								'<input type="hidden" name="totalAmount" value="'+dataList[i].totalAmount+'">'+
								'<input type="hidden" name="currency" value="'+dataList[i].prCurrency+'">'+
								'<input type="hidden" name="balanceAmount" value="'+dataList[i].balanceAmount+'"> '+
								'<a href="${ctx}/sys/openWindowPage.html?code='+dataList[i].detailUrl+'" target="_blank">'+dataList[i].purchaseNumber+'</a>'+ 
							'</td>'+
							'<td>'+dataList[i].lineNumber+'</td>'+
							'<td>'+emptyString(dataList[i].businessTypeName)+'</td>'+
							'<td title="'+dataList[i].purchaseDesc+'">'+dataList[i].purchaseDesc+'</td>'+
							'<td><input type="text" class="form-control vEmpty showPopMsgPay" name="paymentDesc"></td>'+
							'<td style="text-align: right;padding-right: 10px;">'+dataList[i].totalAmountStr+' '+dataList[i].prCurrency+'</td>'+
							'<td style="text-align: right;padding-right: 10px;">'+dataList[i].usedAmountStr+' '+dataList[i].prCurrency+'</td>'+
							'<td style="text-align: right;">';
	
	
				if(dataList[i].balanceAmount>0&&dataList[i].prCurrency==currency){
					trsHtml+='<input type="text" class="form-control vEmpty form-money" name="payLineAmount" '+
							 	'onkeyup="sumAmount()" placeholder="余额：'+dataList[i].balanceAmountStr+' '+currency+'">'+
							 '</td>';
				}else{
					trsHtml+='<input type="text" class="form-control form-money" name="payLineAmount" disabled '+
						 		'placeholder="余额：'+dataList[i].balanceAmountStr+' '+currency+'">'+
						 	'</td>';
				}
				trsHtml+='<td>'+
							'<i class="fa  fa-times-circle items ori-style" style="cursor: pointer;font-size:20px;" onclick="deleteConPrLine(this)"></i>'+
						  '</td>'+
						'</tr>';
			}
	        var tableEle = $(".prRelationTabel");
			if(tableEle.length>0){
				tableEle.children("tbody").append(trsHtml);
				tableEle.show();
			}else{
				var payPRRelationDiv = $("<div class='form-group' style='background-color: #F7F9F6;position:relative'></div>")
				var prRelationTabel = $('<table class="contractTable prRelationTabel checkPrRepeat table-fixed">'+
											'<thead>'+
											'<tr>'+
												'<td width="9%">PR单号</td>'+
												'<td width="3%">行号</td>'+
												'<td width="12%">业务类型</td>'+
												'<td width="16%">采购描述</td>'+
												'<td width="18%"><i class="marks">*</i>付款说明</td>'+
												'<td width="12%">行金额</td>'+
												'<td width="12%">已使用金额</td>'+
												'<td width="16%"><i class="marks">*</i>付款金额</td>'+
												'<td width="2%"></td>'+
											'</tr>'+
										'</thead>'+
										'<tbody>'+
										'</tbody>'+
									'</table>');
				prRelationTabel.children("tbody").append(trsHtml);
				payPRRelationDiv.append(prRelationTabel)
				$(".prRelationInfo").append(payPRRelationDiv);
			}
			$("#purchaseQueryModel").modal('hide');
			bindPopMsgPayInfo($('.showPopMsgPay'));
			showSumAmount();	
		}
	});
}