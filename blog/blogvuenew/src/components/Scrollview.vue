<template>
    <div id="wrapper" ref="myscroll">
        <slot></slot>
    </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'

export default {
    name: 'Scrollview',
    mounted() {
			this.iscroll = new IScroll(this.$refs.myscroll,{
				mouseWheel: true,
				scrollbars: false,
				scrollX:false,
				scrollY:true,
				disableMouse: false,
				disablePointer: false,
				disableTouch:false,
				preventDefault:false, // 防止手机端在iscroll点击事件失效
				probeType:3,
				onClick:true,
			})
			// 1. 创建一个观察者对象
			let observer = new MutationObserver((mutationList, observer)=>{
				this.iscroll.refresh();
			});
			// 2. 告诉观察者对象需要观察什么内容
			let observerOptions = {
				childList: true,  // 观察目标子节点的变化，是否有添加或者删除
				attributeFilter: ['height'], // 观察属性变动
				subtree: true     // 观察后代节点，默认为 false
			};
			// 3. 告诉观察者对象,第一个参数是观察谁，第二参数是观察内容
			observer.observe(this.$refs.myscroll, observerOptions);

			
		},
		methods:{
			// 提供监听滚动  在官网自定义事件中可以查到
			scrolling(fn){
				this.iscroll.on('scroll', function(){
					fn(this.y);
				});
			},
			refresh(){
				setInterval(()=>{
					this.iscroll.refresh();
				},200);
			},
			Toscrolling(x, y, time){
				this.iscroll.scrollTo(x, y, time);
			}
		}
}
</script>

<style lang="scss">
	#wrapper{
		width: 100%;
		height: 100%;
	}
</style>