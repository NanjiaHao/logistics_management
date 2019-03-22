/**
 * sohu erp JS
 **/
var sohuPltJsHB = (function () {
    var startTime = null, endTime = null, flag = true;
    return {
        init: function (url, postMethod, time) {
            if (!url) {
                return;
            }
            if (!/^(http|http(s))/i.test(url)) {
                return;
            }

            time = time || 60000;
            postMethod = postMethod || 'get';
            var _this = this;

             $(document).bind('keydown mousemove',function(){
                 if (flag) {
                     startTime = new Date().getTime();
                     flag = false;
                 }

                 endTime = new Date().getTime();
                 if (endTime - startTime > time) {
                     startTime = null;
                     endTime = null;
                     _this.load(url, postMethod, time);
                     flag = true;
                 }
             })
        },
        load: function (url, postMethod, time) {
            var ajx = $.ajax({
                url: url,
                timeout: 3000,
                type: postMethod,
                error: function (textStatus) {
                    console.error('sohuPltJsHB.init function ---- request url: '
                        + url + ', request result: ' + textStatus);
                },
                complete: function (XMLHttpRequest, status) {
                    console.log('status ' + status);
                    if (status == 'timeout') {
                        ajx.abort();    //timeout
                    }
                }
            });
        }
    }
})();



