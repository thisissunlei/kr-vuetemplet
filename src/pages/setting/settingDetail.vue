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
                    <span >商品类型：{{info.cardType}}</span>
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
                    <span >有效时长：{{info.activeDuration}}3天</span>
                    </Col>
                    <Col span="12">
                    <span >用卡人上限：人{{info.cardNo}}</span>
                    </Col>
                </Row>
                <Col span="24" style="display:flex;">
                        <div><span>使用须知：</span></div> 
                        <div>
                            <ul>
                                <li>{{info.cardIntro}}</li>
                            </ul>
                        </div>
                    </Col>
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
                        操作人员：冯西臣{{info.creater}}
                    </Col>
                    <Col span="12">
                        操作时间：2018-08-20 17:48:32{{info.ctime}}
                    </Col>
                </Row>  
        </div>
</template>
<script>
    export default {
        data(){
            return {
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
        filters:{
             fstatus(val){
                 let statusVal = val? '已上架':'已下架';
                 return statusVal
             }
        },
        methods: {
            
        },
        created(){
               // getKmTeamDetail
          this.$http.get("getKmTeamUppLowerDetail",{kmCardId:this.$route.query.id}).then((res)=>{
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
