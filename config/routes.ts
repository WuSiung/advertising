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
                path: '/',
                redirect: '/advlauncher',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/advlauncher',
                name: 'advlauncher',
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
                ]
              },
              {
                path: '/audience',
                name: 'audience',
                component: './audience-manager/manager',
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
                ]
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
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
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
