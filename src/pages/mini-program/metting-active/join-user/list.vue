
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
       getListData(params){
            let newParams={};
            let dateArray=['endTime','startTime'];
            let newDate=publicFn.dateFormat(dateArray,params);
            newParams=Object.assign({},params,newDate);
            newParams.customerId=this.$route.params.customer;
            let typeUrl='';
            switch (this.type) {
                case 'getDetail':
                    typeUrl='account-payment-detail'
                    break;
                case 'refundDetail':
                    typeUrl='account-refund-detail'
                    break;
                default:
                    break;
            }
            this.$http.get(typeUrl,newParams).then((response)=>{    
                this.listData=response.data.details;
                this.allMoney=response.data.total;
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
