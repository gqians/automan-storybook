## 基于vue的TimeLine组件
### 使用

``` bash
yarn add @automan-component/timeline
```

下载完成后可以在vue中作为组件直接应用

``` javascript
import TimeLine from @automan-component/timeline

export default{
	...
	//在components中注册
	components: { TimeLine }
	methods:{
		timeChange(time){
			//可以获取到更改后time
			...
		}
	}
}
//使用组件
<template>
	<TimeLine @timeChange="timeChange"/>
</template>
```
### props

``` javascript
		controlStyle: VueTypes.shape({
			backgroundColor: VueTypes.string, //左侧播放按钮的背景颜色，实质改变的svg Fill颜色
			extra: VueTypes.arrayOf(VueTypes.string).def([]) //左侧播放按钮的附加class，使用tailwindcss
		}),
		slider: VueTypes.shape({
			marks: VueTypes.bool.def(true),//时候显示刻度
			height: VueTypes.string.def('12px'),//高度
			lazy: VueTypes.bool.def(true),//是否开启懒加载
			useKeyboard: VueTypes.bool.def(true),//是否使用键盘
			hideLabel: VueTypes.bool.def(true),//是否展示刻度下面的label值
			tooltip: VueTypes.oneOf(['none', 'always', 'hover', 'focus', 'active']).def('always'),// 什么时候展示toolTip
			duration: VueTypes.number.def(0.5), // 滑动条的过度样式
			railStyle: VueTypes.any, // 轨道的样式
			processStyle: VueTypes.any, // 经度条的样式
			tooltipStyle: VueTypes.any, // 工具提示的样式
			stepStyle: VueTypes.any, // 步长的样式
			stepActiveStyle: VueTypes.any, // 步长激活下的样式
			labelStyle: VueTypes.any, // 标签样式mr-3mr-3
			labelActiveStyle: VueTypes.any, // 标签激活下的样式
			extra: VueTypes.arrayOf(VueTypes.string).def([])//sidebar额外的样式
		}),
		startDate: VueTypes.string,//设置timeline开始的时间
		days: VueTypes.integer.def(10),//设置需要生成几天的数据
		dateFormat: VueTypes.string.def('MM-DD'),//设置时间的格式
		intervals: VueTypes.integer.def(1000)//设置timeline移动的时间间隔
```

### 事件
1.通过timeChange可以获得更改后的time,包括拖拽、点击移动、播放移动均会触发timeChange事件。

### 其他
1.组件采取tailwindcss,需要在外部配置好tailwindcss运行的环境。
