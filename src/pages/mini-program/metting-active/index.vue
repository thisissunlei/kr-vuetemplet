
<template>
<div class="metting-active">
	<SectionTitle title="小程序活动配置"/>
	<Button type="primary" @click="goNewActive">新建活动</Button>
	<SearchFrom/>
	<Table border :columns="activeCol" :data="activeDetail"></Table>
</div>

</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import SearchFrom from './searchFrom';
import Buttons from '~/components/Buttons';

export default{
	components:{
		SectionTitle,
		SearchFrom,
		Buttons
	},
	data(){
		return {
			activeCol:[
				{
					title:'活动名称',
					key:'name'
				},
				{
					title:'所在社区',
					key:''
				},
				{
					title:'活动日期',
					key:''
				},
				{
					title:'排序号',
					key:''
				},
				{
					title:'报名人数',
					key:''
				},
				{
					title:'到场人数',
					key:''
				},
				{
					title:'创建人',
					key:''
				},
				{
					title:'操作',
					render:(h,params)=>{
						let btns = [
							h(Buttons,{},'查看'),
							h(Buttons,{},'编辑'),
							h(Buttons,{},'参与用户'),
							h(Buttons,{},'发布'),
							h(Buttons,{},'删除')
						];
						return h('div',btns)
					}
				}
			],
			activeDetail:[{name:''}]
		};
		
	},
	methods:{
		goNewActive(){
			window.open('/mini-program/metting-active/edit','_blank')
		}
	}
}
	
</script>
<style lang="less" scoped>

</style>
