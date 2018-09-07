import Vue from 'vue';
import Router from 'vue-router';
import newRoute from './newRouter.js';
Vue.use(Router)
const myRoute = [{
  path:'/operate',
  name:'operate',
  component:()=>import('pages/operate/operate.vue') 
},{
  path:'/operateDetail',
  name:'operateDetail',
  component:()=>import('pages/operate/operateDetail.vue')
},{
  path:'/order',
  name:'order',
  component:()=>import('pages/order/order.vue') 
},{
  path:'/orderDetail',
  name:'orderDeatil',
  component:()=>import('pages/order/orderDetail.vue')
},{
  path:'/setting',
  name:'setting',
  component:()=>import('pages/setting/setting.vue') 
},{
  path:'/settingDetail',
  name:'settingDetail',
  component:()=>import('pages/setting/settingDetail.vue')
},{
  path:'/newBuiltGoods',
  name:'newBuiltGoods',
  component:()=>import('pages/setting/newBuiltGoods.vue')
},{
  path:'/editGoods',
  name:'edutGoods',
  component:()=>import('pages/setting/editGoods.vue')
}]
newRoute.routes = newRoute.routes.concat(myRoute);
// newRoute.mode='history';
export default new Router(newRoute)

