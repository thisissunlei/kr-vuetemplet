<template>
        <div style="min-width:1100px;padding:10px 20px;">
            <div style="border-bottom:1px solid #f2f2f2;padding: 10px 0;">
               <h2>团队卡详情</h2>
            </div>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <span>卡号：{{info.cardNo}}</span>
                    </Col>
                    <Col span="12">
                    <span>状态：{{info.cStatus|fcStatus}}</span>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <span >卡名：{{info.cardName}}</span>
                    </Col>
                    <Col span="12">
                    <span >类型：{{info.cardType|fcardType}}</span>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <span >面值：{{info.faceCost}}</span>
                    </Col>
                    <Col span="12">
                    <span >余额：</span> <span style="color:red">{{info.remainCost}}</span>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                       使用期限：{{info.limitTime}}
                    </Col>
                    <Col span="12">
                       用卡人上限：{{info.limitCount}}
                    </Col>
                </Row>  
                <Row style="margin-top:20px;">
                    <Col span="24" style="display:flex;">
                        <div><span>使用须知：</span></div> 
                        <div>
                            <ul>
                                <li>{{info.cardIntro}}</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <div style="cursor:pointer" @click="memberDetails">
                        <span>购卡人：</span><Avatar :src="headPhoto" />
                        <span style="color:#00CCFF;">{{leader}}</span> 
                    </div>
                      
                    </Col>
                    <Col span="12">
                       <span>购卡订单：</span> <span style="color:#00CCFF;cursor:pointer;" @click="orderDetail">{{info.orderNo}}</span> 
                    </Col>
                </Row>  
                <Row style="margin-top:20px;">
                    <Col span="12">
                       <span>购买时间：{{info.buyTime}}</span> 
                    </Col>
                    <Col span="12">
                    </Col>
                </Row>
                <div style="border-bottom:1px solid #f2f2f2;padding: 10px 0;">
                    <h2>用卡人详情</h2>
                </div>
                <Row style="margin-top:20px;">
                    <Col span="12">
                        当前用卡人数：{{info.count}}5人
                    </Col>
                    <Col span="12">
                    </Col>
                </Row>
                <Row style="margin-top:25px;">
                    <Col span="24">
                       <Table :columns="columns1" :data="info.holderList" border stripe></Table>
                    </Col>
                </Row>
                <div style="border-bottom:1px solid #f2f2f2;padding: 10px 0;">
                    <h2>消费详情</h2>
                </div>
                <Row style="margin-top:20px;">
                    <Col span="12">
                        团队卡余额：{{info.remainCost}}
                    </Col>
                    <Col span="12">
                        已消费金额：{{info.usedAmount}}
                    </Col>
                </Row>
                <Row style="margin-top:25px;">
                    <Col span="24">
                       <Table :columns="columns2" :data="info.usedList" border stripe></Table>
                    </Col>
                </Row>
        </div>
</template>
<script>
    export default {
        data(){
            return {
                info: {},
                headPhoto:'',
                data1: [],
                leader:'',
                 columns1: [
                    {
                        title: '微信ID',
                        key: 'thirdUid'
                    },
                    {
                        title: '微信昵称',
                        key: 'nickName'
                    },
                    {
                        title: '手机号码',
                        key: 'phone'
                    },
                    {
                        title: '加入时间',
                        key: 'ctime',
                        render: (h, params) => {
                            let curTime = this.formatDateTime(this.info.holderList[params.index].ctime)
                            return h('div',
                                [
                                h('span',{
                                }, curTime ),
                            ]);
                        }
                    }
                ],
                columns2: [
                    {
                        title: '订单编号',
                        key: 'orderNo'
                    },
                    {
                        title: '商品信息',
                        key: 'descr'
                    },
                    {
                        title: '消费金额',
                        key: 'amount',
                        render: (h, params) => {
                            let curStr = String(this.info.usedList[params.index].amount);
                            let curStrLength = curStr.length;
                            let newStr1 = curStr.substr(0,curStrLength-2);
                             let newStr2 = curStr.substr(curStrLength-2,curStrLength);
                            return h('div',
                                [
                                h('span',{
                                }, newStr1+"."+newStr2),
                            ]);
                        }
                    },
                    {
                        title: '消费时间',
                        key: 'ctime',
                        render: (h, params) => {
                            let curTime = this.formatDateTime(this.info.usedList[params.index].ctime)
                            return h('div',
                                [
                                h('span',{
                                }, curTime ),
                            ]);
                        }
                    },
                    {
                        title: '使用人',
                        key: 'nickName',
                        render: (h, params) => {
                            return h('div',
                                [h('Avatar', {
                                    props: {
                                       src:this.info.usedList[params.index].avatarUrl
                                    },
                                }, ),
                                h('span', {
                                }, this.info.usedList[params.index].nickName)
                            ]);
                        }
                    }
                ],
                data2: []
            }
        },
        mounted(){
            document.title = '运营详情查看-氪空间后台管理系统'
            GLOBALSIDESWITCH("false");
        },
        created(){
            this.$http.get("getKmTeamCardDetails",{saleId:this.$route.query.id}).then((res)=>{
                if(res.code === 1){
                        this.info = res.data
                        this.info.holderList.map((item)=>{
                            if(item.leader){
                                this.leader = item.nickName;
                                this.headPhoto = item.avatarUrl;
                                this.uid = item.uid;
                                }

                        });
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
        filters:{
            fcStatus(val){
                let cur = val
                if(val == 'ACTIVATION'){ cur = '已激活' }
                if(val == 'USED'){ cur = '已用完' }
                if(val == 'EXPIRED'){ cur = '已过期' }
                return cur
            },
            fcardType(val){
                let cur = val
                if(val == 'NORMAL'){ cur = '普通卡' }
                if(val == 'CUSTOM'){ cur = '定制卡' }
                return cur
            }
        },
        methods: {  
            orderDetail(){
                window.open("/admin-applet/#/orderDetail?id="+this.info.orderId); 
            },
             memberDetails(){
                 window.open("/new/#/member/memberManage/list/"+this.uid); 
             },
            formatDateTime(inputTime) {  
                let date = new Date(inputTime);
                let y = date.getFullYear();  
                let m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                let d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                let second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;  
                second = second < 10 ? ('0' + second) : second; 
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
            }
        }
    }
</script>
