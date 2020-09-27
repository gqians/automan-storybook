## 基于vue的legend组件
### 使用

``` bash
yarn add @automan-component/legend
```

下载完成后可以在vue中作为组件直接应用

``` javascript
import Map from @automan-component/legend

export default{
	...
	//在components中注册
	components: { Legend }
}
//使用组件
<template>
	<Legend />
</template>
```
### props

``` javascript
type: VueTypes.oneOf(['default', 'liner']).def('default'),//选择样式
// 选择样式未default后需要填写defaultOption对应的内容
defaultOption: VueTypes.shape({
    compress: VueTypes.bool.def(false),//当数据量多是可以开启压缩模式
    title: VueTypes.shape({
        text: VueTypes.string,//标题
        textColor: VueTypes.string,//标题文字颜色
        backgroundColor: VueTypes.string,//标题背景颜色
        extra: VueTypes.arrayOf(VueTypes.string).def([])//附加额外的class给标题，class采用tailwindcss类名
    }),
    content: VueTypes.shape({
        backgroundColor: VueTypes.string.def('bg-white'),//主题内容背景颜色
        extra: VueTypes.arrayOf(VueTypes.string).def([])//加额外的class给标题，class采用tailwindcss类名
    })
}),
// 选择样式未default后需要填写defaultOption对应的内容
linerOption: VueTypes.shape({
    horizontal: VueTypes.bool.def(false),//选择legend方向是水平还是垂直的
    gradient: VueTypes.bool.def(true),// 选择时候开启渐变色
    backgroundImage: VueTypes.string,//当选择开启渐变时启用，填写background-image
    title: VueTypes.shape({//见default的相对应配置
        text: VueTypes.string,
        backgroudColor: VueTypes.string.def('bg-white'),
        extra: VueTypes.arrayOf(VueTypes.string).def([])
    }),
    extra: VueTypes.arrayOf(VueTypes.string).def([])
}),
config: VueTypes.arrayOf(VueTypes.shape({
    color: VueTypes.string,
    value: VueTypes.string,//在liner模式下，文字内嵌，所以文字会随着背景颜色的变化更改。目前只有黑色和白色的文字颜色。
    key: VueTypes.string
}))
```

### 事件
1.无。

### 其他
1.组件采取tailwind.css,需要在外部配置好tailwindcss运行的环境。
