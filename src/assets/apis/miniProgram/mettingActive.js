export default {
  //小程序活动列表接口
  'get-metting-active-list': {
    url: '/api/op/kmactivity/list',
    method: 'get'
  },
  //发布活动接口
  'metting-active-publish': {
    url: '/api/op/kmactivity/publish',
    method: 'get'
  },
  //新建接口
  'metting-active-add':{
    url:'/api/op/kmactivity/add',
    method: 'post'
  },
  //编辑接口
  'metting-active-edit':{
    url:'/api/op/kmactivity/edit',
    method: 'post'
  },
  //详情接口
  'metting-active-detail':{
    url:'/api/op/kmactivity/view',
    method: 'get'
  },
  //详情接口
  'metting-active-user-list':{
    url:'/api/op/kmactivity/join/view',
    method: 'get'
  },
  //用户列表信息
  'metting-active-user-tab-data':{
    url:'/api/op/kmactivity/join/tab-data',
    method: 'get'
  },
  //删除活动
  'metting-active-delete':{
    url:'/api/op/kmactivity/delete',
    method: 'get'
  },
  // /km/cmt/detail
  'metting-active-detail-cmt':{
    url:'/api/op/krmting/mobile/community/km/cmt/detail',
    method: 'get'
  },

  // 


}