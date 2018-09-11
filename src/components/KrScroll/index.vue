<template>
    <div class="ui-kr-scroll">
        <slot></slot>
        <div v-if="loadding" style="text-align:center;">
             <Spin size="large" style="display:inline-block;"/>
             <div style="color:#2d8cf0;">
                  &nbsp;&nbsp;&nbsp;&nbsp;加载中...
             </div>
        </div>
        <!-- <div v-if="noData" style="text-align:center;line-height:40px;">我是有底线的</div> -->
       
    </div>
</template>
<script>
import utils from 'utils';
export default{
    // components:{
     
    // },
    props:{
        onReachBottom:{
            type:Function,
            default:()=>{},
        },
        toBottom:{
            type:Boolean,
            default:false
        },
    },
    data(){
	    return{
            loadding:false,
            noData:this.toBottom,
            scrollTop:0,
		}

    },
    watch:{
        toBottom(){
            this.noData = this.toBottom;
            if(this.toBottom){
                this.loadding = false;
            }
            
        }
    },
    created(){
        this.handleScroll = utils.debounce(150,this.onScroll);
    },
    mounted(){
        this.$kr_global.contentDom.addEventListener("scroll",this.handleScroll);
    },
    methods:{
        onScroll(){
            if(this.noData){
                return ;
            }
            var dom=this.$kr_global.contentDom;
            this.scrollTop = dom.scrollTop;
            if(dom.scrollHeight-dom.scrollTop-dom.clientHeight<10){
                
                var waitFunction = this.onReachBottom();
                this.loadding=true;
                if(waitFunction.then){
                    waitFunction.then(()=>{
                      
                       dom.scrollTop = this.scrollTop;

                        this.loadding = false;
                    })
                }
            }
          
            this.$emit('scroll')
        }
    },

}
</script>

<style lang="less" scoped>
.ui-kr-scroll{

}
    
   
</style>