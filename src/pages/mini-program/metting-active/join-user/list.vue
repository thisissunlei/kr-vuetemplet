
<template>
  <div class="m-account-management">
      <div class="account-manage-table">
        <KrScroll :onReachBottom="onReachBottom" :toBottom="isBottom">
          <Table 
            :columns="listColumns" 
            :data="listData"
            border
          />
        </KrScroll>
       </div>
  </div>
</template>

<script>
import publicFn from "./publicPage.js";
import KrScroll from "~/components/KrScroll";
export default {
  components: {
    KrScroll
  },
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      listData: [],
      listColumns: [].concat(
        this.formattingColumns(publicFn.initListData.call(this, this.type))
      ),
      isBottom:false,
      allMoney: "",
      communityList: []
    };
  },
  mounted() {
    // this.initData();
    // return;
    this.getListData();
  },
  methods: {
    initData() {
      let arr = [];
      for (let i = 0; i < 100; i++) {
        arr.push({ uid: i });
      }
      this.listData = [].concat(arr);
    },
    formattingColumns(data) {
      var arr = [];
      for (let i = 0; i < data.length; i++) {
        let every = data[i];
        if (every.type.indexOf(this.type) != -1) {
          arr.push(every);
        }
      }
      return arr;
    },
    goView(params) {
      window.open("/bill/payment/detail/" + params.recordId, "_blank");
    },
    onReachBottom() {
      return new Promise(resolve => {
        
        this.getListData(resolve)
        // resolve();
      });
    },
    getListData(resolve) {
      let params = {
        arriving:false,
        activityId:this.$route.query.activityId || 1,
      }
    
      if (this.type == "entrance") {
        delete params.arriving
      }
      this.$http
        .get("metting-active-user-list", params)
        .then(response => {
          this.listData = this.listData.concat(response.data.items);
          this.allMoney = response.data.totalCount;
          if(this.listData.length>=this.allMoney){
            this.isBottom = true;
          }
          if(resolve){
            resolve();
          }
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          });
        });
    }
  }
};
</script>

<style lang="less">
.m-account-management {
  .account-manage-table {
    margin: 10px 20px 0 0px;
  }
  .statusClass {
    .ivu-table-cell {
      padding: 0 5px;
    }
  }
}
</style>
