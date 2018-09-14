    <template>
        <div style="padding:25px;">
          <Row>
            <Col span="24">
              <Button class="newBuilt" @click="newBuiltGoods">创建商品</Button>
            </Col>
          </Row>
          <Row style="margin-top:25px;">
            <Col span="24">
                  <Table  :columns="columns" :data="sortData" border stripe></Table>
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
                columns: [
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
                                }, this.data[params.index].faceValue);
                        }
                    },
                    {
                        title: '销售价(元)',
                        key: 'salePrice',
                        className: 'demo-table-info-column',
                        render: (h, params) => {
                            return h('span', {
                                    style:{color:'red'}
                                }, '￥'+this.data[params.index].salePrice)
                        }
                    },
                    {
                        title: '用卡人上限（人）',
                        key: 'limitCount' // 用卡人上限
                    },
                    {
                        title: '库存(张)',
                        key: 'quantity',
                        render: (h, params) => {
                            let curQuantity = ''
                            if(this.data[params.index].quantityType==='INF'){ curQuantity = '无上限'}else{curQuantity =this.data[params.index].quantity}
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
                                },  this.data[params.index].published ?'已上架':'已下架'  ),
                            ]);
                        }
                    },
                    {
                        title: '操作时间',
                        key: 'ctime',
                        render: (h, params) => {
                            let curTime = this.formatDateTime(this.data[params.index].ctime)
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
                            let curColor = '#009DD6'
                            if(this.data[params.index].published){
                                curColor = '#f1f1f1';  
                            }
                            '#f1f1f1';
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
                                            this.changeState(params.index)
                                        }
                                    }
                                },  this.data[params.index].published ?'下架':'上架'),
                                h('a', {
                                    style:'color:'+curColor,
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
                data:[]
            }
        },
        created(){
            // 获取 商品列表详情
           this.$http.get("getkmTeamList").then((res)=>{
                if( res.code === 1 ){
                    this.data = res.data.items
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
            document.title = '团队卡配置-氪空间后台管理系统'
        },
        computed:{
            // 排序
          sortData:function(){
              let curData =  this.data
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
            // 页码切换
            changePage(pageNum){
                this.params.page = pageNum
                        this.$http.get("getkmTeamList",this.params).then((res)=>{
                        if( res.code === 1 ){
                            this.data = res.data.items
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
            // 上下架 状态切换
            changeState(index){
                this.$http.post("postKmTeamUppLower",{uppAndLower:this.data[index].id}).then((res)=>{
                 if( res.code === 1 ){
                            this.$Message.success('修改成功!')
                            setTimeout(()=>{
                                    this.$http.get("getkmTeamList").then((res)=>{
                                    if( res.code === 1 ){
                                        this.data = res.data.items
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
            //  跳转详情
            detail(index){
                 window.open("/admin-applet/#/settingDetail?id="+this.data[index].id); 
            },
            //  编辑详情
            edit(index){
                 if(this.data[index].published){ 
                         return 
                   }else{
                     window.open("/admin-applet/#/editGoods?id="+this.data[index].id);          
                   }
                 
            },
            //  新建
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
   }
</style>

