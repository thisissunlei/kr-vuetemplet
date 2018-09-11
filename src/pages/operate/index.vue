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
                  <DatePicker type="datetime" @on-change="changeBeginTime" show-week-numbers placeholder="开始日期" style="width: 200px"></DatePicker>
               <span style="padding: 0 10px;">至</span>    
                <DatePicker type="datetime" @on-change="changeEndTime" show-week-numbers placeholder="结束日期" style="width: 200px"></DatePicker>
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
               <Table :columns="columns1" :data="data1"
               border stripe></Table>
            </Col>
          </Row>
        </div>
    </template>
<script>
    export default {
        data(){
            return {
                cardTypeList:[{key:'普通卡',value:'1'},{key:'定制卡',value:'2'}],
                statusTypeList:[{key:'已激活',value:'ACTIVATION'},{key:'用完',value:'USED'},{key:'已过期',value:'EXPIRED'}],
                params:{
                    cardName:'',   // 团队卡名称
                    cardNo:'',     // 卡号
                    cardType:'',   // 卡类型 1.普通卡2.定制卡
                    startTime:'',  // 开始时间
                    endTime:'',    // 结束时间
                    status:''      // 状态
                },
                columns1: [
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
                                }, this.data1[params.index].cardNo)
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
                            if(this.data1[params.index].cardType==1){
                                curText = '普通卡'
                            }
                            if(this.data1[params.index].cardType==2){
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
                                [h('span', {
                                    style:'color:#00CEFF'
                                }, this.data1[params.index].thirdNick)
                            ]);
                        }
                    },{
                        title: '订单编号',
                        key: 'orderNo',
                        render: (h, params) => {
                            return h('div',
                                [h('span', {
                                    style:'color:#00CEFF'
                                }, this.data1[params.index].orderNo)
                            ]);
                        }
                    },{
                        title: '状态',
                        key: 'status',
                        render:(h,params)=>{
                            let curText = ''
                            if(this.data1[params.index].status=='ACTIVATION'){
                                curText = '已激活'
                            }
                            if(this.data1[params.index].status=='USED'){
                                curText = '已用完'
                            }
                            if(this.data1[params.index].status=='EXPIRED'){
                                curText = '已过期'
                            }
                            return h('div',
                                [h('span',{
                                },curText)
                            ]); 
                        }
                    }
                ],
                data1: []
            }
        },
        created(){
           this.$http.get("getKmTeamCardList").then((res)=>{
                if(res.code === 1){
                    this.data1 = res.data.items
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
        methods:{
            detail(index){
                this.$router.push({path:'/operateDetail',query:{id:this.data1[index].id}})
            }, 
            changeBeginTime(formatVal){
                this.params.startTime = formatVal
            },
            changeEndTime(formatVal){
                this.params.endTime = formatVal
            },
            search(){
                this.$http.get("getKmTeamCardList",this.params).then((res)=>{
                if( res.code === 1 ){
                    this.data1 = res.data.items
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
   .operate{
       min-width: 1100px;
   }
   .newBuild{
       background:#00CFFF;
       color:#fff;
   }
</style>
