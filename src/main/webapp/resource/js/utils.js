// 加密函数

var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
		+ "wxyz0123456789+/" + "=";

function encode64(input) {
	input = escape(input);// 注意escape（）函数
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
				+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);

	return output;
}

/*数字转成金额格式（增加千分位）并保留两位小数*/
function NumberToMoney(currentval) {
	if(currentval == null) {
		return "";
	}
	if(currentval == 0) {
		return 0;
	}
	if (currentval == "")
		return '';
	currentval = currentval.toString();
	var val = currentval.replace(/,/g, '');

	if (IsFloat(val) == false) {
		return 'error';
	}

	var tmp = parseFloat(val);

	val = tmp;
	val = val.toFixed(2);
	var str = val.toString();

	var re = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
	var str = str.replace(re, "$1,");
	var idx = str.indexOf('.');
	return str;
}

/*金额转成数字（取消千分位）*/
function MoneyToNumber(val) {
	var str = val.toString();
	var str = str.replace(/,/g, '');
	if (IsFloat(str) == true) {
		return parseFloat(str);
	} else{
		return 'error';
	}
}

/*是否小数*/
function IsFloat(floatval) {
	if (parseFloat(floatval) == floatval)
		return true;
	else
		return false;
}

/*去掉两边的空*/
function Trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "")
}

////改变图片-->
function MM_swapImgRestore() { // v3.0
	var i, x, a = document.MM_sr;
	for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
		x.src = x.oSrc;
}
function MM_preloadImages() { // v3.0
	var d = document;
	if (d.images) {
		if (!d.MM_p)
			d.MM_p = new Array();
		var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
		for (i = 0; i < a.length; i++)
			if (a[i].indexOf("#") != 0) {
				d.MM_p[j] = new Image;
				d.MM_p[j++].src = a[i];
			}
	}
}

function MM_findObj(n, d) { // v4.01
	var p, i, x;
	if (!d)
		d = document;
	if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p + 1)].document;
		n = n.substring(0, p);
	}
	if (!(x = d[n]) && d.all)
		x = d.all[n];
	for (i = 0; !x && i < d.forms.length; i++)
		x = d.forms[i][n];
	for (i = 0; !x && d.layers && i < d.layers.length; i++)
		x = MM_findObj(n, d.layers[i].document);
	if (!x && d.getElementById)
		x = d.getElementById(n);
	return x;
}

function MM_swapImage() { // v3.0
	var i, j = 0, x, a = MM_swapImage.arguments;
	document.MM_sr = new Array;
	for (i = 0; i < (a.length - 2); i += 3)
		if ((x = MM_findObj(a[i])) != null) {
			document.MM_sr[j++] = x;
			if (!x.oSrc)
				x.oSrc = x.src;
			x.src = a[i + 2];
		}
}
/**
 * 改变导航的选中
 * @param url  上面导航栏的链接地址
 * @param leftT 左侧导航栏文本
 * @param topT  上层导航栏文本
 * @returns
 */
function changeTitle(url,leftT,topT){
	var ulEle = window.parent.document.getElementById("pageHeaderNav");
	$(ulEle).find("a.active").attr("href",url);
	$(ulEle).find("a.active").text(topT);
	var menu = window.parent.document.getElementById("ulMenu");
	$(menu).find("li.open").find("ul").find("li").each(function(){
		if($(this).attr("class")=="active"){
			$(this).removeClass("active");
		}
		if(Trim($(this).find("a").text())==leftT){
			$(this).addClass("active");
			return ;
		}
	});
}