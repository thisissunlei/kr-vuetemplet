    <template>
        <div style="padding:25px;" class="operate">
          <Row style="margin-top:25px;">
            <Col span="7">
               <span style="margin-right:10px">卡&#12288;&#12288;号</span>
               <Input v-model="params.cardNo" placeholder=" 请输入卡号" size="large" style="width: 200px"></Input>
            </Col>
            <Col span="7">
               <span style="margin-right:10px">卡&#12288;&#12288;名</span>
               <Input v-model="params.cardName" placeholder=" 请输入卡名" size="large" style="width: 200px"></Input>
            </Col>
            <Col span="7">
                <span style="margin-right:10px">类&#12288;&#12288;型</span>
                    <Select  v-model="params.cardType" style="width:200px" clearable placeholder="请输选择商品类型" size="large">
                        <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">{{item.key}}</Option>
                    </Select>
            </Col>
            <Col span="3">
                <Button @click="clearParams">清除</Button>
            </Col>
          </Row>
          <Row style="margin-top:25px;">
            <Col span="14">
               <span style="margin-right:10px">购买时间</span>
                  <DatePicker  type="date" @on-change="changeBeginTime" show-week-numbers placeholder="开始日期" style="width: 200px"></DatePicker>
               <span style="padding: 0 10px;">至</span>    
                  <DatePicker  type="date" @on-change="changeEndTime" show-week-numbers placeholder="结束日期" style="width: 200px"></DatePicker>
            </Col>
            <Col span="7">
                <span style="margin-right:10px">状&#12288;&#12288;态</span>
                <Select v-model="params.status" style="width:200px" clearable placeholder="请选择状态" size="large">
                    <Option v-for="item in statusTypeList" :value="item.value" :key="item.value">{{item.key}}</Option>
                </Select>
            </Col>
            <Col span="3" >
                <Button @click="search">搜索</Button>
            </Col>
          </Row>
          <Row style="margin-top:25px;">
            <Col span="24">
               <Table :columns="columns" :data="data"
               border stripe></Table>
            </Col>
          </Row>
          <Row style="margin-top:25px;">
               <Page  :total="totalCount" :current="params.page" show-total :page-size="15" @on-change="pageChange"></Page>
          </Row>
        </div>
    </template>
<script>
    export default {
        data(){
            return {
                totalCount:0,
                page:1,
                cardTypeList:[{key:'普通卡',value:'1'},{key:'定制卡',value:'2'}],
                statusTypeList:[{key:'已激活',value:'ACTIVATION'},{key:'用完',value:'USED'},{key:'已过期',value:'EXPIRED'}],
                saveParams:{
                    cardName:'',   // 团队卡名称
                    cardNo:'',     // 卡号
                    cardType:'',   // 卡类型 1.普通卡2.定制卡
                    startTime:'',  // 开始时间
                    endTime:'',    // 结束时间
                    status:'',      // 状态
                    page:1,
                    pageSize:15
                },
                params:{
                    cardName:'',   // 团队卡名称
                    cardNo:'',     // 卡号
                    cardType:'',   // 卡类型 1.普通卡2.定制卡
                    startTime:'',  // 开始时间
                    endTime:'',    // 结束时间
                    status:'',      // 状态
                    page:1,
                    pageSize:15
                },
                columns: [
                    {
                        title: '卡号',
                        key: 'cardNo',
                         render: (h, params) => {
                            return h('div',
                                [h('a', {
                                    style:'color:#009DD6',
                                    on: {
                                        click: () => {
                                            this.detail(params.index)
                                        }
                                    }
                                }, this.data[params.index].cardNo)
                            ]);
                        }
                    },{
                        title: '卡名',
                        key: 'cardName'
                    },{
                        title: '类型',
                        key: 'cardType',
                        render:(h,params)=>{
                            let curText = ''
                            if(this.data[params.index].cardType==1){
                                curText = '普通卡'
                            }
                            if(this.data[params.index].cardType==2){
                                curText = '定制卡'
                            }
                            return h('div',
                                [h('span',{
                                },curText)
                            ]); 
                        }
                    },{
                        title: '面额',
                        key: 'faceValue'
                    },{
                        title: '已使用金额',
                        key: 'usedAmount'
                    },{
                        title: '剩余金额',
                        key: 'remainAmount'
                    },{
                        title: '有效期限',
                        key: 'limitDateStr'
                    },{
                        title: '购买时间',
                        key: 'payTime'
                    },{
                        title: '当前使用人数',
                        key: 'count'
                    },{
                        title: '下单人',
                        key: 'thirdNick',
                        render: (h, params) => {
                            return h('div',
                                [h('a', {
                                   style:'color:#00CEFF',
                                   on:{
                                       click: () => {
                                            this.memberDetails(params.index)
                                        }
                                   }
                                }, this.data[params.index].thirdNick)
                            ]);
                        }
                    },{
                        title: '订单编号',
                        key: 'orderNo',
                        render: (h, params) => {
                            return h('div',
                                [h('a', {
                                    style:'color:#00CEFF',
                                     on:{
                                       click: () => {
                                            this.orderDetail(params.index)
                                        }
                                   }
                                }, this.data[params.index].orderNo)
                            ]);
                        }
                    },{
                        title: '状态',
                        key: 'status',
                        render:(h,params)=>{
                            let curText = ''
                            if(this.data[params.index].status=='ACTIVATION'){
                                curText = '已激活'
                            }
                            if(this.data[params.index].status=='USED'){
                                curText = '已用完'
                            }
                            if(this.data[params.index].status=='EXPIRED'){
                                curText = '已过期'
                            }
                            return h('div',
                                [h('span',{
                                },curText)
                            ]); 
                        }
                    }
                ],
                data: []
            }
        },
        created(){
            // 请求团队卡分页
           this.$http.get("getKmTeamCardList",this.params).then((res)=>{
                if(res.code === 1){
                    this.data = res.data.items
                    this.totalCount = res.data.totalCount
                    this.page = res.data.page
                   }else{
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
        mounted(){
            document.title = '团队卡运营-氪空间后台管理系统'
        },
        methods:{
            // 跳转 会员详情
            memberDetails(index){
                window.open("/new/#/member/memberManage/list/"+this.data[index].owner); 
             },
             //  页码切换
            pageChange(pageNo){
                this.saveParams.page = pageNo
                this.$http.get("getKmTeamCardList",this.saveParams).then((res)=>{
                if( res.code === 1 ){
                    this.data = res.data.items
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
            //  跳转  订单详情
            orderDetail(index){
                 window.open("/admin-applet/#/orderDetail?id="+this.data[index].orderId); 
            },
            //  跳转 团队卡详情
            detail(index){
                 window.open("/admin-applet/#/operateDetail?id="+this.data[index].id); 
            },
            changeBeginTime(formatVal){
                this.params.startTime = formatVal
            },
            changeEndTime(formatVal){
                this.params.endTime = formatVal
            },
            //  条件查询
            search(){
                this.params.page = 1;
                this.saveParams =  JSON.parse(JSON.stringify(this.params)) 
                this.$http.get("getKmTeamCardList",this.params).then((res)=>{
                if( res.code === 1 ){
                    this.data = res.data.items
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
                    if(key == 'page'|| key =='startTime'||key == 'endTime'){

                        }else{

                        this.params[key] = ''
                        
                        }
                })
                Object.keys(this.saveParams).forEach((key)=>{
                    if(key == 'page'|| key =='startTime'||key == 'endTime'){
                        }else{
                        this.saveParams[key] = ''        
                        }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
   .operate{
       min-width: 1100px;
   }
   .newBuild{
       background:#00CFFF;
       color:#fff;
   }
</style>
