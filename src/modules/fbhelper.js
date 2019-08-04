/* global window, document */

export default class FbHelper {
    constructor() {
        if (FbHelper.instance) {
            return FbHelper.instance;
        }

        FbHelper.promise = new Promise(function(resolve) {
            FbHelper.resolve = resolve;
        });

        function initFbSdk() {
            window.fbAsyncInit = function() {
                window.FB.init({
                    appId: '643978476120087',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v3.3'
                });
                FbHelper.resolve();
            };

            /* eslint-disable */
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            /* eslint-enable */
        }

        initFbSdk();
        FbHelper.instance = this;
    }

    fbLogin() {
        return new Promise(resolve => {
            FbHelper.promise.then(() => {
                window.FB.login(response => resolve(response))
            })
        })
    }

    fbLogout() {
        return new Promise(resolve => {
            FbHelper.promise.then(() => {
                window.FB.logout(response => resolve(response))
            })
        })
    }

    getFbLoginStatus() {
        return new Promise(resolve => {
            FbHelper.promise.then(() => {
                window.FB.getLoginStatus(response => resolve(response))
            })
        })
    }

    fbApi() {
        return new Promise(resolve => {
            FbHelper.promise.then(() => {
                window.FB.api('/me', response => resolve(response))
            })
        })
    }
}