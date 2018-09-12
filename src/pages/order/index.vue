    <template>
        <div style="padding:25px;" class="order">
          <Row style="margin-top:25px;">
            <Col span="7">
               <span style="margin-right:10px">订单编号</span><Input v-model="params.orderNo" placeholder=" 请输入订单编号" size="large" style="width: 200px"></Input>
            </Col>
            <Col span="7">
                <span style="margin-right:10px">订单金额</span>
                <Input v-model="params.preAmount" size="large" style="width:75px"></Input>
                <span style="padding: 0 20px;">~</span>
                <Input v-model="params.endAmount" size="large" style="width:75px"></Input>
            </Col>
            <Col span="7">
                <span style="margin-right:10px">商品类型</span>    
                    <Select  v-model="params.cardType" size="large" style="width:200px;" placeholder="请选择商品类型">
                        <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">{{ item.key }}</Option>
                    </Select>
            </Col>
            <Col span="3">
                <Button @click="clearParams">清除</Button>
            </Col>
          </Row>
          <Row style="margin-top:25px;">
            <Col span="14">
               <span style="margin-right:10px">支付时间</span>
               <DatePicker type="date" @on-change="changeBeginTime" show-week-numbers placeholder="开始日期" style="width: 200px"></DatePicker>
               <span style="padding: 0 10px;">至</span>
               <DatePicker type="date" @on-change="changeEndTime" show-week-numbers placeholder="结束日期" style="width: 200px"></DatePicker>
            </Col>
            <Col span="7">
                <span style="margin-right:10px">卡&#12288;&#12288;号</span>
                <Input v-model="params.cardNum" placeholder="请输入卡号" size="large" style="width:200px"></Input>
            </Col>
            <Col span="3">
                <Button  @click="search">搜索</Button>
            </Col>
          </Row>
          <Row style="margin-top:25px;">
            <Col span="24">
               <Table :columns="columns1" :data="data1"
               border stripe></Table>
            </Col>
          </Row>
          <Row style="margin-top:25px;">
              <Col span="24">
                <Page  @on-change="changePage"  :page-size="15" :current="params.page" :total="totalCount" show-total></Page>
              </Col>
          </Row>
        </div>
    </template>
<script>
    export default {
        data () {
            return {
                cardTypeList:[{key:'普通卡',value:'NORMAL'},{key:'定制卡',value:'CUSTOM'}],
                totalCount:0,
                params:{
                  beginTime:'',  // 支付开始时间
                  cardNum:'',    // 卡号
                  cardType:'',   // 类型
                  endAmount:'',  // 结束订单金额
                  endTime:'',    // 支付结束时间
                  orderNo:'',    // 订单编号
                  page:1,       // 
                  pageSize:15,   //
                  preAmount:''   //开始订单金额
                },
                columns1: [
                    {
                        title: '订单编号',
                        key: 'orderNo',
                        render: (h, params) => {
                            return h('div',
                                [h('a', {
                                    style:'color:#009DD6',
                                    on: {
                                        click: () => {
                                            this.detail(params.index)
                                        }
                                    }
                                }, this.data1[params.index].orderNo)
                            ]);
                        }
                    },
                    {
                        title: '订单金额',
                        key: 'cost'
                    },{
                        title: '商品类型',
                        key: 'cardType',
                        render:(h,params)=>{
                            let curText = ''
                            if(this.data1[params.index].cardType=='NORMAL'){
                                curText = '普通卡'
                            }
                            if(this.data1[params.index].cardType=='CUSTOM'){
                                curText = '定制卡'
                            }
                            return h('div',
                                [h('span',{
                                },curText)
                            ]); 
                        }
                    },{
                        title: '卡号',
                        key: 'cardNo'
                    },{
                        title: '名称',
                        key: 'cardName'
                    },{
                        title: '面额',
                        key: 'amount'
                    },{
                        title: '下单人',
                        key: 'thirdNick',
                        render: (h, params) => {
                            return h('div',
                                [h('a', {
                                    on: {
                                        click: () => {
                                            this.memberDetails(params.index)
                                        }
                                    }
                                }, this.data1[params.index].thirdNick)
                            ]);
                        }
                    },{
                        title: '支付时间',
                        key: 'payTime'
                    }
                ],
                data1: []
            }
        },
        created(){
            this.$http.get("getKmTeamOrderList",this.params).then((res)=>{
                if( res.code === 1 ){
                    this.data1 = res.data.items
                    this.totalCount = res.data.totalCount
                    this.params.page = res.data.page
                   } else {
                        this.$Notice.error({
                        title:res.message
                   });
                }}).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    }) 
        },
        methods:{
            memberDetails(index){
                // window.open("http://optest02.krspace.cn/new/#/member/memberManage/list/"+this.data1[index].uid); 
                window.open("/new/#/member/memberManage/list/"+this.data1[index].uid); 
             },
            changePage(pageNum){
                        this.params.page = pageNum
                        this.$http.get("getKmTeamOrderList",this.params).then((res)=>{
                        if( res.code === 1 ){
                            this.data1 = res.data.items
                            this.totalCount = res.data.totalCount
                            this.params.page = res.data.page
                        } else {
                                this.$Notice.error({
                                title:res.message
                        });
                        }
                    }).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    })
            },
            detail(index){
                //this.$router.push({path:'/settingDetail',query:{id:this.data1[index].id}})
                // window.open(window.location.origin+"/#/orderDetail?id="+this.data1[index].id); 
                 window.open("/#/orderDetail?id="+this.data1[index].id); 
            },
            changeBeginTime(formatVal){
                this.params.beginTime = formatVal
            },
            changeEndTime(formatVal){
                this.params.endTime = formatVal
            },
            search(){
                this.$http.get("getKmTeamOrderList",this.params).then((res)=>{
                if( res.code === 1 ){
                    this.data1 = res.data.items
                    this.totalCount = res.data.totalCount
                    this.params.page = res.data.page
                   } else {
                        this.$Notice.error({
                        title:res.message
                   });
                }}).catch((error)=>{
                        this.$Notice.error({
                            title:error.message
                        });
                    }) 
            },
            clearParams(){
                Object.keys(this.params).forEach((key)=>{
                    this.params[key] = ''
                })
            }
        }
    }
</script>
<style lang="less" scoped>
   .order{
       min-width:1100px; 
   }
   .newBuild{
       background:#00CFFF;
       color:#fff;
    //   border: 1px black solid;
   }
</style>
