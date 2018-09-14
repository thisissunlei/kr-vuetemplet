<template>
        <div style="min-width:1100px;padding:10px 20px;">
            <div style="border-bottom:1px solid #f2f2f2;padding: 10px 0;">
               <h2>商品概况</h2>
            </div>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <span >商品编号：{{info.cardNo}}</span>
                    </Col>
                    <Col span="12">
                    <span >商品类型：{{info.cardType|fcardType}}</span>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <span >商品名称：{{info.cardName}}</span>
                    </Col>
                    <Col span="12">
                    <span >卡的面值：{{info.face}}</span>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                    <span >有效时长：{{info.activeDuration}}天</span>
                    </Col>
                    <Col span="12">
                    <span >用卡人上限：{{info.limitCount}}人</span>
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                <Col span="24" style="display:flex;">
                        <div><span>使用须知：</span></div> 
                        <div>
                            <ul>
                                <li v-for="(item,index) in cardIntroAry" :key="index">{{item}}</li>
                            </ul>
                        </div>
                    </Col>
                </Row>    
                <div style="border-bottom:1px solid #f2f2f2;padding: 10px 0;">
                   <h2>销售设置</h2>
                </div>
                <Row style="margin-top:20px;">
                    <Col span="12">
                        销售价:{{info.sale}}
                    </Col>
                    <Col span="12">
                        库 存 (张)：{{info.quantity}}
                    </Col>
                </Row>  
                <Row style="margin-top:20px;">
                    <Col span="12">
                        购买码：{{info.verifyCode}}
                    </Col>
                    <Col span="12">
                        商品状态：{{info.published|fstatus}}
                    </Col>
                </Row>
                <Row style="margin-top:20px;">
                    <Col span="12">
                        操作人员：{{info.ssoName}}
                    </Col>
                    <Col span="12">
                        操作时间：{{info.ctime|fctime}}
                    </Col>
                </Row>  
        </div>
</template>
<script>
    export default {
        data(){
            return {
                cardIntroAry:[],
                info:{
                    quantityType: "",
                    activeDuration: "",
                    quantity: "",
                    cardName: "",
                    salePrice: "",
                    limitCount: "",
                    cardType: "",
                    published: "",
                    cardNo: "",
                    cardIntro: "",
                    ssoName: "",
                    face: "",
                    sale: "",
                    faceValue:"",
                    creater: "",
                    ctime: "",
                    id: "" 
                }
            }
        },
        //  问本内容 过滤
        filters:{
             fstatus(val){
                 let statusVal = val? '已上架':'已下架';
                 return statusVal
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
            document.title = '配置详情查看-氪空间后台管理系统'
            GLOBALSIDESWITCH("false");
        },
        methods: {
            
        },
        created(){
            //  获取 配置信息详情
          this.$http.get("getKmTeamUppLowerDetail",{kmCardId:this.$route.query.id}).then((res)=>{
                if( res.code === 1 ){
                        this.info = res.data
                        if(this.info.quantityType == 'INF'){
                           this.info.quantity = '无上限'
                        }
                        this.cardIntroAry = this.info.cardIntro.split('#')
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
