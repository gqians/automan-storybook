## 基于openlayers的overviewmap组件
### 使用

``` bash
yarn add @automan-component/overviewmap
```

下载完成后可以在vue中作为组件直接应用

``` javascript
import Overview from @automan-component/overviewmap

export default{
	...
	//在components中注册
	components: { Overview },
	methods:{
		getOverviewMapControl(Overview){
			//可以获取到zoom实例
			map.addControl(Overview)//添加到map中
		}
		...
	}
}
//使用组件
<template>
	<Overview @getOverviewMapControl="getOverviewMapControl"/>
</template>
```
### props

``` javascript
overviewMapConfig: VueTypes.shape({ //overviewmap外层配置
    tileLayers: VueTypes.arrayOf(VueTypes.shape({//配置鹰眼图图层，和Map组件类似
        sourceType: VueTypes.oneOf(['xyz']).def('xyz'),
        sourceUrl: VueTypes.string.def(''),
        crossOrigin: VueTypes.oneOf(['Anonymous']).def('Anonymous'),
        title: VueTypes.string.def(''),
        maxZoom: VueTypes.integer,
        minZoom: VueTypes.integer
    })),
    style: VueTypes.shape({//overviewmap部分样式
        bottom: VueTypes.string.def('20px'),
        left: VueTypes.string.def('10px'),
        right: VueTypes.string.def('auto'),
        top: VueTypes.string.def('auto'),
        backgroundColor: VueTypes.string.def('transparent'),
        margin: VueTypes.string.def('0'),
        border: VueTypes.string.def('solid 2px #4fd1c5')
    }),
    collapseLabel: VueTypes.string.def('-'),//overviewmap关闭时显示的符号
    label: VueTypes.string.def('+'),//overviewmap打开时显示的符号
    collapsed: VueTypes.bool.def(true),//初始化时是否呈现打开状态
    tipLabel: VueTypes.string.def('鹰眼')//定义title
}),
boxConfig: VueTypes.shape({//overviewmap内部视野方块的样式
    boxBackgroundColor: VueTypes.string,
    boxBorderColor: VueTypes.string,
    boxBorderStyle: VueTypes.string,
    boxBorderWidth: VueTypes.string
}),
collapseButtonConfig: VueTypes.shape({//overviewmap的两个按钮的样式
    bottom: VueTypes.string.def('7px'),
    left: VueTypes.string.def('3px'),
    right: VueTypes.string.def('auto'),
    top: VueTypes.string.def('auto'),
    backgroundColor: VueTypes.string.def('white'),
    color: VueTypes.string.def('turquoise'),
})
```

### 事件
1.通过getOverviewMapControl可以获得初始化后的OverView对象。

### 其他
1.目前不能动态修改大小
