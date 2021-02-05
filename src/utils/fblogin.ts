import { notification } from 'antd';
async function loadFbSDK(d: Document, s: string, id: string) {
    var js: any = {};
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    let fjs: Element | null = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode?.insertBefore(js, fjs);
}
async function initFacebook() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: '1671575193015707',
            version: 'v9.0',
            status: true,
            cookie: true,
            xfbml: true,
            autoLogAppEvents: true
        });
    };
}

async function loadAndInitFB() {
    await loadFbSDK(document, "script", "facebook-jssdk");
    await initFacebook();
}

async function logInWithFacebook() {
    return new Promise((resolve: (value: fb.StatusResponse)=> void, reject) => {
        try {
            FB.login((res: fb.StatusResponse) => {
                if (res.authResponse) {
                    resolve(res)
                } else {
                    reject("")
                }
            }, {
                scope: 'ads_management,publish_video,pages_manage_posts,pages_read_engagement,business_management,ads_read,publish_to_groups',
            })
            
        } catch (err) {
            notification.error({
                message: `Facebook插件加载失败`,
                description: '请检查是否开启了vpn',
            });
        }
    })
}

export default logInWithFacebook
export { loadAndInitFB }