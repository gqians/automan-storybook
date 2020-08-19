## 基于openlayers的map组件
### 使用

``` bash
yarn add @automan-component/map
```

下载完成后可以在vue中作为组件直接应用

``` javascript
import Map from @automan-component/map

export default{
	...
	//在components中注册
	components: { Map }
}
//使用组件
<template>
	<Map />
</template>
```
### props

``` javascript
config: VueTypes.shape({
			tileLayers: VueTypes.arrayOf(VueTypes.shape({
				sourceType: VueTypes.oneOf(['xyz']).def('xyz'),
				sourceUrl: VueTypes.string.def(''),
				crossOrigin: VueTypes.oneOf(['Anonymous']).def('Anonymous'),
				title: VueTypes.string.def(''),
				visible: VueTypes.bool.def(true),
				zIndex: VueTypes.integer
			})),
			view: VueTypes.shape({
				center: VueTypes.arrayOf(Number).def([0, 0]),
				zoom: VueTypes.integer.def(4),
				maxZoom: VueTypes.integer.def(18),
				minZoom: VueTypes.integer.def(4),
				fit: VueTypes.arrayOf(Number)
			}),
			control: VueTypes.shape({
				zoom: VueTypes.shape({
					show: VueTypes.bool.def(true),
					position: VueTypes.oneOf(['leftTop', 'rightTop']).def('rightTop'),
					style: VueTypes.oneOf(['origin', 'white']).def('origin'),
					duration: VueTypes.integer.def(250),
					delta: VueTypes.integer.def(1),
					zoomInTipLabel: VueTypes.string.def('放大'),
					zoomOutTipLabel: VueTypes.string.def('缩小')
				})
			})
		})
```

 1. tileLayers为初始化的图层，目前仅支持TileLayer并且source为'xyz'。
 2. view为视图初始化，添加了fit后zoom和center的优先级会降低，优先展示fit。其中fit是\[min\[0],min\[1],max\[0],max\[1]],min和max是extent的左下角和有上角点。
 3. control目前只默认添加zoom组件，关于zoom组件，请查看zoom组件对应的内容。

### 事件
1.通过getMap可以获得初始化后的map对象。

### 其他
1.组件采取tailwind.css,需要在外部配置好tailwind.css运行的环境。

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
	<Zoom />
</template>
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
