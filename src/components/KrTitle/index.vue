<template>
    <div >
    </div>
</template>

<script>
export default {
  props: {
      title:{
          type:String,
          default:'氪空间后台管理系统'
      }
  },
  mounted() {
      document.title = this.title;
  },
};
</script>
