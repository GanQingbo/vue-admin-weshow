import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // 演出模块路由
  {
    path: '/show',
    component: Layout,
    redirect: '/show/table',
    name: 'Show',
    meta: {title: '演出管理', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/show/list'),
        meta: {title: '演出列表', icon: 'table'}
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/show/add'),
        meta: {title: '添加演出', icon: 'tree'}
      },
      {
        path: 'edit/:id', // :id是占位符
        name: 'Edit',
        component: () => import('@/views/show/add'), // 同一个页面
        meta: {title: '演出信息编辑', noCache: true},
        hidden: true // 隐藏路由
      }
    ]
  },

  // 售票模块路由
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket/table',
    name: 'Ticket',
    meta: {title: '售票管理', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/ticket/ticketList'),
        meta: {title: '售票列表', icon: 'table'}
      },
      {
        path: 'addList',
        name: 'AddList',
        component: () => import('@/views/ticket/ticketAdd'),
        meta: {title: '添加售票', icon: 'tree'}
      },
      {
        path: 'add/:id', // :id是占位符
        name: 'Add',
        component: () => import('@/views/ticket/add'),
        meta: {title: '添加售票', noCache: true},
        hidden: true // 隐藏路由
      },
      {
        path: 'edit/:id', // :id是占位符
        name: 'Edit',
        component: () => import('@/views/ticket/ticketEdit'), // 同一个页面
        meta: {title: '售票信息编辑', noCache: true},
        hidden: true // 隐藏路由
      }
    ]
  },

  // 用户管理模块路由
  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    name: 'User',
    meta: {title: '用户管理', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/user/list'),
        meta: {title: '用户管理', icon: 'example'}
      },
      {
        path: 'edit/:id', // :id是占位符
        name: 'Edit',
        component: () => import('@/views/user/edit'), // 同一个页面
        meta: {title: '用户信息编辑', noCache: true},
        hidden: true // 隐藏路由
      }
    ]
  },

  // 订单管理模块路由
  {
    path: '/order',
    component: Layout,
    redirect: '/order/table',
    name: 'Order',
    meta: {title: '订单管理', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/order/list'),
        meta: {title: '订单列表', icon: 'table'}
      },
      {
        path: 'handle',
        name: 'Handle',
        component: () => import('@/views/order/handle'),
        meta: {title: '退款处理', icon: 'tree'}
      },
      {
        path: 'edit/:id', // :id是占位符
        name: 'Edit',
        component: () => import('@/views/order/edit'),
        meta: {title: '订单信息编辑', noCache: true},
        hidden: true // 隐藏路由
      }
    ]
  },

  // 管理员模块路由
 /* {
    path: '/manage',
    component: Layout,
    redirect: '/manage/table',
    name: 'Manage',
    meta: {title: '人员管理', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/show/list'),
        meta: {title: '演出列表', icon: 'table'}
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/show/add'),
        meta: {title: '添加演出', icon: 'tree'}
      },
      {
        path: 'edit/:id', // :id是占位符
        name: 'Edit',
        component: () => import('@/views/show/add'), // 同一个页面
        meta: {title: '演出信息编辑', noCache: true},
        hidden: true // 隐藏路由
      }
    ]
  },*/

  // 首页数据管理模块路由
  {
    path: '/recommend',
    component: Layout,
    redirect: '/recommend/table',
    name: 'Recommend',
    meta: {title: '首页管理', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/recommend/list'),
        meta: {title: '推荐演出', icon: 'table'}
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/recommend/addList'),
        meta: {title: '新增推荐', icon: 'tree'}
      },
      {
        path: 'details/:id', // :id是占位符
        name: 'Details',
        component: () => import('@/views/recommend/showDetails'),
        meta: {title: '演出信息详情', noCache: true},
        hidden: true // 隐藏路由
      }
    ]
  },

  // 数据统计模块路由
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/table',
    name: 'Statistics',
    meta: {title: '数据统计', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/statistics/showList'),
        meta: {title: '演出数据', icon: 'table'}
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/statistics/userList'),
        meta: {title: '用户数据', icon: 'tree'}
      },
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
