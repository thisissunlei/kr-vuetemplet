<template>
    <div class="kr-meeting-detail">
        <SectionTitle title="散座订单详情"></SectionTitle>
        <div class="content-box">
            <Form ref="formItemDaily"  :model="formItem" :rules="ruleDaily" label-position="top">
            <div class="basic-info">
                <SectionTitle title="基本信息"></SectionTitle>
                <div class="basic-info-box">
                    <Row>
                        <Col span="12">
                            <Form-item
                                label="所在社区" 
                                prop="startDate"
                                :inline="false"
                            >
                                <KrUpload 
                                    type="only" 
                                    :file="files"
                                    height="100"
                                    width="200"
                                    placeholder=""
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
                                />
                            
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form-item
                                label="小程序分享封面图" 
                                prop="startDate"
                                :inline="false"
                                style="width:253px;"
                            >
                                <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
                            
                            </Form-item>
                        </Col>

                        <Col span="12">
                            <Form-item
                                label="小程序分享封面图" 
                                prop="startDate"
                                :inline="false"
                            >
                                <InputNumber :max="10" :min="1" v-model="formItem.number"></InputNumber>
                            
                            </Form-item>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span="12">
                            <div style="padding-bottom:10px;"> 活动时间</div>
                            <Form-item 
                            
                                style="display:inline-block;" 
                                prop="startDate"
                                
                            >
                                <DatePicker 
                                    v-model="formItem.startDate" 
                                    placeholder="请输入开始日期"
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
                                    placeholder="请输入结束日期"
                                    style="width:130px;"
                                />
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <div style="padding-bottom:10px;"> 活动时间</div>
                            <Form-item 
                            
                                style="display:inline-block;" 
                                prop="startDate"
                                
                            >
                                <DatePicker 
                                    v-model="formItem.startDate" 
                                    placeholder="请输入开始日期"
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
                                    placeholder="请输入结束日期"
                                    style="width:130px;"
                                />
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form-item 
                                label="小程序分享封面图" 
                                prop="endDate" 
                                style="display:inline-block;width:253px;"
                            >
                                <KrSelect 
                                    v-model="formItem.startDate" 
                                />
                            </Form-item>
                        </Col>
                         <Col span="12">
                            <Form-item 
                                label="小程序分享封面图" 
                                prop="endDate" 
                                style="display:inline-block;width:253px;"
                            >
                                <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
                            </Form-item>
                        </Col>
                    </Row>

                    <Row>
                       <Col span="12">
                            <Form-item 
                                label="小程序分享封面图" 
                                prop="endDate" 
                                style="display:inline-block;width:253px;"
                            >
                                <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
                            </Form-item>
                        </Col>
                         <Col span="12">
                        </Col>
                    </Row>
                  
                   
                </div>
            </div>
            <div class="basic-info order-info">
                <SectionTitle title="预订信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="12">
                            <Form-item
                                label="所在社区" 
                                prop="startDate"
                                :inline="false"
                            >
                                <KrUpload 
                                    type="only" 
                                    :file="files"
                                    height="100"
                                    width="100"
                                    placeholder=""
                                />
                            
                            </Form-item>
                        </Col>
                        
                    </Row>
                </div>
            </div>

            <div class="basic-info order-info">
                <SectionTitle title="预订信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="19">
                            <Form-item
                                label="所在社区" 
                                prop="startDate"
                                :inline="false"
                            >
                                <KrEditor
                                    type="only" 
                                    :file="files"
                                
                                    placeholder=""
                                />
                            
                            </Form-item>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span="19">
                            <Form-item
                                label="所在社区" 
                                prop="startDate"
                                :inline="false"
                            >
                               <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
                            
                            </Form-item>
                        </Col>
                        
                    </Row>
                </div>
            </div>
            <div class="basic-info order-money-info" v-if="!!info.details && info.details.length > 0">
                <SectionTitle title="订单金额明细"></SectionTitle>
                <div class="basic-info-box">
                    <Table border :columns="tilteAndStyle" :data="info.details"></Table>
                    <ul>
                        <li>商品总价：</li>
                        <!--<li>{{totalPrice}}</li>-->
                        <li>{{info.orderPromotionTotalDecimal || '-'}}</li>
                    </ul>
                    <!--<ul>-->
                        <!--<li>使用的优惠策略：</li>-->
                        <!--<li>300</li>-->
                    <!--</ul>-->
                    <ul>
                        <li>订单金额：</li>
                        <!--<li>{{totalAmountDecimal}}</li>-->
                        <li>{{info.realCost}}</li>
                    </ul>
                </div>
            </div>

            <div class="basic-info order-money-info" v-if="refund.length > 0">
                <SectionTitle title="退款信息"></SectionTitle>
                <div class="basic-info-box">
                    <Table border :columns="tilteRefund" :data="refund"></Table>
                </div>
            </div>
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
.list-li .head-img {
  display: inline-block;
  width: 110px;
  height: 110px;
  border-radius: 70px;
}
.list-li .person-name {
  display: inline-block;
  text-align: center;
  width: 110px;
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
}
.meeting-person-info {
  background: #f6f6f6;
  margin-top: 20px;
  border-radius: 6px;
  padding-bottom: 20px;
}
.arrival-list-box h1 {
  font-size: 20px;
  font-weight: 500;
  color: #5f5959;
  padding: 10px 0 10px 25px;
}
.first-ul {
  border-bottom: 1px dashed #e9e9e9;
}
.kr-meeting-detail {
  padding-bottom: 20px;
}
.final-cost {
  color: red;
}
.content-box dl.seat-order-wech {
  height: 60px;
  line-height: 60px;
  img,
  span {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    border-radius: 30px;
    height: 60px;
    width: 60px;
  }
  span {
    padding-left: 20px;
  }
}
</style>