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
async function initFacebook(id: string) {
    window.fbAsyncInit = function () {
        FB.init({
            appId: id,
            version: 'v9.0',
            status: true,
            cookie: true,
            xfbml: true,
            autoLogAppEvents: true
        });
    };
}

async function loadAndInitFB(id: string) {
    await loadFbSDK(document, "script", "facebook-jssdk");
    await initFacebook(id);
}

async function logInWithFacebook() {
    return new Promise((resolve: (value: fb.StatusResponse) => void, reject) => {
        try {
            FB.login((res: fb.StatusResponse) => {
                if (res.authResponse) {
                    resolve(res)
                } else {
                    reject("")
                }
            }, {
                scope: 'ads_management,publish_video,pages_manage_posts,pages_read_engagement,business_management,ads_read,publish_to_groups,pages_manage_engagement,read_insights,instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,attribution_read,email,leads_retrieval,pages_manage_ads,pages_manage_metadata,pages_read_user_content,pages_show_list,public_profile',
            })

        } catch (err) {
            notification.error({
                message: `Facebook插件加载失败`,
                description: '请检查是否开启了vpn',
            });
        }
    })
}

async function getFbAccounts() {
    FB.api(
        '/me/adaccounts',
        'GET',
        {},
        function (response) {
            console.log(response)
            // Insert your code here
        }
    )
}

export default logInWithFacebook
export { loadAndInitFB, getFbAccounts }