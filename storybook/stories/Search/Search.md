## 基于tailwind的search组件
### 使用

``` bash
yarn add @automan-component/search
```

下载完成后可以在vue中作为组件直接应用

``` javascript
import Search from '@automan-component/search';

export default{
	...
	//在components中注册
	components: { Search }
	methods:{
		searchSubmit(searchString){

		},
		searchInput(searchString){

		},
		searchKeypress(searchString){

		}
	}
}
//使用组件
<template>
	<Search @searchSubmit="searchSubmit" @searchInput="searchInput" @searchKeypress="searchKeypress"/>
</template>
```
### props

``` javascript
placeholder: VueTypes.string.def('请输入信息...'),
classContainerStyle: VueTypes.string.def(
	'w-full relative mx-auto text-gray-600 inline-block align-middle'
),
inputStyle: VueTypes.string.def(
	'w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
),
iconStyle: VueTypes.string.def('text-gray-600 h-4 w-4 fill-current'),
disableSearch: VueTypes.bool.def(false),
refName: VueTypes.string.def('inputSearch'),
timeoutVal: VueTypes.number.def(1000)
```

 1. inputStyle是input输入框的样式。
 2. iconStyle是搜索icon的样式。
 3. disableSearch表示是否禁用输入框。
 4. refName为输入框设置ref id。
 5. timeoutVal表示在多少ms后触发searchKeypress事件。
### 事件
1.searchSubmit:点击回车或点击搜索按钮后触发。
2.searchInput:输入字符后触发。
3.searchKeypress:输入字符后等待timeoutVal ms后触发，在timeoutVal时间内连续输入不会触发。用于判断用户输入完成后触发。

### 其他
1.组件采取tailwindcss,需要在外部配置好tailwindcss运行的环境。

