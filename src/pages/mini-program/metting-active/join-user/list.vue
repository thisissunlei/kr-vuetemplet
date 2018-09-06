
<template>
  <div class="m-account-management">
      <div class="account-manage-table">
          <Table 
            :columns="listColumns" 
            :data="listData"
            border
          />
       </div>
  </div>
</template>

<script>
import publicFn from './publicPage.js';
export default {
    props:{
        type:{
            type:String,
            default:""     
        }
    }, 
    data() {
        return{
           listData:[],
           listColumns:[].concat(this.formattingColumns(publicFn.initListData.call(this,this.type))),
           allMoney:'',
           communityList:[]
        }
    },
    mounted(){
        this.getListData()
    },
    methods:{
       formattingColumns(data){
           var arr = [];
            for(let i=0;i<data.length;i++){
                let every = data[i];
                if(every.type.indexOf(this.type)!=-1){
                    arr.push(every);
                }
            }
            return arr;
       },
       goView(params){
           window.open('/bill/payment/detail/'+params.recordId,'_blank');
       },
       getListData(){
           let arriving = false;
            if(this.type == 'entrance'){
                arriving = true;
            }
            this.$http.get('metting-active-user-list',{
                activityId:this.$route.query.activityId||1,
                arriving:arriving
            }).then((response)=>{    
                this.listData=response.data.item;
                this.allMoney=response.data.totalCount;
            }).catch((error)=>{
                this.$Notice.error({
                    title:error.message
                });
            })
        }
    }
}
</script>

<style lang="less">
  .m-account-management{
      .account-manage-table{
          margin:10px 20px 0 0px;
      }
      .statusClass{
            .ivu-table-cell{
                padding:0 5px;
            }
      }
  }
</style>
