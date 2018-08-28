export default {routes:[{
    path:'/demo',
    name:'demo',
    component:()=>import('pages/demo') 
},{
    path:'/list',
    name:'list',
    component:()=>import('pages/list') 
},{
    path:'/new',
    name:'new',
    component:()=>import('pages/new') 
}]}