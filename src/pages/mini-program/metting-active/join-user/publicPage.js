import dateUtils from 'vue-dateutils';
import utils from '~/plugins/utils';
function initListData(type){
    return [
        {
            title:'用户ID',
            key: 'uid',
            align:'center',
            type:'apply,entrance'
        },
        {
            title: '公司名称',
            key: 'companyName',
            align:'center',
            type:'apply,entrance'  
        },
        {
            title: '微信头像',
            key: 'avator',
            align:'center',            
            type:'apply,entrance',
            render:(h,params)=>{
                return h('img',{
                    style:{
                        width:'40px'
                    },
                    attrs:{
                        src:params.row.avator
                    }
                })
            }
        },
        {
            title: '微信昵称',
            key: 'nickName',
            align:'center',
            type:'apply,entrance'
        },
        {
            title: '姓名',
            key: 'name',
            align:'center',
            type:'apply,entrance'
        },
        {
            title: '手机号',
            key: 'phone',
            align:'center',
            type:'apply,entrance'
        },
        {
            title: '用户角色',
            key: 'role',
            align:'center',
            type:'apply,entrance'  
        },
        {
            title:'报名时间',
            key: 'joinTime',
            align:'center',
            type:'apply,entrance',
            render:(h,params)=>{
                let date=params.row.joinTime?dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.joinTime)):'';
                return h('span',{},date);
            }
        },
        {
            title: type=='apply'?'是否已入场':'入场时间',
            align:'center',
            type:'apply,entrance',
            render:(h,params)=>{
                let str = '';
                if(type=='apply'){
                     str = params.row.arriving ? '是':'否'
                }else{
                    str=params.row.joinTime?dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params.row.arrivingTime)):'';
                }
                
                return  h('span',{},str);
            }
        }
    ]
}

function dateFormat(array,params){
    let list={};
    array.map((item,index)=>{
       list[item]=params[item]?dateUtils.dateToStr("YYYY-MM-DD  HH:mm:SS",new Date(params[item])):'';
    })
    return list;
}
export default {initListData,dateFormat};