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
                        prop="cmtId"
                    >
                        <KrSelect 
                            v-model="formItem.cmtId" 
                        />
                    
                    </Form-item>
                 
                    <Form-item 
                        label="活动日期" 
                        :label-width="60" 
                        style="display:inline-block; margin:15px 0px 15px 0px;" 
                        prop="beginTime"
                       
                    >
                        <DatePicker 
                            v-model="formItem.beginTime" 
                            placeholder="请输入开始日期"
                            style="width:150px;"
                            @on-change="datePickerChange"
                            
                        />
                    </Form-item>
                    
                    <Form-item 
                        label="至" 
                        :label-width="18" 
                        style="display:inline-block;margin:15px 20px 15px 0px;"
                        prop="published"
                    >
                        <DatePicker 
                            v-model="formItem.published" 
                            placeholder="请输入结束日期"
                            style="width:150px;"
                            
                        />
                    </Form-item>
                     <Button type="ghost" @click="clearClick" style="margin:15px 12px;">清除</Button>
                </div>    
                <div>
                    <Form-item 
                        label="活动状态" 
                        :label-width="60" 
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
                        style="display:inline-block;width:235px; margin:15px 15px;" 
                    >
                        <i-input 
                            v-model="formItem.title" 
                            placeholder="请输入活动名称"
                           
                        />
                    </Form-item> 
                    <Form-item 
                        label="创建人"
                        :label-width="45" 
                        style="display:inline-block;width:235px; margin:15px 15px 15px 0px;" 
                    >
                        <i-input 
                            v-model="formItem.creatorName" 
                            placeholder="请输入创建人"
                          
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
import utils from "utils";
export default {
  components: {
    KrSelect
  },
  props: {},
  data() {
    const validateTime = (rule, value, callback) => {
      
      if (this.formItem.beginTime && this.formItem.endTime) {
        if (this.formItem.beginTime > this.formItem.endTime) {
          callback(new Error("开始时间不得大于结束时间"));
        }
      } else {
        callback();
      }
    };

    return {
      formItem: Object.assign({
        beginTime: "",
        endTime: "",
        cmtId: "",
        creatorName: "",
        title: ""
      },this.$route.query) ,
      ruleDaily: {
        beginTime: [
          {
            validator: validateTime,
            trigger: "change"
          }
        ],
        endTime: [
          {
            validator: validateTime,
            trigger: "change"
          }
        ]
      },
      activityStateList: [
        {
          label: "已发布",
          value: true
        },
        {
          label: "未发布",
          value: false
        }
      ]
    };
  },
  mounted(){
    this.formItem = Object.assign({},this.$route.query);
   
  },
  methods: {
    onKeyEnter() {},
    clearClick() {
      this.formItem = utils.clearForm(this.formItem)
      this.$emit("clear", Object.assign({}, this.formItem));
    },
    searchClick() {
      this.$emit("search", Object.assign({}, this.formItem));
    },
    goNewActive() {
      window.open("/admin-applet/#/mini-program/metting-active/edit?type=add", "_blank");
    },
    datePickerChange() {}
  }
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

