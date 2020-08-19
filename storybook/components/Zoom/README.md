## 基于openlayers的zoom组件
### 使用

``` bash
yarn add @automan-component/zoom
```

下载完成后可以在vue中作为组件直接应用

``` javascript
import Zoom from @automan-component/zoom

export default{
	...
	//在components中注册
	components: { Zoom }
}
//使用组件
<template>
	<Zoom @getMap = 'getMap'/>
</template>

//注册组件
map.addControl(zoom)
```
### props

``` javascript
        position: VueTypes.shape({
			left: VueTypes.string,
			right: VueTypes.string,
			top: VueTypes.string,
			bottom: VueTypes.string
		}),
		zoomStyle: VueTypes.oneOf(['origin', 'circle']).def('origin'),
		backgroundColor: VueTypes.string,
		color: VueTypes.string,
		duration: VueTypes.integer.def(250),
		zoomInTipLabel: VueTypes.string.def('放大'),
		zoomOutTipLabel: VueTypes.string.def('缩小'),
		delta: VueTypes.integer.def(1)
```

 1. position为zoom相对于map的位置。
 2. 目前zoom组件有两种风格，一种是origin的方形，一种是cricle的圆形。
 3. backgroundColor代表背景颜色，color代表'+/-'的文字颜色。
 4. duration控制图层zoom切换的时间，默认为250ms。
 5. zoomInTipLabel和zoomOutTipLabel控制鼠标放上去后出现的文字提示，默认为放大、缩小。
 6. delta代表点击一次按钮缩放几级，默认为1级。

### 事件
1.通过getZoom可以获得初始化后的Zoom对象。

### 其他
1.由于采用了openlayer的官方zoom组件作为基础，所以暂时没有进行响应式设计，但基本满足业务需求。
