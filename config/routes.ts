export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './User/register',
          },
          {
            path: '/user/terms',
            name: 'terms',
            component: './other/terms',
          },
          {
            path: '/user/PrivacyPolicy',
            name: 'PrivacyPolicy',
            component: './other/PrivacyPolicy',
          },
          {
            path: '/user/cookie',
            name: 'cookie',
            component: './other/cookie',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/', // 根路由默认重定向
                redirect: '/dashboard',
              },
              {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'AreaChartOutlined',
                component: './dashboard',
              },
              {
                path: '/automation',
                name: 'automation',
                icon: 'AndroidOutlined',
                component: './automation',
                routes: [
                  {
                    path: '/automation',
                    redirect: '/automation/summary',
                  },
                  {
                    path: '/automation/summary',
                    name: 'summary',
                    component: './automation/summary',
                  },
                  {
                    path: '/automation/wizard',
                    name: 'wizard',
                    component: './automation/wizard'
                  }
                ],
              },
              {
                path: '/advlauncher',
                name: 'advlauncher',
                icon: 'RocketOutlined',
                component: './adv-launcher',
                routes: [
                  {
                    path: '/advlauncher',
                    redirect: '/advlauncher/workbench',
                  },
                  {
                    path: '/advlauncher/workbench',
                    name: 'workbench',
                    component: './adv-launcher/workbench',
                  },
                  {
                    path: '/advlauncher/advertising',
                    name: 'advertising',
                    component: './adv-launcher/advertising',
                  },
                  {
                    path: '/advlauncher/compaign',
                    name: 'compaign',
                    hideInMenu: true,
                    component: './adv-launcher/compaign',
                  },
                  {
                    path: '/advlauncher/crowds',
                    name: 'crowds',
                    hideInMenu: true,
                    component: './adv-launcher/crowds',
                  },
                  {
                    path: '/advlauncher/facebook',
                    name: 'facebook',
                    hideInMenu: true,
                    component: './adv-launcher/facebook',
                  },
                  {
                    path: '/advlauncher/launcher',
                    name: 'launcher',
                    hideInMenu: true,
                    component: './adv-launcher/launcher',
                  },
                ],
              },
              {
                path: '/advmanager',
                name: 'advmanager',
                icon: 'TableOutlined',
                component: './adv-manager',
              },
              {
                path: '/audience',
                name: 'audience',
                icon: 'TeamOutlined',
                component: './audience-manager',
                routes: [
                  {
                    path: '/audience',
                    redirect: '/audience/manager',
                  },
                  {
                    path: '/audience/crowds',
                    name: 'crowds',
                    component: './audience-manager/crowds',
                  },
                  {
                    path: '/audience/manager',
                    name: 'manager',
                    component: './audience-manager/manager',
                  },
                ],
              },
              {
                path: '/creativity',
                name: 'creativity',
                icon: 'CoffeeOutlined',
                component: './creativity',
              },
              {
                path: '/setting',
                name: 'setting',
                icon: 'SettingOutlined',
                component: './setting',
              },
              {
                path: '/version',
                name: 'version',
                hideInMenu: true,
                component: './version',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
