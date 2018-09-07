    <template>
        <div style="padding:25px;">
          <Row>
            <Col span="24">
              <Button class="newBuilt" @click="newBuiltGoods">创建商品</Button>
            </Col>
          </Row>
          <Row style="margin-top:25px;">
            <Col span="24">
               <Table :columns="columns1" :data="data1" border stripe></Table>
            </Col>
          </Row>
        </div>
    </template>
<script>
    export default {
        data(){
            return{
                columns1: [
                    {
                        title: '商品编号',
                        key: 'cardNo'
                    },
                    {
                        title: '商品名称',
                        key: 'cardName'
                    },
                    {
                        title: '面额',
                        key: 'faceValue',
                        render: (h, params) => {
                            return h('div',
                                [h('span', {
                                    style:'color:red',
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, this.data1[params.index].faceValue)
                            ]);
                        }
                    },
                    {
                        title: '销售价(元)',
                        key: 'salePrice',
                        align:'right',
                        render: (h, params) => {
                            return h('span', {
                                    style:{color:'red',alignText:'right'},
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, this.data1[params.index].salePrice)
                        }
                    },
                    {
                        title: '用卡人上限',
                        key: 'limitCount' // 用卡人上限
                    },
                    {
                        title: '库存(张)',
                        key: 'quantity'
                    },
                    {
                        title: '商品状态',
                        key: 'published',
                        render: (h, params) => {
                            return h('div',{
                                style:{display:'flex',alignItems:'center',justifyContent:'space-around',color:'#009DD6'},
                                },
                                [h('span', {
                                    on: {
                                        click: () => {
                                            this.del(params.index)
                                        }
                                    }
                                },  this.data1[params.index].published ?'已上架':'已下架'  ),
                            ]);
                        }
                    },
                    {
                        title: '操作时间',
                        key: 'ctime'
                    },
                    {
                        title: '操作人员',
                        key: 'ssoName'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div',{
                                style:{display:'flex',alignItems:'center',justifyContent:'space-around',color:'#009DD6'},
                                },
                                [
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.detail(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.del(params.index)
                                        }
                                    }
                                },  this.data1[params.index].published ?'下架':'上架'),
                                h('a', {
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                data1:[]
            }
        },
        created(){
            //getkmTeamList
           this.$http.get("getkmTeamList").then((res)=>{
                console.log(JSON.stringify(res.data.items))
                if( res.code === 1 ){
                    this.data1 = res.data.items
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
        mounted(){
        },
        methods:{
            del(index){
                this.$http.post("postKmTeamUppLower",{uppAndLower:this.data1[index].id}).then((res)=>{
                 if( res.code === 1 ){
                    this.$Message.success('修改成功!')
                            setTimeout(()=>{
                                    this.$http.get("getkmTeamList").then((res)=>{
                                    if( res.code === 1 ){
                                        console.log(JSON.stringify(res))
                                        this.data1 = res.data.items
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
                            },1000)
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
                this.$router.push({path:'/settingDetail',query:{id:this.data1[index].id}})
            },
            edit(index){
                this.$router.push({path:'/editGoods',query:{id:this.data1[index].id}})
            },
            newBuiltGoods(){
                this.$router.push({path:'/newBuiltGoods'})
            },
        }
    }
</script>
<style lang="less" scoped>
   .newBuilt{
       background:#00CFFF;
       color:#fff;
    //   border: 1px black solid;
   }
</style>
