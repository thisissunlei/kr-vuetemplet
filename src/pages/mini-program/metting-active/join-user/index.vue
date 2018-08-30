<template>
    <div class="join-user">
        <SectionTitle title="【王牌职业】氪空间大都会社区开业派对"/>
        <div class="join-user-table">
            <div class="join-user-export">
               <Button type='primary' @click='submitExport'>导出</Button>
            </div>
            <Tabs 
                :value="type"
                :animated="false"
                @on-click="tabsClick"
            >
                <TabPane :label="applyLabel" name="apply"> 
                    <List v-if="type == 'apply'" :type="type"/>
                </TabPane>
                <TabPane :label="entranceLabel" name="entrance" >
                    <List v-if="type == 'entrance'" :type="type"/>
                </TabPane>
            </Tabs>

            <div style="text-align:center;margin-top:30px;width:100%;">
              <Button type='primary' @click='submitSure'>确定</Button>
            </div>
        </div>
    </div>
</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import  List from './list';
export default {
    components: {
      SectionTitle,
      List
    },
    head () {
        return {
            title: "活动-氪空间后台管理系统"
        }
    },
    data(){
        return {
            type:'apply',
            applyLabel:'报名用户('+20+')',
            entranceLabel:'已入场用户('+49+')'
        }
    },
    methods:{
        tabsClick(val){
            this.type = val;
        },
        submitSure(){

        },
        submitExport(){

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
