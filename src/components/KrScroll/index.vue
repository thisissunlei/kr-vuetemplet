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
    topHeight: {
      type: Number,
      default: 78
    },
    scrollTopNum: {
      type: Number,
      default: 130
    }
  },
  data() {
    return {
      loadding: false,
      noData: this.toBottom,
      scrollTop: 0,
      handerContent: false,
      tableHanderId: "tableHanderId" + this._uid,
      handerHeight: 0,
      tableClass: "ivu-table "
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

    LISTENSIDEBAROPEN(function(params) {
      _this.handerRefresh();
    });

    window.onresize = () => {
      this.handerRefresh();
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
    handerRefresh() {
      let handerDom = document.getElementById(this.tableHanderId);
      this.handerContent = false;
      setTimeout(() => {
        let tabHanderDom = this.getHanderHeight(this.$slots.default[0].elm);
        handerDom.className = handerDom.className + " " + this.tableClass;
        handerDom.innerHTML = tabHanderDom.innerHTML;
        this.handerHeight = tabHanderDom.clientHeight;
         handerDom.style.height = this.handerHeight + "px";
      }, 300);
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
        if (!this.handerContent) {
          let tabHanderDom = this.getHanderHeight(this.$slots.default[0].elm);
          handerDom.className = handerDom.className + " " + this.tableClass;
          handerDom.innerHTML = tabHanderDom.innerHTML;
          this.handerContent = true;
          this.handerHeight = tabHanderDom.clientHeight;
        }
        // console.log(handerDom.style.display,"ppppp")
        if (handerDom.style.display == "none" || !handerDom.style.display) {
          handerDom.style.display = "block";
          handerDom.style.position = "fixed";
          handerDom.style.zIndex = "999";
          handerDom.style.height = this.handerHeight + "px";
          handerDom.style.top = this.topHeight + "px";
        }
      } else {
        handerDom.style.display = "none";
      }

      this.$emit("scroll");
    },
    getHanderHeight(dom) {
      if (dom.className.indexOf("ivu-table ") != -1) {
        this.tableClass = dom.className;
      }
      if (dom.className.indexOf("ivu-table-header") != -1) {
        return dom;
      } else {
        let handerDom = "";
        for (let i = 0; i < dom.children.length; i++) {
          const element = dom.children[i];
          handerDom = this.getHanderHeight(element);
          if (handerDom) {
            return handerDom;
          }
        }
      }
    }
  }
};
</script>

<style lang="less" >
.ui-kr-scroll {
  .kr-fixed-table-hander {
    border-top: 1px solid #e9eaec;
    overflow: hidden;
    height: 40px;
    display: none;
    th {
      background-color: #f8f8f9;
    }
  }
}
</style>