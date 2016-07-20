angular.module('jinmaofu.common.wxConfig', [])


.factory('wxConfigService', ['$q', '$http',
    function($q, $http) {

        var wxConfig = {};

        function getCodeAndState() {
            var queryList = location.search.substr(1).split('&');
            var code, state;
            for (var i = 0; i < queryList.length; i++) {
                var query = queryList[i].split('=');
                var len = query.length;
                if (len == 2 && query[0] == 'code') {
                    code = query[1];
                } else if (len == 2 && query[0] == 'state') {
                    state = query[1];
                }
            }
            return {
                code: code,
                state: state
            };
        }

        function getGrantCode(appId) {
            var grantURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
            var url = encodeURIComponent(location.href);
            //var url = encodeURIComponent("http://wxdemo.maxrocky.com/");
            grantURL = grantURL.replace('{0}', appId).replace('{1}', url);
            alert(grantURL);
              location.href = grantURL;
        }

        wxConfig.wxInit = function(apis) {
            var localUrl = encodeURIComponent(firstInUrl);
            var getUrl = 'http://chinalife-p.maxrocky.com/api/getsdk?localurl=' + localUrl
           //var getUrl = 'http://ssyhwx.maxrocky.com:8080/public/wechatInfo?localurl=' + localUrl;
            $http.get(getUrl).then(function(res) {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名，见附录1
                    jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                    //  wx.ready(function() {
                    // var mmm = getCodeAndState().code;
                    // if (!mmm) {
                    //     getGrantCode(res.data.appId)
                    // };
                
            }, function(msg) {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: msg.data.appId, // 必填，公众号的唯一标识
                    timestamp: msg.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: msg.data.nonceStr, // 必填，生成签名的随机串
                    signature: msg.data.signature, // 必填，签名，见附录1
                    jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                // wx.ready(function() {
                //     var mmm = getCodeAndState().code;
                //     if (!mmm) {
                //         getGrantCode(msg.data.appId)
                //     };
                // })

            })
        };

        return wxConfig;
    }
])
