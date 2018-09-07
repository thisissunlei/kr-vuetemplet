export default {
    //获取社区接口
    "get-all-select-communitys": {
        url: "/api/op/krmting/mobile/community/km/cmt/list",
        method: "get"
    },
    //获取客户信息
    'getUserData':{
        url:'/api/krspace-sso-web/sso/sysOwn/findUserData',
        method: 'get'
    },
    'post-list-upload-url': {
        url: '/api/krspace-erp-web/wf/request-attachment/add',
        method: 'post'
    }, 
    //获取上传文件的接口
    'get-vue-upload-url': {
        url: '/api/krspace-op-web/sys/upload-policy',
        method: 'get'
    },
    //所有枚举获取接口
    'get-enum-all-data':{
        url:'/api/krspace-sso-web/sys/enmu',
        method:'get'
    },
    //下载接口
    'down-file':{
        url:'/api/op/sys/downFile',
        method:'get'
    },
    'down-file':{
        url:'/api/op/sys/downFile',
        method:'get'
    },
    'get-customers-order-currency':{
        url:'/api/krspace-op-web/customer/my-customers/order-currency',
        method:'get'
    },
     //获取pdf地址
    'get-station-contract-pdf-url': {
        url: '/api/krspace-op-web/sys/down-file',
        method: 'post'
    },
}