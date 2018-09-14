<template>
    <div style="min-width:1100px;">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
            <div style="border-bottom:1px solid #f2f2f2;font-size:18px;padding:10px 0;margin-left:20px;">商品信息</div>
            <Row style="margin-top:25px;">
                <Col span="9">
                    <FormItem label="商 品 类  型：" prop="cardType">
                        <Select v-model="formValidate.cardType" size="large" style="width:300px;" placeholder="请选择商品类型">
                            <Option v-for="item in cardTypeList" :value="item.value" :key="item.value">{{ item.key }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="团 队卡名 称：" prop="cardName">
                        <Input v-model="formValidate.cardName" size="large" style="width:300px;" placeholder="请输入团队卡名称"></Input>
                    </FormItem>
                </Col>
                <Col span="7">
                </Col>
            </Row>
            <Row style="margin-top:25px;">
                <Col span="9">
                    <FormItem label="卡的面值(元)：" prop="face">
                        <Input v-model="formValidate.face" size="large" style="width:300px;" placeholder="请输入卡的面值"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="有效时长(天)：" prop="activeDuration">
                        <Input v-model="formValidate.activeDuration" size="large" style="width:300px;" placeholder="请输入有效时长"></Input>
                    </FormItem>
                </Col>
                <Col span="7">
                </Col>
            </Row>
            <Row style="margin-top:25px;">
                <Col span="9">
                    <FormItem label="用卡人上限：" prop="limitCount">
                        <Input v-model="formValidate.limitCount" size="large"  style="width:300px;" placeholder="请输入用卡人上限"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                </Col>
                <Col span="7">
                </Col>
            </Row>
            <Row style="margin-top:25px;">
                <Col span="9">
                    <FormItem label="使 用 须  知：" prop="cardIntro">
                        <Input v-model="formValidate.cardIntro" type="textarea" :rows=6 style="width:300px;" placeholder="请输入团队卡说明"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                     
                </Col>
                <Col span="7">
                       
                </Col>
            </Row>

             <Row style="margin-top:25px;">
                <Col span="9">
                 <FormItem label="卡  面 图  片：" prop="goodsUrl">
                       <input v-show="false"  v-model="formValidate.goodsUrl" type="text" >
                        <!-- :onRemove="coverRemove"
                                :onFormatError="imgSizeFormat" -->
                       <UploadFile      
                                category="web/upload"
                                withCredentials
                                :format="['jpg','png','gif']"
                                :maxLen="1"
                                :onSuccess="coverSuccess"
                                :imgWidth="148"
                                :imgHeight="148"/>
                    </FormItem>
                </Col>
                <Col span="8">
                     
                </Col>
                <Col span="7" >
                        
                </Col>
            </Row>

             <div style="border-bottom:1px solid #f2f2f2;font-size:18px;padding:10px 0;margin-left:20px;">销售设置</div>

            <Row style="margin-top:25px;">
                <Col span="9">
                    <FormItem label="销    售   价：" prop="sale">
                        <Input v-model="formValidate.sale" size="large"  style="width:300px;" placeholder="请输入销售价格"></Input>
                    </FormItem>
                </Col>
                <Col span="9" >
                    <FormItem   label="库   存  (张)："  prop="quantity">
                        <Input v-model="formValidate.quantity" 
                        :disabled="quantityFlag"
                        size="large"  style="width:150px;" placeholder="请输入库存数量"></Input>
                        <Checkbox v-model="quantityFlag" >库存无上限</Checkbox>
                    </FormItem >
                </Col>
                <Col span="6">
                </Col>
            </Row>

            <Row style="margin-top:25px;">
                <Col span="9">
                    <FormItem label="购    买    码：" prop="verifyCode" >
                        <Input v-model="formValidate.verifyCode" size="large"  style="width:300px;" placeholder="请输入购买码"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                </Col>
                <Col span="7">
                </Col>
            </Row>

            <Row>
                <Col span="8" offset="7">
                    <FormItem>
                        <Button type="ghost" @click="handleSubmit('formValidate')">确定</Button>
                        <Button type="ghost" @click="goBackConfig" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Col>
                <Col span="7">
                </Col>
            </Row>
            
        </Form>
    </div>
</template>
<script>
import UploadFile from '../../components/UploadFile'
    export default {
        components:{UploadFile},
        data(){
            const CheckverifyCode = (rule, value, callback) => {
                if(this.formValidate.cardType == 'NORMAL'){
                      callback();
                   }else{
                        if(value === ''){
                          callback(new Error('购买码不能为空'));
                         }else{
                            callback();
                         }
                   }
            };  
            const ChecklimitCount = (rule, value, callback) => {
                     if(value===''){
                           callback(new Error('用卡人上限不能为空'));      
                        }else{
                            let reg = /^([1-9]\d*|[0]{1,1})$/;     
                            if(reg.test(value)){
                                    callback();
                               }else{
                                    callback(new Error('用卡人上限为整数'));   
                               }
                        }
                }; 
                 const ChecksaleQuantity = (rule, value, callback) => {
                    if(this.quantityFlag){
                          callback();
                    }else{
                          if(value===''){
                            callback(new Error('库存不能为空'));      
                            }else{
                                let reg = /^([1-9]\d*|[0]{1,1})$/;     
                                if(reg.test(value)){
                                        callback();
                                }else{
                                        callback(new Error('库存数量为正整数'));   
                                }
                            }
                    }
                    
                }; 
            return {
                quantityArray:['INF','LIMIT'],//INF无限库存,LIMIT计算库存
                cardTypeList:[{key:'普通卡',value:'NORMAL'},{key:'定制卡',value:'CUSTOM'}],
                quantityFlag:false,
                formValidate: {
                    cardType:'NORMAL',    //商品类型
                    cardName:'',          //团队卡名称
                    faceValue:'',         //卡的面值
                    activeDuration:'',    //有效时长
                    limitCount:'',        //用卡人上限
                    cardIntro:'',         //介绍
                    salePrice:'',         //销售价
                    quantity:'',          //库存张
                    verifyCode:'',        //购买码
                    quantityType:'LIMIT', //库存计算类型
                    goodsUrl:'',
                },
                ruleValidate: {
                    cardType: [
                        { required: true, message: '商品类型不能为空', trigger: 'blur'}
                    ],
                    cardName: [
                        { required: true, message: '团队卡名称不能为空', trigger: 'blur'},
                        { type: 'string', max: 10, message: '团队卡名称不能超过10个字符', trigger: 'blur'}
                    ],
                    face: [
                        { required: true, message: '卡的面值不能为空',trigger:'blur'},
                        { type:'string',pattern:/(?!^0*(\.0{1,2})?$)^\d{1,7}(\.\d{1,2})?$/, message:'卡得面值为七位非负数且最多保留2位小数', trigger:'blur'},
                    ],
                    activeDuration: [
                        { required: true, message: '有效时长不能为空', trigger: 'blur'},
                        { type:'string',pattern:/^[1-9]\d*$/, message:'有效时长为整数天', trigger:'blur'},
                    ],
                    limitCount: [
                        { required: true,  message: '用卡人上限不能为空', trigger: 'blur'},
                        { type:'string',pattern:/^[1-9][0-9]{0,3}$/, message:'用卡人上限为1-9999人', trigger:'blur'},
                    ],
                    cardIntro: [
                        { required: true, message: '使用须知', trigger: 'blur' },
                        { type: 'string', max: 500, message: '使用须知不能超过500个字符', trigger: 'blur'}
                    ],
                    sale: [
                        { required: true, type: 'string', message: '销售价格不能为空', trigger: 'blur'},
                        { type:'string',pattern:/(?!^0*(\.0{1,2})?$)^\d{1,7}(\.\d{1,2})?$/, message:'销售价为七位非负数且最多保留2位小数', trigger:'blur'},
                    ],
                    quantity: [
                        { validator: ChecksaleQuantity, trigger: 'change' }
                    ],
                    goodsUrl:[
                         {required: true, message: '请上传图片', trigger: 'change'}
                    ],
                    verifyCode: [
                        { validator: CheckverifyCode, trigger: 'blur'}
                    ]
                }
            }
        },
        watch:{
            //  监听 库存状态切换
                quantityFlag:function(){
                     if(this.quantityFlag){
                            this.formValidate.quantityType = 'INF'
                        }else{
                            this.formValidate.quantityType = 'LIMIT'  
                        }
                },
                'formValidate.cardType':function(){
                    if(this.formValidate.cardType == 'CUSTOM'){
                        this.ruleValidate.verifyCode.push({ required: true, message: '购买码不能为空', trigger: 'blur' })
                    }
                    if(this.formValidate.cardType == 'NORMAL'){
                        this.ruleValidate.verifyCode.splice(0,this.ruleValidate.verifyCode.length); 
                    }
                }  
        },
         mounted(){
            document.title = '新建团队卡-氪空间后台管理系统'
            GLOBALSIDESWITCH("false");
        },
        methods: {
            coverSuccess(response, file, fileList){
                if(response.code == 1){
                    this.formValidate.goodsUrl = response.data.url 
                    }else{}
            },
            coverRemove(){

            },
            // 新建提交
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if(valid){
                        this.$http.post("postKmTeamSaveUpdate",this.formValidate).then((res)=>{     
                            if(res.code === 1){
                                this.$Message.success('添加成功!')
                                setTimeout(()=>{
                                    window.close();
                                    window.opener.location.reload();
                                },500)
                            }else{
                                this.$Message.error(res.message)
                            }
                        }).catch((error)=>{
                                this.$Notice.error({
                                title:error.message
                            });
                        })
                    }else{}
                })
            },
            // 关闭
            goBackConfig(){
                this.$refs['formValidate'].resetFields(); 
                window.close();
                window.opener.location.reload();
            }
        }
    }
</script>
<style  lang="less" scoped>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
