<template>
    <div class="kr-meeting-detail">
        <SectionTitle title="新建小程序活动"></SectionTitle>
        <div class="content-box">
            <Form ref="formItemDaily"  :model="formItem" :rules="ruleDaily" label-position="top">
            <div class="basic-info">
                <SectionTitle title="基本信息"></SectionTitle>
                <div class="basic-info-box">
                    <Row>
                        <Col span="12">
                            <Form-item
                                label="活动封面图" 
                                prop="startDate"
                                :inline="false"
                            >
                                <KrUpload 
                                    type="only" 
                                    :file="files"
                                    height="100"
                                    width="200"
                                    placeholder="图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为2:1"
                                />
                            
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <Form-item
                                
                                label="小程序分享封面图" 
                                prop="startDate"
                                :inline="false"
                            >
                                <KrUpload 
                                    type="only" 
                                    :file="files"
                                    width="200"
                                    height="160"
                                    placeholder="图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为5:4"
                                />
                            
                            </Form-item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span="12">
                            <Form-item
                                label="活动名称" 
                                prop="startDate"
                                :inline="false"
                                style="width:300px;"
                               
                            >
                                <Input 
                                    v-model="formItem.textarea" 
                                    type="textarea" 
                                    :autosize="{minRows: 2,maxRows: 5}" 
                                    placeholder="40个字以内"/>
                            
                            </Form-item>
                        </Col>

                        <Col span="12">
                            <Form-item
                                label="小程序分享封面图" 
                                prop="startDate"
                                :inline="false"
                                 placeholder="40个字以内"
                            >
                                <InputNumber  
                                    :min="1" 
                                    v-model="formItem.number"
                                    placeholder="正整数"
                                />
                            
                            </Form-item>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span="12">
                            <div style="padding-bottom:10px;"> 活动日期</div>
                            <Form-item 
                            
                                style="display:inline-block;" 
                                prop="startDate"
                                
                            >
                                <DatePicker 
                                    v-model="formItem.startDate" 
                                    placeholder="开始日期"
                                    style="width:130px;"
                                    
                                />
                            </Form-item>
                            <span style="display:inline-block;padding:0 10px;line-height:30px;">至</span>
                            <Form-item 
                                prop="endDate" 
                                style="display:inline-block;"
                            >
                                <DatePicker 
                                    v-model="formItem.endDate" 
                                    placeholder="结束日期"
                                    style="width:130px;"
                                />
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <div style="padding-bottom:10px;">活动时间</div>
                            <Form-item 
                                style="display:inline-block;" 
                                prop="startDate"
                                
                            >
                                <TimePicker  v-model="formItem.endDate"  format="HH:mm" placeholder="开始时间" style="width:130px;" />
                            </Form-item>
                            <span style="display:inline-block;padding:0 10px;line-height:30px;">至</span>
                            <Form-item 
                                prop="endDate" 
                                style="display:inline-block;"
                            >
                                 <TimePicker  v-model="formItem.endDate"  format="HH:mm" placeholder="结束时间" style="width:130px;" />
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form-item 
                                label="活动价格" 
                                prop="endDate" 
                                style="display:inline-block;width:300px;"
                            >
                                <Radio v-model="single">免费</Radio>
                            </Form-item>
                        </Col>
                         <Col span="12">
                            <Form-item 
                                label="排序号" 
                                prop="endDate" 
                                style="display:inline-block;width:300px;"
                            >
                                <InputNumber  
                                    :min="1" 
                                    v-model="formItem.number"
                                    placeholder="数字越大越靠前"
                                />
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form-item 
                                label="活动所在社区" 
                                prop="endDate" 
                                style="display:inline-block;width:300px;"
                            >
                                <KrSelect 
                                    v-model="formItem.startDate" 
                                    placeholder="请选择"
                                />
                            </Form-item>
                        </Col>
                         <Col span="12">
                            <Form-item 
                                label="活动地点" 
                                prop="endDate" 
                                style="display:inline-block;width:300px;"
                            >
                                <Input 
                                    v-model="formItem.textarea" 
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
                                prop="endDate" 
                                style="display:inline-block;width:300px;"
                            >
                                <Input 
                                    v-model="formItem.textarea" 
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
                                prop="startDate"
                                :inline="false"
                            >
                                <KrUpload 
                                    type="only" 
                                    :file="files"
                                    height="100"
                                    width="100"
                                    placeholder="图片小于300KB，格式为JPG，PNG，GIF，建议图片比例为1:1"
                                />
                            
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <Form-item
                                label="主办方LOGO" 
                                prop="startDate"
                                :inline="false"
                            >
                                <Input 
                                    v-model="formItem.textarea" 
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
                                prop="startDate"
                                :inline="false"
                            >
                                <Input 
                                    v-model="formItem.textarea" 
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
                                prop="startDate"
                                :inline="false"
                            >
                                <KrUpload 
                                    type="only" 
                                    :file="files"
                                    height="100"
                                    width="100"
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
                                prop="startDate"
                                :inline="false"
                            >
                                <KrEditor
                                    type="only" 
                                    :file="files"
                                />
                            
                            </Form-item>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span="19">
                            <Form-item
                                label="活动须知" 
                                prop="startDate"
                                :inline="false"
                            >
                               <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="活动须知，400个字符以内"/>
                            
                            </Form-item>
                        </Col>
                        
                    </Row>
                </div>
            </div>
          

            <Row>
                <Col span="19" style="text-align: center;margin:30px 0px 0px 0px;">
                    <FormItem>
                        <Button type="primary">Submit</Button>
                        <Button type="ghost" style="margin-left: 8px">Cancel</Button>
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
import KrSelect from "~/components/KrSelect"
import KrEditor from '~/components/KrEditor'

export default {
  components: {
    SectionTitle,
    KrUpload,
    KrSelect,
    KrEditor
  },
  data() {
    return {
        files:[
            {id:1,url:'https://krspace-upload-test-public.oss-cn-beijing.aliyuncs.com/invoice/upload/22335/2018/08/30/110921859m31Q3lk/活动-报名列表-日期显示不全.png'}
        ],
        formItem:{},
        ruleDaily:{},
        info: {},
        meetingStatusOptions: [],
        tilteAndStyle: [
        {
          title: "预订日期",
          key: "enableDate",
          align: "center",
          render(tag, params) {
            let time = dateUtils.dateToStr(
              "YYYY-MM-DD",
              new Date(params.row.enableDate)
            );
            return time;
          }
        },
        {
          title: "游客价（￥/个·天）",
          key: "priceDecimal",
          align: "center"
        },
        {
          title: "优惠价（￥/个·天）",
          key: "promotionPriceDecimal",
          align: "center"
        },
        {
          title: "预订数量（个）",
          key: "quantity",
          align: "center"
        },
        {
          title: "金额（￥）",
          key: "totalAmountDecimal",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  //                   style: {
                  //                     color: 'red',
                  //                     fontSize : "20px",
                  //                   },
                },
                this.setPrice(params.row)
              )
            ]);
          }
        }
      ],
      refund: [],
      tilteRefund: [
        {
          title: "退款操作人",
          key: "id",
          align: "center"
        },
        {
          title: "操作时间",
          key: "id",
          align: "center"
        },
        {
          title: "退款说明",
          key: "id",
          align: "center"
        },
        {
          title: "退款金额（￥）",
          key: "id",
          align: "center"
        }
      ],

      alertTimeOptions: [
        {
          label: "不提醒",
          value: "NOALERT"
        },
        {
          label: "会议开始前5分钟",
          value: "FIVE"
        },
        {
          label: "会议开始前15分钟",
          value: "FIFTEEN"
        }
      ],
      totalPrice: 0,
      totalAmountDecimal: 0
    };
  },

  mounted() {
    GLOBALSIDESWITCH("false");
    //    this.getkrmeetingStatus();
    //    this.getDetailInfo();
  },
  methods: {
    goToMember(id) {
      return;
      window.open(`/new/#/member/memberManage/list/${id}`, "_blank");
    },
    getDetailInfo() {
      return;
      let _this = this;
      var params = { id: this.$route.query.orderId };
      this.$http
        .get("get-kr-o-view", params)
        .then(res => {
          this.info = res.data;
          let totalPrice = 0;
          let totalAmountDecimal = 0;
          if (!!this.info.details && this.info.details.length > 0) {
            this.info.details.forEach((val, i) => {
              totalPrice += Number(val.priceDecimal) * Number(val.quantity);
              totalAmountDecimal +=
                Number(val.promotionPriceDecimal) * Number(val.quantity);
            });
            this.totalPrice = totalPrice;
            this.totalAmountDecimal = totalAmountDecimal;
          }
        })
        .catch(err => {
          this.$Notice.error({
            title: err.message
          });
        });
    },
    returnMeetingStatus(param) {
      let _this = this;
      for (var i = 0; i < _this.meetingStatusOptions.length; i++) {
        if (param == _this.meetingStatusOptions[i].name) {
          return _this.meetingStatusOptions[i].desc;
        }
      }
    },
    returnCtime(param) {
      var ctimeParse =
        (param &&
          dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(param))) ||
        "-";
      return ctimeParse;
    },
    getkrmeetingStatus() {
      this.$http
        .get("getkrmeetingstatus", "")
        .then(res => {
          var resultItems = res.data.status;
          this.meetingStatusOptions = resultItems;
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    },
    setPrice(row) {
      let price = Number(row.promotionPriceDecimal) * Number(row.quantity);
      return price.toString();
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