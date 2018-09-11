<template>
    <div class="ui-kr-scroll">
        <div :id="tableHanderId" class="kr-fixed-table-hander">
            
        </div>
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
import utils from "utils";
export default {
  // components:{

  // },
  props: {
    onReachBottom: {
      type: Function,
      default: () => {}
    },
    toBottom: {
      type: Boolean,
      default: false
    },
    topHeight:{
        type:Number,
        default:78
    },
    scrollTopNum:{
        type:Number,
        default:130,
    }
  },
  data() {
    return {
      loadding: false,
      noData: this.toBottom,
      scrollTop: 0,
      handerContent:false,
      tableHanderId: "tableHanderId" + this._uid,
    };
  },
  watch: {
    toBottom() {
      this.noData = this.toBottom;
      if (this.toBottom) {
        this.loadding = false;
      }
    }
  },
  created() {
    this.handleScroll = utils.debounce(150, this.onScroll);
  },
  mounted() {
    let _this = this;
    this.$kr_global.contentDom.addEventListener(
      "scroll",
      this.handleScroll,
      false
    );

     LISTENSIDEBAROPEN(function (params) {
          _this.handerRefresh();
      })
     window.onresize = ()=>{
       this.handerRefresh()
     };
  },
  beforeDestroy() {
    this.$kr_global.contentDom.removeEventListener(
      "scroll",
      this.handleScroll,
      false
    );
  },
  methods: {
    handerRefresh(){
       this.handerContent = false;
        setTimeout(()=>{
             document.getElementById(this.tableHanderId).innerHTML = this.$slots.default[0].elm.innerHTML;
        },300)
    },
    onScroll() {
      if (this.noData) {
        return;
      }
      var dom = this.$kr_global.contentDom;
      let contentDetail = dom.getBoundingClientRect();
      let handerDom = document.getElementById(this.tableHanderId);
      
      this.scrollTop = dom.scrollTop;
      if (dom.scrollHeight - dom.scrollTop - dom.clientHeight < 5) {
        var waitFunction = this.onReachBottom();
        this.loadding = true;
        if (waitFunction.then) {
          waitFunction.then(() => {
            dom.scrollTop = this.scrollTop;

            this.loadding = false;
          });
        }
      }

      if (this.scrollTopNum < this.$kr_global.contentDom.scrollTop) {
        // handerDom.innerHTML = this.$slots.default[0].elm.innerHTML
        if(!this.handerContent){
            handerDom.innerHTML = this.$slots.default[0].elm.innerHTML;
            this.handerContent = true;
        }
        // console.log(handerDom.style.display,"ppppp")
        if(handerDom.style.display=='none'){
            handerDom.style.display = 'block';
            handerDom.style.position = "fixed";
            handerDom.style.zIndex = "999";
            handerDom.style.top = this.topHeight + "px";
        }
      } else {
        handerDom.style.display = 'none';
      }

      this.$emit("scroll");
    }
  }
};
</script>

<style lang="less" scoped>
.ui-kr-scroll {
  .kr-fixed-table-hander {
    border-top: 1px solid #e9eaec;
    overflow: hidden;
    height: 40px;
    display: none;
  }
}
</style>