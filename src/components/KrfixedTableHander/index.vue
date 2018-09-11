<template>
	<div :id="tableHanderId" class="kr-fixed-table-hander" >
        <!-- <Table :columns="columns" :data="data.slice(1)"></Table> -->
	</div>
</template>
<script>
export default {
 
  props: {
    columns:{
      type:Array,
      default:()=>[]
    },
    data:{
      type:Array,
      default:()=>[]
    }
  },
 
  mounted() {
     this.$kr_global.contentDom.addEventListener("scroll",this.handleScroll,false);
  },
  data() {
    return {
      tableHanderId:'tableHanderId'+this._uid
    }
    
  },
  methods: {
    handleScroll(){
      let contentDetail = this.$kr_global.contentDom.getBoundingClientRect();
      let handerDom = document.getElementById(this.tableHanderId);
      if(contentDetail.top<this.$kr_global.contentDom.scrollTop){
         handerDom.style.opacity=1;
        handerDom.style.position = 'fixed';
        handerDom.style.zIndex = '999';
        handerDom.style.top = contentDetail.top+'px';
        console.log(contentDetail,"pppppppp")

      }else{
         handerDom.style.opacity=0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.kr-fixed-table-hander {
  overflow: hidden;
  height: 40px;
  opacity: 0;
}
</style>

