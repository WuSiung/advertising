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
                    path: '/advlauncher/media',
                    name: 'media',
                    component: './adv-launcher/media',
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
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    // component: './Welcome',
                    authority: ['admin'],
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
