<template>
    <div class="kr-meeting-detail">
        <SectionTitle title="小程序活动详情"></SectionTitle>
        <div class="content-box">
            <div class="basic-info">
                <SectionTitle title="基本信息"></SectionTitle>
                <div class="basic-info-box">
                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">创建人</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">创建时间</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">最后编辑人</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>

                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">最后编辑时间</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                    </Row>
                    <Row>
                       <Col span="12">
                             <div style="padding:0 0 10px 0px;">活动状态</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                    </Row>
                  
                   
                </div>
            </div>

             <div class="basic-info order-info">
                <SectionTitle title="活动基本信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">活动封面图</div>
                            <KrImg :src="'https://krspace-upload-test-public.oss-cn-beijing.aliyuncs.com/invoice/upload/22335/2018/08/30/110921859m31Q3lk/活动-报名列表-日期显示不全.png'" :width="200" :height="100" type="cover"/>
                            
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">小程序活动分享图</div>
                            <KrImg :src="'https://krspace-upload-test-public.oss-cn-beijing.aliyuncs.com/invoice/upload/22335/2018/08/30/110921859m31Q3lk/活动-报名列表-日期显示不全.png'" :width="200" :height="160" type="cover"/>
                            
                        </Col>
                        
                    </Row>
                    <Row style="padding:10px 0 0 0">
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">活动名称</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                         <Col span="12">
                            <div style="padding:0 0 10px 0px;">最大人数限制</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">活动日期</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">活动时间</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">活动价格</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">排序号</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">活动所在社区</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">活动地点</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="19">
                            <div style="padding:0 0 10px 0px;">活动详细地址</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                    </Row>    
                    
                </div>
            </div>

            <div class="basic-info order-info">
                <SectionTitle title="主办方信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">主办方LOGO</div>
                            <KrImg 
                                
                                :src="'https://krspace-upload-test-public.oss-cn-beijing.aliyuncs.com/invoice/upload/22335/2018/08/30/110921859m31Q3lk/活动-报名列表-日期显示不全.png'" 
                                :width="100" 
                                :height="100" 
                                type="cover"
                            />
                        </Col>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">主办方名称</div>
                            <div>{{formItem.startDate}}</div>
                        </Col>
                        
                    </Row>

                    
                   
                </div>
            </div>

            <div class="basic-info order-info">
                <SectionTitle title="品牌合作方信息"></SectionTitle>
                <div class="basic-info-box">
                   <Row>
                        <Col span="12">
                            <div style="padding:0 0 10px 0px;">主办方LOGO</div>
                            <KrImg 
                                :style="{display:'inline-block',margin:'5px'}"
                                :src="'https://krspace-upload-test-public.oss-cn-beijing.aliyuncs.com/invoice/upload/22335/2018/08/30/110921859m31Q3lk/活动-报名列表-日期显示不全.png'" 
                                :width="100" 
                                :height="100" 
                                type="cover"
                            />
                            <KrImg 
                                :style="{display:'inline-block'}"
                                :src="'https://krspace-upload-test-public.oss-cn-beijing.aliyuncs.com/invoice/upload/22335/2018/08/30/110921859m31Q3lk/活动-报名列表-日期显示不全.png'" 
                                :width="100" 
                                :height="100" 
                                type="cover"
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
                            <div style="padding:0 0 10px 0px;">活动详情</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span="19">
                            <div style="padding:0 0 10px 0px;">活动须知</div>
                            <div style="padding:0 0 10px 0px;">{{formItem.startDate||'-'}}</div>
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
import KrSelect from "~/components/KrSelect"
import KrImg from '~/components/KrImg'

export default {
  components: {
    SectionTitle,
    KrUpload,
    KrSelect,
    KrImg
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