export default {routes:[{
    path:'/demo',
    name:'demo',
    component:()=>import('pages/demo') 
},{
    path:'/list',
    name:'list',
    component:()=>import('pages/list') 
},{
    path:'/mini-program/metting-active/detail',
    name:'mini-program-metting-active-detail',
    component:()=>import('pages/mini-program/metting-active/detail') 
},{
    path:'/mini-program/metting-active/edit',
    name:'mini-program-metting-active-edit',
    component:()=>import('pages/mini-program/metting-active/edit') 
},{
    path:'/mini-program/metting-active',
    name:'mini-program-metting-active',
    component:()=>import('pages/mini-program/metting-active') 
}]}