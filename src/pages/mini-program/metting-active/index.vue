
<template>
<div class="metting-active">
	<SectionTitle title="小程序活动配置"/>
	<SearchFrom/>
	<KrScroll :on-reach-bottom="handleReachBottom">
		<Table border :columns="activeCol" :data="activeDetail" ></Table>
		<div v-if="theHead" style="text-align:center">
			<Spin size="large" style="display:inline-block;"/>
		</div>
	</KrScroll>
</div>

</template>
<script>
import SectionTitle from '~/components/SectionTitle';
import SearchFrom from './searchFrom';
import Buttons from '~/components/Buttons';
import KrScroll from '~/components/KrScroll'
export default{
	components:{
		SectionTitle,
		SearchFrom,
		Buttons,
		KrScroll
	},
	data(){
		return {
			//发布开关
			openRelease:false,
			//删除开关
			openDelete:false,
			//下线开关
			openOffline:false,
			activeCol:[
				{
					title:'活动名称',
					key:'name',
					align:'center'
				},
				{
					title:'所在社区',
					key:'',
					align:'center'
				},
				{
					title:'活动日期',
					key:'',
					align:'center'
				},
				{
					title:'排序号',
					key:'',
					align:'center'
				},
				{
					title:'报名人数',
					key:'',
					align:'center'
				},
				{
					title:'到场人数',
					key:'',
					align:'center'
				},
				{
					title:'创建人',
					key:'',
					align:'center'
				},
				{
					title:'操作',
					align:'center',
					render:(h,params)=>{
						let style={display:'inline-block',padding:'5px',cursor:'pointer',color:'#2d8cf0'}
						let btns = [
							h('span',{
								style:style,
								on:{
									click:()=>{
										this.goDetail()
									}
								}
							},'查看'),
							h('span',{
								style:style,
								on:{
									click:()=>{
										this.goEdit()
									}
								}
							},'编辑'),
							h('span',{
								style:style,
								on:{
									click:()=>{
										this.switchRelease()
									}
								}
							},'发布'),
							h('span',{style:style},'删除'),
							h('span',{style:style},'参与用户')
						];
						
						return h('div',btns)
					}
				}
			],
			activeDetail:[
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
				{name:'88'},
			],
			theHead:false,
			left:0,
			width:0,
		};
		
	},
	mounted(){
		//  var dom=document.getElementById('layout-content-main');
		// dom.addEventListener("scroll",this.onScrollListener);
		// window.addEventListener('resize',this.onResize);  
	},
	methods:{
		goDetail(){						
			window.open('/mini-program/metting-active/detail','_blank')					
		},
		goEdit(){
			window.open('/mini-program/metting-active/edit','_blank')	
		},
		switchRelease(){
			this.openRelease !=this.openRelease;
		},
		switchDelete(){
			this.openDelete != this.openDelete;
		},
		handleReachBottom(){
			return new Promise(resolve => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
		},
		switchOffline(){
			this.openOffline != this.openOffline;
		},
	
	}
}
	
</script>
<style lang="less" scoped>

</style>
