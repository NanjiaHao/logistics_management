//转换数据格式函数
function convertDataType (strings){
	if(strings.length>0){
		return JSON.parse(strings)
	}else{
		return ""
	}
}

/**合同请求数据模板*/
CONTRACT_POST_DATA = {
  "autoSubmit": false,
  "contractInfo.isSupplement": false,
  "contractInfo.isFrame": false,
  "contractInfo.isStandard": false,
  "contractInfo.contractCurrency": "RMB",
  "contractInfo.expectMount": 0,
  "contractInfo.amount": 0
};
DATATABLE_LANGUAGE = {
  "sProcessing": "",
  "sLengthMenu": "显示 _MENU_ 项结果",
  "sZeroRecords": "没有匹配结果",
  "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
  "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
  "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
  "sInfoPostFix": "",
  "sSearch": "搜索:",
  "sUrl": "",
  "sEmptyTable": "表中数据为空",
  "sLoadingRecords": "载入中...",
  "sInfoThousands": ",",
  "oPaginate": {
    "sFirst": "首页",
    "sPrevious": "上页",
    "sNext": "下页",
    "sLast": "末页"
  },
  "oAria": {
    "sSortAscending": ": 以升序排列此列",
    "sSortDescending": ": 以降序排列此列"
  }
};
/**下拉选项统一模板*/
OPTION_TEMPLATE = "<option value='{0}'>{1}</option>";

/**
 * 字符串替换所有的公共方法
 */
String.prototype.replaceAll = function (target, replacement) {
  return this.replace(new RegExp(target, "gm"), replacement);
}
/**
 * 字符串 tirm 的公共方法 trim() method for String
 *
 * @returns
 */
String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * String参数格式化
 */
String.prototype.format = function () {
  var str = this;
  if (arguments.length > 0) {
    for (str, i = 0; i < arguments.length; i++) {
      str = str.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    }
  }
  return str;
};
/**
 * 字符串非空校验
 */
function isNotEmpty(target) {
  return target != null && target != "";
}
/**
 * 字符串非空及非定义校验
 */
function isNotBlank(target) {
  return target != undefined && target != null && target != ""
      && target.trim() != "";
}
/**
 * 校验数字是否是 非零/正整数/正浮点数
 */
function isFormatData(target) {
  // 校验格式
  var reg = /^\d*[1-9]\d*|\d*[1-9]\d*\.\d+|\d+\.\d*[1-9]\d*$/;
  return reg.test(target);
}
/**
 * 正整数
 */
function isPInt(str) {// 判断正整数
  var g = /^[1-9]*[1-9][0-9]*$/;
  return g.test(str);
}
function MM_swapImgRestore() { //v3.0
	  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}

function MM_swapImage() { //v3.0
	  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	}
/** 跳转 */
function jump(url) {
  location.href = url;
  return false;
}
/** 跳转到新页签 */
function jumpNewTap(url) {
  window.open(url);
  return false;
}
/** 转JSON */
function evalJSON(data) {
  if (data) {
    if (typeof data == 'object') {
      return data;
    } else if (typeof (data) == 'string') {
      return eval('(' + data + ')');
    }
  }
  return null;
};
/** 绑定跳转事件 */
function bindJump(target, url) {
  $(target).click(function () {
    jump(url);
  });
}
/** 绑定表单提交事件 */
function bindSubmitFormEvent(selector, url, validate) {
  $(selector).click(function () {
    var result = validate ? validate() : true;
    if (result) {
      var _from = $(this).parents("form");
      _from.attr("action", url);
      _from.submit();
    }
  });
}
/** Map */
function Map() {
  var struct = function (key, value) {
    this.key = key;
    this.value = value;
  };
  var put = function (key, value) {
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i].key === key) {
        this.arr[i].value = value;
        return;
      }
    }
    this.arr[this.arr.length] = new struct(key, value);
  };
  var get = function (key) {
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i].key === key) {
        return this.arr[i].value;
      }
    }
    return null;
  };
  var remove = function (key) {
    var v;
    for (var i = 0; i < this.arr.length; i++) {
      v = this.arr.pop();
      if (v.key === key) {
        continue;
      }
      this.arr.unshift(v);
    }
  };
  var size = function () {
    return this.arr.length;
  };

  var isEmpty = function () {
    return this.arr.length <= 0;
  };
  var keySet = function () {
    var keys = new Array();
    for (var i = 0; i < this.arr.length; i++) {
      keys[i] = this.arr[i].key;
    }
    return keys;
  };
  this.arr = new Array();
  this.get = get;
  this.put = put;
  this.remove = remove;
  this.size = size;
  this.isEmpty = isEmpty;
  this.keySet = keySet;
}
/** 加载完执行 */
$(function () {
  $(".upload-group").on("change", ".form-control", function (data) {
    var _fileName = $(this).val();
    _fileName = _fileName.substring(_fileName.lastIndexOf("\\") + 1);
    $(this).next().find("span").html(_fileName);
  });
  $("button[type=reset]").on("click", function () {
    $(".upload-group>.form-btn>span").html("未选择任何文件");
    $(".fileUpload").blur();
  });
  $(".color-panel").on("click", "span", function () {
    $(this).parents(".color-panel").find(".active").removeClass("active");
    $(this).addClass("active");
  });
});
/** 获取一个带前缀的ID */
function getElementId(prefix) {
  return prefix + Date.parse(new Date());
}
/** 显示遮罩层 */
function showMask() {
  var id = getElementId('Mask');
  var html = '<div class="modal fade mask" aria-hidden="true" data-backdrop="static" id="'
      + id
      + '" ><img style="z-index:9999;padding-left: 50%;margin-left: -50px;" src="/assets/admin/layout/img/load.gif"></div>';
  $("body").append(html);
  $('#' + id).modal('show');
  $('#' + id).on('hidden.bs.modal', function (e) {
    $('#' + id).modal('show');
  });
  return id;
}
/** 移除遮罩层 */
function removeMask(id) {
  $('#' + id).remove();
}
/** 显示消息框 */
function showMessage(context, showButton) {
  var id = getElementId('Modal');
  
  var html = '<div class="modal fade" id="' + id;
  html += '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">';
  html += '<div class="modal-dialog"  >';
  html += '<div class="modal-content" id="showMessages-content">';
  html += '<div class="modal-header">';
  html += '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
  html += '<h4 class="modal-title" id="myModalLabel">温馨提示</h4>';
  html += '</div>';
  html += '<div class="modal-body">';
  html += context;
  html += '</div>';
  html += '<div class="modal-footer">';
  if (showButton) {
    html += '<button type="button" class="btn blue confirm" data-dismiss="modal">确认</button>';
    html += '<button type="button" class="btn red call" data-dismiss="modal">取消</button>';
  } else {
    html += '<button type="button" class="btn blue confirmOnly" data-dismiss="modal">确认</button>';
  }
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  
  $("body").append(html);
  var maskHeight = ($('.modal').height()-170)/2;
  $('#showMessages-content').css('margin-top',maskHeight)
  
  $('#' + id).modal('show');
  $('#'+id).on('show.bs.model',function(e){
	  console.log('dianji l菲菲姐群殴父')
  })
  
  
  
  
  $('#' + id).on('hidden.bs.modal', function (e) {
    $('#' + id).remove();
    if(id=="ermDramaKisQueryModel"){
        var strAttr = $('#ermDramaKisQueryModel').attr('style');
        if(strAttr.indexOf('none')>0){//只有这一个弹框
        	$('html').css('overflow','auto');
        	console.log('autotototototo');
        }else{
        	$('html').css('overflow','hidden');
        	$('body').css('overflow','hidden');
        	console.log('fjoieqifhreoloiewjroijwqoe')
        }
    }
    

  });
  return id;
}

function changeLineIndex(line, index, remoreValue) {
  console.log(index);
  $(line).find(".subjectSpan").html("");
  $(line).find("input").each(function () {
    var name = $(this).attr("name");
    if (name) {
      name = name.replace(/\[\d*\]/, "[" + index + "]");
      $(this).attr("name", name);
    }
    var id = $(this).attr("id");
    if (id) {
      id = id.replace(/\[\d*\]/, "[" + index + "]");
      $(this).attr("id", id);
    }
    if (remoreValue) {
      if ($(this).attr("type") == "checkbox") {
        $(this).removeAttr("checked");
      } else {
        if (!$(this).hasClass("greyZi")) {
          $(this).val("");
        }
      }
    }

  });
  $(line).find("select").each(function () {
    var name = $(this).attr("name");
    if (name) {
      name = name.replace(/\[\d*\]/, "[" + index + "]");
      $(this).attr("name", name);
    }
    var id = $(this).attr("id");
    if (id) {
      id = id.replace(/\[\d*\]/, "[" + index + "]");
      $(this).attr("id", id);
    }
    if (remoreValue) {
      if (!$(this).hasClass("greyZi")) {
        $(this).val("");
      }
    }
  });
}
/**关闭页面*/
function closePage() {
  window.opener = null;
  window.open('', '_self');
  window.close();
}
/**转空字符串*/
function emptyString(_str) {
  return _str && _str != "undefined" ? _str : "";
}

/**返回上一页*/
function actBack() {
  window.history.back();
}

/*
 *   功能:实现根据现有日期加减时间的功能.
 *   参数:interval,字符串表达式，表示要添加的时间间隔的类型.
 *   参数:number,数值表达式，表示要添加的时间间隔的数量
 *   参数:date,时间对象或yyyy-MM-dd格式的字符串.
 *   返回:新的时间对象.
 *
 *   示例：
 *   var now = new Date();
 *   // 加五天.
 *   var newDate = DateAdd("d ", 5, now);
 *   alert(newDate.toLocaleDateString())
 *   // 加两个月.
 *   newDate = DateAdd("m ", 2, now);
 *   alert(newDate.toLocaleDateString())
 *   // 加一年
 *   newDate = DateAdd("y ", 1, now);
 *   alert(newDate.toLocaleDateString())
 *---------------   DateAdd(interval,number,date)   -----------------
 */
function dateAdd(interval, number, date) {
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, "/"));
  }
  switch (interval) {
    case "year": {
      date.setFullYear(date.getFullYear() + number);
      break;
    }
    case "quar": {
      date.setMonth(date.getMonth() + number * 3);
      break;
    }
    case "month": {
      date.setMonth(date.getMonth() + number);
      break;
    }
    case "week": {
      date.setDate(date.getDate() + number * 7);
      break;
    }
    case "day": {
      date.setDate(date.getDate() + number);
      break;
    }
    case "hour": {
      date.setHours(date.getHours() + number);
      break;
    }
    case "minute": {
      date.setMinutes(date.getMinutes() + number);
      break;
    }
    case "second": {
      date.setSeconds(date.getSeconds() + number);
      break;
    }
    default: {
      date.setDate(d.getDate() + number);
      break;
    }
  }
  return date;
}

/* 调用方法绑定pop提示框 */
function bindPopMsg($this) {
  $this.focus(function () {
    var obj = $(this), trList = obj.parents('tbody').find('tr'), trIndexTotal = trList.length - 2;
    var inputVal = obj.val();
    obj.before('<div class="msg-tips">{0}</div>'.format(obj.hasClass('money') ? $.formatMoney(inputVal) : inputVal));
    var index = trList.index(obj.parents('tr'));
    var posOffset = obj.attr('posOffset');
    if (posOffset) {
      obj.prev().css("bottom", 37 + parseInt(posOffset));
    } else {
      obj.prev().css("bottom", $(trList.eq(trIndexTotal - index)).position().top + 59);
    }
    obj.prev().css("left", obj.position().left);
  }).blur(function () {
    $(this).parent().find('.msg-tips').remove();
    $(this).mouseleave();
  }).keyup(function () {
    var inputVal = this.value;
    $(this).parent().find('.msg-tips').text($(this).hasClass('money') ? $.formatMoney(inputVal) : inputVal);
  });
}
function handlerResult(result, fn) {
	// 成功执行操作，失败提示原因
	if (result.code == 0) {
		fn(result.data);
	}
	// 没有登陆异常，重定向到登陆页面
	else if (result.code == -1) {
		bootbox.alert("没有登录");
	}
	// 参数校验出错，直接提示
	else if (result.code == 1) {
		bootbox.alert(result.msg);
	}
	// 没有权限，显示申请权限电子流
	else if (result.code == 2) {
		bootbox.alert("没有权限");	
	} else {
		// 不应该出现的异常，应该重点关注
		bootbox.alert(result.msg);
	}
}
