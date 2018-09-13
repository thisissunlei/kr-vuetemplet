    <template>
        <div style="padding:25px;">
          <Row>
            <Col span="24">
              <Button class="newBuilt" @click="newBuiltGoods">创建商品</Button>
            </Col>
          </Row>
          <Row style="margin-top:25px;">
            <Col span="24">
               <!-- <Table   :rowClassName="rowClassName" :columns="columns1" :data="data1" border stripe></Table> -->
                  <Table  :columns="columns1" :data="sortData" border stripe></Table>
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
        data(){
            return{
                totalCount:0,
                params:{
                    page:1,	
                    pageSize:15
                },
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
                            return h('span', {
                                    style:'color:red'
                                }, this.data1[params.index].faceValue);
                        }
                    },
                    {
                        title: '销售价(元)',
                        key: 'salePrice',
                        className: 'demo-table-info-column',
                        render: (h, params) => {
                            return h('span', {
                                    style:{color:'red'}
                                }, '￥'+this.data1[params.index].salePrice)
                        }
                    },
                    {
                        title: '用卡人上限（人）',
                        key: 'limitCount' // 用卡人上限
                    },
                    {
                        title: '库存(张)',
                        key: 'quantity',
                      //  quantityType  
                        render: (h, params) => {
                            let curQuantity = ''
                            if(this.data1[params.index].quantityType==='INF'){ curQuantity = '无上限'}else{curQuantity =this.data1[params.index].quantity}
                            return h('span', {
                                }, curQuantity)
                        }
                    },
                    {
                        title: '商品状态',
                        key: 'published',
                        render: (h, params) => {
                            return h('div',
                                [h('span', {
                                },  this.data1[params.index].published ?'已上架':'已下架'  ),
                            ]);
                        }
                    },
                    {
                        title: '操作时间',
                        key: 'ctime',
                        render: (h, params) => {
                            let curTime = this.formatDateTime(this.data1[params.index].ctime)
                            return h('div',
                                [
                                h('span',{
                                }, curTime ),
                            ]);
                        }
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
        mounted(){
        },
        computed:{
          sortData:function(){
              let curData =  this.data1
            curData = curData.sort(function(a,b){
                 if (a.ctime > b.ctime ) {
                           return -1;
                    }else if(a.ctime < b.ctime){
                           return 1
                    }else{
                           return 0;
                    }
              })
            return curData  
          }
        },
        methods:{
            changePage(pageNum){
                this.params.page = pageNum
                        this.$http.get("getkmTeamList",this.params).then((res)=>{
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
            },
            del(index){
                this.$http.post("postKmTeamUppLower",{uppAndLower:this.data1[index].id}).then((res)=>{
                 if( res.code === 1 ){
                            this.$Message.success('修改成功!')
                            setTimeout(()=>{
                                    this.$http.get("getkmTeamList").then((res)=>{
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
                            },500)
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
                 window.open("/admin-applet/#/settingDetail?id="+this.data1[index].id); 
            },
            edit(index){
                 window.open("/admin-applet/#/editGoods?id="+this.data1[index].id); 
            },
            newBuiltGoods(){
                window.open("/admin-applet/#/newBuiltGoods"); 
            }
        }
    }
</script>
<style lang="less" >
   .ivu-table td.demo-table-info-column{
        padding-right: 0px;
        margin-right: 0px;
        text-align: right;
        color: red;
    }
    .ivu-table td.demo-table-info-column .ivu-table-cell{
        padding-right: 0px;
        margin-right: 0px;
    }
   .newBuilt{
       background:#00CFFF;
       color:#fff;
    //   border: 1px black solid;
   }
</style>

