export default {routes:[{
    path:'/demo',
    name:'demo',
    component:()=>import('pages/demo') 
},{
    path:'/list',
    name:'list',
    component:()=>import('pages/list') 
},{
    path:'/mini-program/metting-active/edit',
    name:'mini-program-metting-active-edit',
    component:()=>import('pages/mini-program/metting-active/edit') 
}]}