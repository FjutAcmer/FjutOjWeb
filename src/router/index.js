import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes:[
    {
      path:'/',
      name:'Home',
      component:()=>import('@/components/views/Home')
    },{
      path:'/Login',
      name:'Login',
      component:()=>import('@/components/views/Login')
    },{
      path:'/Register',
      name:'Register',
      component:()=>import('@/components/views/Register')
    },{
      path:'/Problem',
      name:'Problem',
      component:()=>import('@/components/views/Problem')
    },{
      path:'/Submit',
      name:'Submit',
      component:()=>import('@/components/views/Submit')
    },{
      path:'/Mall',
      name:'Mall',
      component:()=>import('@/components/views/Mall')
    }
  ]
})
