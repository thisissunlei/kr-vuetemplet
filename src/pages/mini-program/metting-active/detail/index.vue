<template>
    <div class="kr-meeting-detail">
        <SectionTitle title="小程序活动详情"></SectionTitle>
        <div class="content-box" v-if="loadding">
            <div class="basic-info">
                <SectionTitle title="基本信息"></SectionTitle>
                <div class="basic-info-box">
                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">创建人</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.creatorName||'-'}}</div>
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">创建时间</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.ctime | dateFormat}}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">最后编辑人</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.updatorName||'-'}}</div>
                        </Col>

                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">最后编辑时间</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.utime | dateFormat }}</div>
                        </Col>
                    </Row>
                    <Row>
                       <Col span="12">
                             <div style="padding:0 0 10px 0px;font-weight: bold;">活动状态</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.published ? '已发布':'已下线'}}</div>
                        </Col>
                    </Row>
                  
                   
                </div>
            </div>

             <div class="basic-info order-info">
                <SectionTitle title="活动基本信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动封面图</div>
                            <KrImg :src="formItem.coverPic" :width="200" :height="100" type="center"/>
                            
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">小程序活动分享图</div>
                            <KrImg :src="formItem.sharePic" :width="200" :height="160" type="cover"/>
                            
                        </Col>
                        
                    </Row>
                    <Row style="padding:10px 0 0 0">
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动名称</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.title||'-'}}</div>
                        </Col>
                         <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">最大人数限制</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.limitCount||'-'}}</div>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动日期</div>
                            <div style="padding:0 0 10px 0px;">{{(formItem.beginTime+'至'+formItem.endTime)||'-'}}</div>
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动时间</div>
                            <div style="padding:0 0 10px 0px;">{{(formItem.startMoment+'至'+formItem.endMoment)||'-'}}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动价格</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.price||'-'}}</div>
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">排序号</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.sortNum||'-'}}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动所在社区</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.communityName||'-'}}</div>
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动地点</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.site||'-'}}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="19">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动详细地址</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.address||'-'}}</div>
                        </Col>
                    </Row>    
                    
                </div>
            </div>

            <div class="basic-info order-info">
                <SectionTitle title="主办方信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">主办方LOGO</div>
                            <KrImg 
                                
                                :src="formItem.sponsorLogo" 
                                :width="100" 
                                :height="100" 
                                type="center"
                            />
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">主办方名称</div>
                            <div>{{formItem.sponsorName}}</div>
                        </Col>
                        
                    </Row>

                    
                   
                </div>
            </div>

            <div class="basic-info order-info">
                <SectionTitle title="品牌合作方信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="24">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">品牌合作方LOGO</div>
                            <KrImg 
                                v-for="item in formItem.partnerLogos"
                                :key="item.partnerLogos"
                                :style="{display:'inline-block',margin:'5px'}"
                                :src="item" 
                                :width="100" 
                                :height="100" 
                                type="center"
                            />
                        </Col>
                        
                    </Row>
                </div>
            </div>

            <div class="basic-info order-info">
                <SectionTitle title="活动详细信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="19">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动详情</div>
                              <KrImg 
                                v-for="item in formItem.content"
                                :key="item.id"
                                :style="{display:'inline-block',margin:'0px 10px'}"
                                :src="item.url" 
                                :width="200" 
                                :height="200" 
                                type="center"
                            />
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span="19">
                            <div style="padding:0 0 10px 0px;font-weight: bold;">活动须知</div>
                            <div style="padding:0 0 10px 0px;" v-html="formItem.notice||'-'"></div>
                        </Col>
                        
                    </Row>
                </div>
            </div>
          

            <!-- <Row>
                <Col span="19" style="text-align: center;margin:30px 0px 0px 0px;">
                    <FormItem>
                        <Button type="primary">Submit</Button>
                        <Button type="ghost" style="margin-left: 8px">Cancel</Button>
                    </FormItem>
                </Col>      
            </Row> -->
            
        </div>
    </div>
</template>

<script>
import SectionTitle from "~/components/SectionTitle";
import dateUtils from "vue-dateutils";
import KrUpload from "~/components/KrUpload";
import KrSelect from "~/components/KrSelect";
import KrImg from "~/components/KrImg";

export default {
  components: {
    SectionTitle,
    KrUpload,
    KrSelect,
    KrImg
  },
  data() {
    return {
      files: [
        {
          id: 1,
          url:
            "https://krspace-upload-test-public.oss-cn-beijing.aliyuncs.com/invoice/upload/22335/2018/08/30/110921859m31Q3lk/活动-报名列表-日期显示不全.png"
        }
      ],
      formItem: {},
      loadding:false,
    };
  },

  mounted() {
    GLOBALSIDESWITCH("false");
      document.title = '小程序活动详情-氪空间后台管理系统'
    //    this.getkrmeetingStatus();
    //    this.getDetailInfo();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loadding = false;
      let params = Object.assign(
        {},
        { activityId: this.$route.query.activityId }
      );
      this.$http
        .get("metting-active-detail", params)
        .then(res => {
          let data = Object.assign({}, res.data);
        
          let startDateArr = dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(data.beginTime)).split(" ")
          let endDateArr = dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(data.endTime)).split(" ")
          console.log(startDateArr,"llll",endDateArr)
          if(startDateArr[0]!=endDateArr[0] && startDateArr[1]==endDateArr[1] && startDateArr[1] == '00:00:00'){
            data.endTime = data.endTime-1;
          }
          console.log(dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(data.endTime)),"lllll")
          data.content = JSON.parse(data.content);
          data.startMoment = data.beginTime
            ? dateUtils
                .dateToStr("YYYY-MM-DD HH:mm:ss", new Date(data.beginTime))
                .split(" ")[1]
            : "";
          data.endMoment = data.endTime
            ? dateUtils
                .dateToStr("YYYY-MM-DD HH:mm:ss", new Date(data.endTime))
                .split(" ")[1]
            : "";
          data.beginTime = data.beginTime?dateUtils.dateToStr("YYYY-MM-DD", new Date(data.beginTime)):'';
          data.endTime = data.endTime?dateUtils.dateToStr("YYYY-MM-DD", new Date(data.endTime)):'';
          this.formItem = Object.assign({}, data);
          this.loadding = true;
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    }
  }
};
</script>
<style lang="less">
.content-box {
  padding: 0 20px;
}
.basic-info {
  background: #f6f6f6;
  border-radius: 6px;
  margin-top: 20px;
}

.basic-info-box {
  padding: 10px;
}
.list-li {
  display: inline-block;
  width: 160px;
  height: 170px;
  padding: 0 25px;
}
.list-ul {
  display: flex;
  flex-wrap: wrap;
}
</style>