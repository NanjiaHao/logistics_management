/**
 * 表单验证
 *
 * @param _cache
 *            是否缓存(true:是;false:否;默认false)
 * @param _element
 *            验证根元素以下的(默认为form)
 * @returns
 */
FormValidate = function (_cache, _element, _showError) {
  var sleep = 400;
  var tooltips_html = '<div class="tooltips {0}"><i><span>{1}</span></i></div>';
  var cache = _cache;
  var element = _element ? _element : "form";
  var showErrorTips = !_showError;
  var elementMap = new Map();
  var resultMap = new Map();
  /** 鼠标划过移除提示 */
  $(element).on("mouseleave", ".tooltips", function () {
    $(this).animate({
      opacity: '0.1'
    }, sleep, function () {
      $(this).remove();
    });
  });
  /** 绑定验证({empty:必填验证提示,reg:正则表达式,regmsg:正则表达式提示,fnc:自定义函数验证,callback:回调函数,checkbox:必选验证提示,radio:必选验证提示}) */
  this.bind = function (setting) {
    elementMap.put(setting.selector, setting);
    this.hoverValidate(setting);
    return this;
  };
  /** 解绑验证 */
  this.unbind = function (selector) {
    elementMap.remove(selector);
    resultMap.remove(selector);
    $(element).off("mouseenter", selector).off("mouseleave", selector);
    $(element).off("change", selector).off("blur", selector);
    return this;
  };
  /** 鼠标操作验证事件 */
  this.hoverValidate = function (setting) {
    $(element).on("mouseenter", setting.selector, function (i, b) {
      validateElement($(this), setting, false);
    }).on("mouseleave", setting.selector, function () {
      removeTooltips($(this));
    }).on("change", setting.selector, function () {
      validateElement($(this), setting, true);
    }).on("blur", setting.selector, function () {
      validateElement($(this), setting, true);
    }).on("click", setting.selector, function () {
      var index = getIndex(setting.selector, $(this));
      removeCache(setting.selector, index);
    });
  };
  /** 验证表单数据 */
  this.validate = function () {
    var validateFlag = true;
    $(elementMap.keySet()).each(function (i, selector) {
      $(element).find(selector).each(function (index) {
        var result = validateSingle($(this), selector, index);
        if (!result) {
          validateFlag = false;
        }
      });
    });
    if (!validateFlag) {
      goFirstError();
    }
    return validateFlag;
  };
  /** 清除缓存 */
  this.clearCache = function (selector, index) {
    if (selector) {
      removeCache(selector, index);
    } else {
      resultMap = new Map();
    }
  };
  /** 验证单个元素 */
  function validateSingle(obj, selector, index) {
    if (obj.prop('disabled') || (!obj.is(':visible'))) {
      // 已经设置为不可用的元素不参与验证
      return true;
    }
    var result = getCache(selector, index);
    if (result) {
      if ("Y" != result) {
        if (_showError) {
          showTooltips(obj, "error-tips", result);
        } else {
          hasError(obj);
        }
        return false;
      }
    } else if (!validateElement(obj, elementMap.get(selector), true,
            !_showError)) {
      return false;
    }
    return true;
  }

  /** 验证元素 */
  function validateElement(obj, setting, flag, error) {
    var _msg = setting.empty;
    var _val = obj.val();
    // 非空验证
    if (_msg && !$.trim(_val)) {
      // do nothing
    } else if (setting.checkbox && obj.find("input[type=checkbox]:checked").length == 0) {
      //验证复选框
      _msg = setting.checkbox;
    } else if (setting.radio && obj.find("input[type=radio]:checked").length == 0) {
      //验证单选框
      _msg = setting.radio;
    } else {
      _msg = false;
      // 正则表达式
      var _reg = eval(setting.reg);
      if (_reg && !_reg.test(_val)) {
        _flag = false;
        _msg = setting.regmsg;
      } else {
        // 调用自定义函数
        var _fun = setting.fun;
        if (_fun) {
          var result;
          if (_fun instanceof String) {
            var _funs = _fun.split(",");
            for (var k = 0; k < _funs.length; k++) {
              var fun = eval(_funs[k]);
              result = fun(obj);
              if (!result.status) {
                _msg = result.msg;
                break;
              }
            }
          } else if (_fun instanceof Function) {
            result = _fun(obj);
            if (!result.status) {
              _msg = result.msg;
            }
          } else if (_fun instanceof Array) {
            for (var i = 0; i < _fun.length; i++) {
              result = _fun[i](obj);
              if (!result.status) {
                _msg = result.msg;
                break;
              }
            }
          }
        }
      }
    }
    // 执行回调函数
    var _callback = setting.callback;
    if (_callback) {
      _callback = eval(_callback);
      _callback(obj, _msg);
    }
    var index = getIndex(setting.selector, obj);
    if (_msg) {
      if (flag || obj.hasClass("has-error")) {
        if (error) {
          hasError(obj);
        } else {
          showTooltips(obj, "error-tips", _msg);
        }
      } else {
        showTooltips(obj, "warn-tips", _msg);
      }
      addCache(setting.selector, index, _msg);
      return false;
    } else {
      removeTooltips(obj, true);
      addCache(setting.selector, index, "Y");
      return true;
    }
  }

  /** 获取元素索引 */
  function getIndex(selector, obj) {
    return $(element).find(selector).index(obj)
  }

  /** 获取缓存key */
  function getCahceKey(selector, index) {
    return selector + "_" + index;
  }

  /** 添加缓存 */
  function addCache(selector, index, msg) {
    if (cache) {
      resultMap.put(getCahceKey(selector, index), msg);
    }
  }

  /** 获取缓存 */
  function getCache(selector, index) {
    if (cache) {
      return resultMap.get(getCahceKey(selector, index));
    }
    return false;
  }

  /** 移除缓存 */
  function removeCache(selector, index) {
    if (cache) {
      resultMap.remove(getCahceKey(selector, index));
    }
  }

  /** 移除错误标识 */
  function removeError(obj) {
    obj.removeClass("has-error");
  }

  /** 存在异常 */
  function hasError(obj) {
    obj.addClass("has-error");
  }

  /** 移除提示 */
  function removeTooltips(obj, flag) {
    var _up = obj.prev('.tooltips');
    if (_up && _up.hasClass("tooltips")) {
      _up.animate({
        opacity: '0.1'
      }, sleep, function () {
        $(this).remove();
      });
    }
    if (flag) {
      removeError(obj);
    }
  }

  /** 显示提示 */
  function showTooltips(obj, cls, msg) {
    if (!obj.prop('disabled')) {
      removeTooltips(obj);
      obj.before(tooltips_html.format(cls, msg));
      obj.prev().css("top", obj.position().top);
      obj.prev().css("left", obj.position().left);
      if (cls == "error-tips") {
        hasError(obj);
      }
    }
  }

  /** 第一个错误 */
  function goFirstError() {
    $(element).find(".has-error:eq(0)").focus();
  }
};
FormValidate.MSG_NOT_NULL = '不能为空';
FormValidate.REG_RULE_AMOUNT = '/^([-]{0,1})(([1-9]{1}[0-9]{0,8})|([0]{1}))([.]{1}[0-9]{1,2})?$/';
FormValidate.REG_MSG_AMOUNT = '请使用最多两位小数的数字';
FormValidate.REG_RULE_P_AMOUNT = '/^(([1-9]{1}[0-9]{0,8})|([0]{1}))([.]{1}[0-9]{1,2})?$/';
FormValidate.REG_MSG_P_AMOUNT = '请使用最多两位小数的非负数字';
FormValidate.REG_RULE_INT = '/^-?\\d+$/';
FormValidate.REG_MSG_INT = '请使用整数';
FormValidate.REG_RULE_P_INT = '/^(([1-9]{1}[0-9]{0,8})|([0]{1}))$/';
FormValidate.REG_MSG_P_INT = '请使用非负整数';
FormValidate.REG_RULE_P_AMOUNT_LENGTH = '/^(([1-9]{1}[0-9]{0,100})|([0]{1}))([.]{1}[0-9]{1,2})?$/';