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
                    <FormItem label="卡的面值(元)：" prop="faceValue">
                        <Input v-model="formValidate.faceValue" size="large" style="width:300px;" placeholder="请输入卡的面值"></Input>
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

             <div style="border-bottom:1px solid #f2f2f2;font-size:18px;padding:10px 0;margin-left:20px;">销售设置</div>

            <Row style="margin-top:25px;">
                <Col span="9">
                    <FormItem label="销    售   价：" prop="salePrice">
                        <Input v-model="formValidate.salePrice" size="large"  style="width:300px;" placeholder="请输入销售价格"></Input>
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem label="库   存  (张)：" prop="quantity">
                        <Input v-model="formValidate.quantity" 
                        :disabled="quantityFlag"
                        size="large"  style="width:150px;" placeholder="请输入库存数量"></Input>
                        <Checkbox v-model="quantityFlag" >库存无上限</Checkbox>
                    </FormItem>
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
    export default {
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
                },
                ruleValidate: {
                    cardType: [
                        { required: true, message: '商品类型不能为空', trigger: 'blur' }
                    ],
                    cardName: [
                        { required: true, message: '团队卡名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 10, message: '团队卡名称不能超过10个字符', trigger: 'blur' }
                    ],
                    faceValue: [
                        { required: true, message: '卡的面值不能为空',trigger:'blur' },
                        { type:'string',pattern:/^([1-9]\d*|[0]{1,1})$/, message:'卡得面值为非负数字', trigger:'blur'},
                    ],
                    activeDuration: [
                        { required: true, message: '有效时长不能为空', trigger: 'blur' },
                        { type:'string',pattern:/^([1-9]\d*|[0]{1,1})$/, message:'有效时长为整数天', trigger:'blur'},
                    ],
                    limitCount: [
                        { required: true,  message: '用卡人上限不能为空', trigger: 'blur' },
                        { type:'string',pattern:/^([1-9]\d*|[0]{1,1})$/, message:'用卡人上限为整数', trigger:'blur'},
                    ],
                    cardIntro: [
                        { required: true, message: '使用须知', trigger: 'blur' },
                        { type: 'string', max: 600, message: '使用须知不能超过600个字符', trigger: 'blur' }
                    ],
                    salePrice: [
                        { required: true, type: 'string', message: '销售价格不能为空', trigger: 'blur' },
                        { type:'string',pattern:/^[0-9]+([.]{1}[0-9]{1,2})?$/, message:'销售价不能为负数且最多2位小数', trigger:'blur'},
                    ],
                    quantity: [
                        { required: true, message: '库存不能为空', trigger: 'blur' },
                        { type:'string',pattern:/^([1-9]\d*|[0]{1,1})$/, message:'库存为整数', trigger:'blur'},
                    ],
                    verifyCode: [
                        { validator: CheckverifyCode, trigger: 'blur' }
                    ]
                }
            }
        },
        watch:{
                quantityFlag:function(){
                     if(this.quantityFlag){
                            this.quantityType = 'INF'
                            this.formValidate.quantity = '999'  
                        }else{
                            this.quantityType = 'LIMIT'  
                            this.formValidate.quantity = ''  
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
        methods: {
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if(valid){
                        this.$http.post("postKmTeamSaveUpdate",this.formValidate).then((res)=>{     
                            if(res.code === 1){
                                this.$Message.success('添加成功!')
                                setTimeout(()=>{
                                this.$router.push({path:'/setting'});  
                                },1000)
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
            goBackConfig(){
                this.$refs['formValidate'].resetFields(); 
                this.$router.push({path:'/setting'});
            }
        }
    }
</script>
