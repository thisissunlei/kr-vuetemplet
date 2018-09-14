<template>
        <div style="min-width:1100px;padding:10px 20px;">
            <div style="border-bottom:1px solid #f2f2f2;padding: 10px 0;">
               <h2>订单概况</h2>
            </div>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <span>订单编号：{{info.orderNo}}</span>
                    </Col>
                    <Col span="12">
                    <span>下单时间：{{info.payTime|fctime}}</span>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <span >订单金额：</span><span style="color:red;">{{info.cost}}</span>
                    </Col>
                    <Col span="12">
                    <span >微  信  ID：{{info.thirdUid}}</span>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <span >微信昵称：</span><span  @click="memberDetails" style="color:#00CCFF;cursor:pointer;">{{info.thirdNick}}</span>
                    </Col>
                    <Col span="12">
                    <span >手机号码：{{info.phone}}</span>
                    </Col>
                </Row>
                <div style="border-bottom:1px solid #f2f2f2;padding: 10px 0;">
                   <h2>支付方式</h2>
                </div>
                <Row style="margin-top:20px;">
                    <Col span="12">
                        支付方式：{{info.payWay|fpayWay}}
                    </Col>
                    <Col span="12">
                        支付时间：{{info.payTime|fctime}}
                    </Col>
                </Row>  
                <Row style="margin-top:20px;">
                    <Col span="12">
                       <span>实付金额：</span> <span style="color:red;">￥{{info.cost}}</span> 
                    </Col>
                    <Col span="12">
                       <span>支付账号：{{info.openId}}</span>  
                    </Col>
                </Row>
                <div style="border-bottom:1px solid #f2f2f2;padding: 10px 0;">
                   <h2>团队卡信息</h2>
                </div>
                <Row style="margin-top:20px;">
                    <Col span="12">
                       <span >商品编号：</span> <span @click="goodDetail" style="color:#00CCFF;cursor:pointer;">{{info.cardNo}}</span> 
                    </Col>
                    <Col span="12">
                        商品类型：{{info.cardType|fcardType}}
                    </Col>
                </Row>  
                <Row style="margin-top:20px;">
                    <Col span="12">
                       <span >卡号：</span> <span @click="operateDetail" style="color:#00CCFF;cursor:pointer;">{{info.cardNum}}</span> 
                    </Col>
                    <Col span="12">
                        团队卡名称：{{info.teamName}}
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                        面值：{{info.faceValue}}
                    </Col>
                    <Col span="12">
                        销售价：{{info.salePrice}}
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                        使用期限：{{info.limitDate}}
                    </Col>
                    <Col span="12">
                        
                    </Col>
                </Row>
                
        </div>
</template>
<script>
    export default {
        data(){
            return {
               info:{}
            }
        },
        //  文本格式过滤
         filters:{
            fpayWay(val){
                if(val == 1){return  '微信支付'}
                return    
             },
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
            },
            fctime(val){
                let date = new Date(val);
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
        },
        mounted(){
            document.title = '订单详情查看-氪空间后台管理系统'
            GLOBALSIDESWITCH("false");
        },
        methods: {
            // 商品详情
            goodDetail(){
                 window.open("/admin-applet/#/settingDetail?id="+this.info.goodId); 
            },
            //  团队卡详情
            operateDetail(){
                 window.open("/admin-applet/#/operateDetail?id="+this.info.saleId); 
            },
            //  会员详情
             memberDetails(){
                  window.open("/new/#/member/memberManage/list/"+this.info.uid); 
             }
        }, 
        created(){
            // 获取 订单详情
          this.$http.get("getOpKmTeamOrderDetails",{id:this.$route.query.id}).then((res)=>{
                if( res.code === 1 ){
                        this.info = res.data
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
        }
    }
</script>
