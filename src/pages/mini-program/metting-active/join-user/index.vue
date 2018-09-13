<template>
    <div class="join-user">
        <SectionTitle :title="this.title"/>
        <div class="join-user-table">
            <div class="join-user-export">
               <Button type='primary' @click='submitExport'>导出</Button>
            </div>
            <Tabs 
                :value="type"
                :animated="false"
                @on-click="tabsClick"
            >
                <TabPane :label="'报名用户('+applyNum+')'" name="apply"> 
                    <List v-if="type == 'apply'" :type="type"/>
                </TabPane>
                <TabPane :label="'已入场用户('+entranceNum+')'" name="entrance" >
                    <List v-if="type == 'entrance'" :type="type"/>
                </TabPane>
            </Tabs>

            <!-- <div style="text-align:center;margin-top:30px;width:100%;">
              <Button type='primary' @click='submitSure'>确定</Button>
            </div> -->
        </div>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import  List from './list';
import utils from 'utils'
export default {
    components: {
      SectionTitle,
      List
    },
    mounted(){
        GLOBALSIDESWITCH("false");
        document.title = "活动-氪空间后台管理系统";
      
        this.getTabelData();
    },
    data(){
        return {
            type:'apply',
            applyNum:0,
            entranceNum:0,
            title:'',
        }
    },
    methods:{
        tabsClick(val){
            this.type = val;
            this.getTabelData();
        },
        getTabelData(){
            this.$http.get("metting-active-user-tab-data",{
                activityId:this.$route.query.activityId
            }).then((res)=>{
                console.log("res",res)
                this.title = res.data.activityName;
                this.applyNum = res.data.totalCount;
                this.entranceNum = res.data.arrivingCount;
               
            }).catch((error)=>{
                this.$Notice.error({
                    title: error.message
                });
            })
        },
        submitSure(){

        },
        submitExport(){
            let params = {
                activityId:this.$route.query.activityId,
                arriving:true
            };
            if(this.type=='apply'){
                delete params.arriving;
            }

            utils.commonExport(params,'/api/op/kmactivity/join/export')
        }      
    }
}
</script>
<style lang="less" scoped>
    .join-user{
      .join-user-table{
          position:relative;
          padding:30px 20px 0 20px;
          .join-user-export{
            position:absolute;
            right:40px;
            top:15px;
          }   
      } 
    }
</style>
