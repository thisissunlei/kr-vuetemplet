<template>
    <div class="kr-meeting-detail">
        <SectionTitle :title="title"></SectionTitle>
        <div v-if="loadding" class="content-box">
            <Form ref="formItemDaily" :model="formItem" :rules="ruleDaily" label-position="top">
            <div class="basic-info">
                <SectionTitle title="基本信息"></SectionTitle>
                <div class="basic-info-box">
                  <Row>
                      <Col span="12">
                          <Form-item
                              label="活动封面图" 
                              prop="coverPic"
                              :inline="false"
                          >
                              <KrUpload 
                                  v-model="formItem.coverPic"
                                  height="100"
                                  width="200"
                                  category="kmactivity"
                                  :publicUse="true"
                                  :multiple="false"
                                  placeholder="图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为2:1"
                              />
                          
                          </Form-item>
                      </Col>
                      <Col span="12">
                          <Form-item
                              
                              label="小程序分享封面图" 
                              prop="sharePic"
                              :inline="false"
                          >
                              <KrUpload 
                                  v-model="formItem.sharePic"
                                  width="200"
                                  height="160"
                                  category="kmactivity"
                                  :publicUse="true"
                                  :multiple="false"
                                  placeholder="图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为5:4"
                              />
                          
                          </Form-item>
                      </Col>
                  </Row>
                  <Row >
                      <Col span="12">
                          <Form-item
                              label="活动名称" 
                              prop="title"
                              :inline="false"
                              style="width:300px;"
                              
                          >
                              <Input 
                                  v-model="formItem.title" 
                                  type="textarea" 
                                  :autosize="{minRows: 2,maxRows: 5}" 
                                  placeholder="40个字以内"/>
                          
                          </Form-item>
                      </Col>

                      <Col span="12">
                          <Form-item
                              label="最大人数限制" 
                              prop="limitCount"
                              :inline="false"
                          >
                              <Input
                                  style="width:300px;"
                                  :min="1" 
                                  v-model="formItem.limitCount"
                                  placeholder="若不填，则无人数限制"
                              />
                          
                          </Form-item>
                      </Col>
                  </Row>
                  
                  <Row style="pading-bottom:10px;">
                      <Col span="12">
                          <!-- <div style="padding-bottom:10px;">活动日期</div> -->
                          <Form-item 
                              label="活动日期" 
                              style="display:inline-block;" 
                              prop="beginTime"
                              
                          >
                              <DatePicker 
                                  v-model="formItem.beginTime" 
                                  placeholder="开始日期"
                                  style="width:130px;"
                                  
                              />
                          </Form-item>
                          <span style="display:inline-block;padding:0 10px;line-height:30px;margin-top:20px;">至</span>
                          <Form-item 
                              prop="endTime" 
                              label=" " 
                              style="display:inline-block;margin-top:4px;"
                              
                          >
                              <DatePicker 
                                  v-model="formItem.endTime" 
                                  placeholder="结束日期"
                                  style="width:130px;"
                              />
                          </Form-item>
                      </Col>
                      <Col span="12">
                          <div style="padding-bottom:10px;">活动时间</div>
                          <Form-item 
                              style="display:inline-block;" 
                              prop="startMoment"
                              
                          >
                              <TimePicker  v-model="formItem.startMoment" confirm  :clearable="false" format="HH:mm" placeholder="开始时间" style="width:130px;" />
                          </Form-item>
                          <span style="display:inline-block;padding:0 10px;line-height:30px;">至</span>
                          <Form-item 
                              prop="endMoment" 
                              style="display:inline-block;"
                          >
                                <TimePicker :clearable="false"  v-model="formItem.endMoment" confirm format="HH:mm" placeholder="结束时间" style="width:130px;" />
                          </Form-item>
                      </Col>
                  </Row>
                  <Row>
                      <Col span="12">
                          <Form-item 
                              label="活动价格" 
                              prop="price" 
                              style="display:inline-block;width:300px;"
                          >
                              <!-- <Radio v-model="formItem.price" >免费</Radio> -->
                              <RadioGroup v-model="formItem.price">
                                    <Radio label="0">
                                        <Icon type="logo-apple"></Icon>
                                        <span>免费</span>
                                    </Radio>
                                </RadioGroup>
                          </Form-item>
                      </Col>
                        <Col span="12">
                          <Form-item 
                              label="排序号" 
                              prop="sortNum" 
                              style="display:inline-block;width:300px;"
                          >
                              <Input
                                  style="width:300px;"
                                  :min="1" 
                                  v-model="formItem.sortNum"
                                  placeholder="数字越大越靠前"
                              />
                          </Form-item>
                      </Col>
                  </Row>
                  <Row>
                      <Col span="12">
                          <Form-item 
                              label="活动所在社区" 
                              prop="communityId" 
                              style="display:inline-block;width:300px;"
                          >
                              <KrSelect 
                                  v-model="formItem.communityId" 
                                  placeholder="请选择"
                                  @on-select-change="selectChange"
                              />
                          </Form-item>
                      </Col>
                        <Col span="12">
                          <Form-item 
                              label="活动地点" 
                              prop="site" 
                              style="display:inline-block;width:300px;"
                          >
                              <Input 
                                  v-model="formItem.site" 
                                  type="textarea" 
                                  :autosize="{minRows: 2,maxRows: 5}" 
                                  placeholder="简述活动所在地点(40个字以内)"
                              />
                          </Form-item>
                      </Col>
                  </Row>

                  <Row>
                      <Col span="12">
                          <Form-item 
                              label="活动详细地址" 
                              prop="address" 
                              style="display:inline-block;width:300px;"
                          >
                              <Input 
                                  v-model="formItem.address" 
                                  type="textarea" 
                                  :autosize="{minRows: 2,maxRows: 5}" 
                                  placeholder="活动详细地址(40个字以内)"
                              />
                          </Form-item>
                      </Col>
                        <Col span="12">
                      </Col>
                  </Row>
                  
                   
                </div>
            </div>

             <div class="basic-info order-info">
                <SectionTitle title="主办方信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="12">
                            <Form-item
                                label="主办方LOGO" 
                                prop="sponsorLogo"
                                :inline="false"
                            >
                                <KrUpload 
                                    v-model="formItem.sponsorLogo"
                                    height="100"
                                    width="100"
                                    category="kmactivity"
                                    imgDisplay="center"
                                    :publicUse="true"
                                    :multiple="false"
                                    placeholder="图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为1:1"
                                />
                            
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <Form-item
                                label="主办方名称" 
                                prop="sponsorName"
                                :inline="false"
                            >
                                <Input 
                                    v-model="formItem.sponsorName" 
                                    type="text" 
                                    :autosize="{minRows: 2,maxRows: 5}" 
                                    style="width:300px;"
                                    placeholder="20个字符以内"
                                />
                            </Form-item>
                        </Col>

                        
                    </Row>
                    <Row>
                        <Col span="19">
                            <Form-item
                                label="主办方简介" 
                                prop="sponsorIntro"
                                :inline="false"
                            >
                                <Input 
                                    v-model="formItem.sponsorIntro" 
                                    type="textarea" 
                                  
                                    placeholder="主办方简介,80个字符以内"
                                />
                            
                            </Form-item>
                        </Col>
                        
                    </Row>
                </div>
            </div>

            <div class="basic-info order-info">
                <SectionTitle title="品牌合作方信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="19">
                            <Form-item
                                label="品牌合作方LOGO" 
                                prop="partnerLogos"
                                :inline="false"
                            >
                                <KrUpload 
                                    v-model="formItem.partnerLogos"
                                    height="100"
                                    width="100"
                                    imgDisplay="center"
                                    category="kmactivity"
                                    :publicUse="true"
                                    placeholder="图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为1:1"
                                />
                            
                            </Form-item>
                        </Col>
                        
                    </Row>
                </div>
            </div>

            <div class="basic-info order-info">
                <SectionTitle title="活动详细信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="19">
                            <Form-item
                                label="活动详情" 
                                prop="content"
                                :inline="false"
                            >
                              <KrUpload 
                                category="kmactivity"
                                :publicUse="true"
                                v-model="formItem.content"
                                height="200"
                                width="200"
                              />
                            
                            </Form-item>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span="19">
                            <Form-item
                                label="活动须知" 
                                prop="notice"
                                :inline="false"
                            >
                               <Input v-model="formItem.notice" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="活动须知，400个字符以内"/>
                            
                            </Form-item>
                        </Col>
                        
                    </Row>
                </div>
            </div>
            <Row>
                <Col span="19" style="text-align: center;margin:30px 0px 0px 0px;">
                    <FormItem>
                        <Button type="primary" @click="submit">提交</Button>
                        <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
                    </FormItem>
                </Col>      
            </Row>
            
        </Form>
        </div>
    </div>
</template>

<script>
import SectionTitle from "~/components/SectionTitle";
import dateUtils from "vue-dateutils";
import KrUpload from "~/components/KrUpload";
import KrSelect from "~/components/KrSelect";

export default {
  components: {
    SectionTitle,
    KrUpload,
    KrSelect
  },
  data() {
    const validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("活动名称为必填项"));
      } else {
        if (value && value.length > 40) {
          callback(new Error("活动名称最多40字符"));
        }
        callback();
      }
    };
    const validateBeginTime = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("活动开始时间必填"));
      } else {
        if (
          this.formItem.beginTime &&
          this.formItem.endTime &&
          this.formItem.beginTime > this.formItem.endTime
        ) {
          callback(new Error("开始时间不得大于结束时间"));
        }
        callback();
      }
    };
    const validateEndTime = (rule, value, callback) => {
      let start =   dateUtils.dateToStr("YYYY-MM-DD", new Date(this.formItem.beginTime));
      let end =  dateUtils.dateToStr("YYYY-MM-DD", new Date(this.formItem.endTime));
      console.log(start,end,"kkkk")
      if (value === "") {
        callback(new Error("活动结束时间必填"));
      } else {
        if (
          start &&
          end &&
          start > end
        ) {
          callback(new Error("开始时间不得大于结束时间"));
        }
        callback();
      }
    };
    const validateMoment = (rule, value, callback) => {
      let startDate =  dateUtils.dateToStr("YYYY-MM-DD", new Date(this.formItem.beginTime))
      let endDate =  dateUtils.dateToStr("YYYY-MM-DD", new Date(this.formItem.endTime))
      if (
        (startDate == endDate) &&
        this.formItem.startMoment >= this.formItem.endMoment
      ) {
        callback(new Error("开始时间不得大于结束时间"));
      }
      callback();
    };

    const validatorCmtId = (rule, value, callback) => {
      if (!value) {
        callback(new Error("活动所在社区必选"));
      }
      callback();
    };
    const validatorSite = (rule, value, callback) => {
      if (!value) {
        callback(new Error("活动地点必选"));
      } else {
        if (value.length > 40) {
          callback(new Error("活动地点最多40个字符"));
        }
      }
      callback();
    };

    const validatorAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error("活动详细地址必选"));
      } else {
        if (value.length > 40) {
          callback(new Error("活动详细地址最多40个字符"));
        }
      }
      callback();
    };
    const validatorSortNum = (rule, value, callback) => {
     
      value = "" + value;
      if (value) {
        value = value.replace(/^\s+|\s+$/g, "");
      }
      let regex = /^\d+$/;
      if (!regex.test(value)) {
        callback(new Error("排序号为非负整数"));
      }
      callback();
    };
    const validateLimitCount = (rule, value, callback) => {
      
      if (value) {
        value = "" + value;
        value = value.replace(/^\s+|\s+$/g, "");
      }
      console.log("====",value,"pppp")
      let regex = /^[0-9]*[1-9][0-9]*$/;
      if (value && !regex.test(value)) {
        callback(new Error("最大人数为正整数"));
      }
      callback();
    };
    const validatorSponsorName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("主办方名称必选"));
      } else {
        if (value.length > 20) {
          callback(new Error("主办方名称最多20个字符"));
        }
      }
      callback();
    };

    const validatorSponsorIntro = (rule, value, callback) => {
      if (!value) {
        callback(new Error("主办方简介必选"));
      } else {
        if (value.length > 80) {
          callback(new Error("主办方简介最多80个字符"));
        }
      }
      callback();
    };
    const validatorNotice = (rule, value, callback) => {
      if (value && value.length > 400) {
        callback(new Error("活动须知最多400个字符"));
      }

      callback();
    };
    const validatorContent = (rule, value, callback) => {
      if (value) {
        callback(new Error("活动详情必填"));
      }

      callback();
    };

    const validateImg = (rule, value, callback) => {
      if (!value || !value.length) {
        callback(new Error("该图片必须上传"));
      } else {
        callback();
      }
      callback();
    };
    return {
      loadding: true,
      title:'新建小程序活动',
      formItem: {
        price: 0,
        startMoment:'00:00:00',
        endMoment:'23:59:59'
      },
      ruleDaily: {
        coverPic: [
          { required: true, trigger: "change", validator: validateImg }
        ],
        sharePic: [{ required: true, trigger: "blue", validator: validateImg }],
        title: [
          { required: true, trigger: "change", validator: validateTitle }
        ],
        beginTime: [
          { required: true, trigger: "change", validator: validateBeginTime }
        ],
        endTime: [
          { required: false, trigger: "change", validator: validateEndTime }
        ],
        startMoment: [
          { required: false, trigger: "change", validator: validateMoment }
        ],
        endMoment: [
          { required: false, trigger: "change", validator: validateMoment }
        ],
        limitCount: [
          { required: false, trigger: "change", validator: validateLimitCount }
        ],
        sortNum: [
          { required: true, trigger: "change", validator: validatorSortNum }
        ],
        communityId: [
          { required: true, trigger: "change", validator: validatorCmtId }
        ],
        site: [{ required: true, trigger: "change", validator: validatorSite }],
        address: [
          { required: true, trigger: "change", validator: validatorAddress }
        ],
        sponsorName: [
          { required: true, trigger: "change", validator: validatorSponsorName }
        ],
        partnerLogos: [
          {
            required: true,
            trigger: "change",
            validator: validateImg
          }
        ],
        sponsorLogo: [
          { required: true, trigger: "change", validator: validateImg }
        ],
        sponsorIntro: [
          {
            required: true,
            trigger: "change",
            validator: validatorSponsorIntro
          }
        ],
        notice: [
          {
            required: false,
            trigger: "change",
            validator: validatorNotice
          }
        ],
        content: [
          {
            required: true,
            trigger: "change",
            validator: validateImg
          }
        ]

        // coverPic: [{ required:true, trigger: "change" }]
      }
    };
  },
  mounted() {
    GLOBALSIDESWITCH("false");
    if(this.$route.query.type !='add'){
      this.title = '编辑小程序活动'
    }
    this.getDetail();
  },
  methods: {
    selectChange(id){
      this.getDetailCmt(id);
    },
    getDetailCmt(id){
      this.$http.get('metting-active-detail-cmt',{
        communityId:id
      }).then((res)=>{
     
       this.formItem.address = res.data
      }).catch((error)=>{
        this.$Notice.error({
            title: error.message
          });
      })
    },
    getDetail() {
      let params = Object.assign(
        {},
        { activityId: this.$route.query.activityId }
      );
      if (this.$route.query.type == "add") {
        return;
      }
      this.loadding = false;
      this.$http
        .get("metting-active-detail", params)
        .then(res => {
          let data = Object.assign({}, res.data);
          console.log(data,"oooooo")
          data.coverPic = [{ id: 1, url: data.coverPic }];
          data.sharePic = [{ id: 1, url: data.sharePic }];
          data.sponsorLogo = [{ id: 1, url: data.sponsorLogo }];
          data.content = JSON.parse(data.content);
          data.partnerLogos = data.partnerLogos.map((item, index) => {
            return {
              id: index,
              url: item
            };
          });
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
          this.formItem = Object.assign({}, data);
          this.loadding = true;
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    },
    // 取消按钮提交
    cancel() {
       window.close();
    },
    //提交按钮
    submit() {
      let url =
        this.$route.query.type == "add"
          ? "metting-active-add"
          : "metting-active-edit";

      this.$refs["formItemDaily"].validate(valid => {
        if (valid) {
          let params = this.paramsChange(Object.assign({}, this.formItem));
          params.cmtId = params.communityId;
          this.$http
            .post(url, params)
            .then(res => {
              window.close();
              window.opener.location.reload();
            })
            .catch(error => {
              this.$Notice.error({
                title: error.message
              });
            });
        }
      });
    },
    paramsChange(params) {
      let obj = Object.assign({}, params);
      obj.coverPic = obj.coverPic[0].url;
      obj.sharePic = obj.sharePic[0].url;
      obj.content = obj.content.map((item, index) => {
        return {
          id: item.fileId,
          url: item.url
        };
      });
      obj.content = JSON.stringify(obj.content);

      obj.sponsorLogo = obj.sponsorLogo[0].url;

      obj.partnerLogos = obj.partnerLogos.map((item, index) => {
        return item.url;
      });

      obj.partnerLogos = obj.partnerLogos.join(",");

      obj.startMoment = obj.startMoment
        ? dateUtils.dateToStr("HH:mm:ss", new Date(obj.startMoment))
        : "00:00:00";

      obj.endMoment = obj.endMoment
        ? dateUtils.dateToStr("HH:mm:ss", new Date(obj.endMoment))
        : "00:00:00";

      obj.beginTime = obj.beginTime
        ? dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.beginTime)) +
          " " +
          obj.startMoment
        : "";

      obj.endTime = obj.endTime
        ? dateUtils.dateToStr("YYYY-MM-DD", new Date(obj.endTime)) +
          " " +
          obj.endMoment
        : "";
      return Object.assign({}, obj);
    }
  }
};
</script>

<style lang="less" scoped>
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