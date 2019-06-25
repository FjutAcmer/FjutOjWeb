import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/views/Home')
    }, {
      path: '/Login',
      name: 'Login',
      component: () => import('@/components/views/Login')
    }, {
      path: '/Register',
      name: 'Register',
      component: () => import('@/components/views/Register')
    }, {
      path: '/Problem',
      name: 'Problem',
      component: () => import('@/components/views/Problem')
    }, {
      path: '/Submit',
      name: 'Submit',
      component: () => import('@/components/views/Submit')
    }, {
      path: '/Mall',
      name: 'Mall',
      component: () => import('@/components/views/Mall')
    }, {
      path: '/User',
      name: 'User',
      component: () => import('@/components/views/User')
    }, {
      path: '/Callenge',
      name: 'Callenge',
      component: () => import('@/components/views/Challenge')
    }, {
      path: '/Status',
      name: 'Status',
      component: () => import('@/components/views/Status')
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: () => import('@/components/views/Chat')
    },
    {
      path: '/Contest',
      name: 'Contest',
      component: () => import('@/components/views/Contest')
    },
    {
      path: '/ContestSignUp',
      name: 'ContestSignUp',
      component: () => import('@/components/views/ContestSignUp')
    },
    {
      path: '/ContestInfo',
      name: 'ContestInfo',
      component: () => import('@/components/views/ContestInfo')
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: () => import('@/components/views/Admin')
    },
    {
      path: '/CodeView',
      name: 'CodeView',
      component: () => import('@/components/views/CodeView')
    },
    {
      path: '/MainRank',
      name: 'MainRank',
      component: () => import('@/components/views/MainRank')
    },
    {
      path: '/HonorRank',
      name: 'HonorRank',
      component: () => import('@/components/views/HonorRank')
    },
    {
      path: '/Discuss',
      name: 'Discuss',
      component: () => import('@/components/views/Discuss')
    },
    {
      path: '/EditUser',
      name: 'EditUser',
      component: () => import('@/components/views/EditUser')
    },
    {
      path: '/ClockIn',
      name: 'ClockIn',
      component: () => import('@/components/views/ClockIn')
    },
    {
      path: '/Message',
      name: 'Message',
      component: () => import('@/components/views/Message')
    }
  ]
})
