<template>
    <div class="search-from">
        <Form ref="formItemDaily" :model="formItem" :rules="ruleDaily" label-position="left">
            <div style="white-space: nowrap;">
                <div>
                    <div style="display:inline-block;margin:15px 15px;" >
                        <Button type="primary"  @click="goNewActive">新建活动</Button>
                    </div>
	                

                    <Form-item
                        label="所在社区" 
                        :label-width="60" 
                        style="display:inline-block;width:240px; margin:15px 15px;" 
                        prop="startDate"
                    >
                        <KrSelect 
                            v-model="formItem.startDate" 
                        />
                    
                    </Form-item>
                 
                    <Form-item 
                        label="活动日期" 
                        :label-width="60" 
                        style="display:inline-block; margin:15px 0px 15px 0px;" 
                        prop="startDate"
                    >
                        <DatePicker 
                            v-model="formItem.startDate" 
                            placeholder="请输入开始日期"
                            style="width:150px;"
                            
                        />
                    </Form-item>
                    
                    <Form-item 
                        label="至" 
                        :label-width="18" 
                        prop="endDate" 
                    
                        style="display:inline-block;margin:15px 20px 15px 0px;"
                    >
                        <DatePicker 
                            v-model="formItem.endDate" 
                            placeholder="请输入结束日期"
                            style="width:150px;"
                        />
                    </Form-item>
                     <Button type="ghost" @click="searchClick" style="margin:15px 12px;">清除</Button>
                </div>    
                <div>
                    <Form-item 
                        label="活动状态" 
                        :label-width="60" 
                        prop="endDate" 
                    
                        style="display:inline-block;width:235px;margin:15px;"
                    >
                        <KrSelect 
                            v-model="formItem.startDate" 
                            :options="activityStateList"
                        />
                    </Form-item>
                    <Form-item 
                        label="活动名称"
                        :label-width="60" 
                        prop="name"
                        style="display:inline-block;width:235px; margin:15px 15px;" 
                    >
                        <i-input 
                            v-model="formItem.name" 
                            placeholder="房间号/工位编号"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item> 
                    <Form-item 
                        label="活动名称"
                        :label-width="60" 
                        prop="name"
                        style="display:inline-block;width:235px; margin:15px 15px 15px 0px;" 
                    >
                        <i-input 
                            v-model="formItem.name" 
                            placeholder="房间号/工位编号"
                            @keyup.enter.native="onKeyEnter($event)"
                        />
                    </Form-item> 

                    <Button type="primary" @click="searchClick" style="margin:15px">搜索</Button>
                   
                    <!-- <Button type="primary" @click="searchClick">搜索</Button> -->
                    
                </div>
                        
                   
              
            </div>
          


             
                
        </Form>
    </div>
</template>
<script>
import KrSelect from "~/components/KrSelect";
export default {
  components: {
    KrSelect
  },
  props: {},
  data() {
    return {
      formItem: {
        startDate: ""
      },
      ruleDaily: {},
      activityStateList: [
        {
          label: "已发布",
          value: "1"
        },
        {
          label: "未发布",
          value: "2"
        }
      ]
    };
  },
  methods: {
    onKeyEnter() {},
    clearClick() {},
    searchClick(){},
    goNewActive(){
		window.open('/mini-program/metting-active/edit','_blank')
	}
  },
  
};
</script>
<style lang="less" scoped>
.search-from {
  .iconForm {
    display: inline-block;
  }
  .priceForm {
    display: inline-block;
  }
}
</style>

