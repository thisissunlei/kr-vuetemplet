<template>
    <div class="ui-upload-img">
        <div class="ui-upload-up-btn">

        </div>
    </div>
</template>
<script>
export default {
    props:{
        files:{
            type:Array,
            default:()=>[],
        }
    },
    data(){
        return {

        }
    },
    methods:{
        upActive(event){
            this.$emit('upActive',event)
        },
    }
}
</script>
<style lang="less" scoped>

</style>
