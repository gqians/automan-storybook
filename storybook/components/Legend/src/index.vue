<template>
  <div>
    <div v-if="type === 'default'" class="w-40 shadow-md">
      <div
        class="w-full leading-10 text-center text-base"
        :class="[defaultOption.title.textColor,defaultOption.title.backgroundColor,...defaultOption.title.extra]"
      >
        {{ defaultOption.title.text }}
      </div>
      <div
        class="w-full"
        :class="[defaultOption.content.backgroundColor,...defaultOption.content.extra]"
      >
        <div v-for="i in config" :key="i.key" :class="[...defaultStyle.itemObject]">
          <span
            :class="[...defaultStyle.squreObject]"
            :style="{ backgroundColor: i.color }"
          />
          <span class="value">{{ i.value }}</span>
        </div>
      </div>
    </div>
    <div v-if="type==='liner'">
      <span :class="linerOption.titleBackgroudColor">{{ linerOption.title }}</span>
      <span
        v-for="i in config"
        :key="i.key"
        :style="{
          backgroundColor: i.color,
          color: findTextColor(i.color) }"
      >
        {{ i.value }}
      </span>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
import TEXTColor from 'textcolor'
export default {
	name: 'Legend',
	props: {
		type: VueTypes.oneOf(['default', 'liner', 'gradient']).def('default'),
		defaultOption: VueTypes.shape({
			compress: VueTypes.bool.def(false),
			title: VueTypes.shape({
				text: VueTypes.string,
				textColor: VueTypes.string,
				backgroundColor: VueTypes.string,
				extra: VueTypes.arrayOf(VueTypes.string)
			}),
			content: VueTypes.shape({
				backgroundColor: VueTypes.string.def('bg-white'),
				extra: VueTypes.arrayOf(VueTypes.string)
			})
		}),
		linerOption: VueTypes.shape({
			horizontal: VueTypes.bool.def(false),
			title: VueTypes.string,
			titleBackgroudColor: VueTypes.string.def('bg-white')
		}),
		gradientOption: VueTypes.shape({}),
		config: VueTypes.arrayOf(VueTypes.shape({
			color: VueTypes.string,
			value: VueTypes.string,
			key: VueTypes.string
		}))
	},
	data() {
		return {

		}
	},
	computed: {
		defaultStyle: function() {
			const finalClass = {
				itemObject: ['flex justify-between text-sm items-center px-8'],
				squreObject: []
			}
			console.log(this.type)
			if (this.type !== 'default') return finalClass
			if (this.defaultOption.compress) {
				finalClass.itemObject.push(['leading-7'])
				finalClass.squreObject.push(['w-5', 'h-2'])
			} else {
				finalClass.itemObject.push(['leading-10'])
				finalClass.squreObject.push(['w-4', 'h-4'])
			}
			return finalClass
		}
	},
	mounted() {
	},
	methods: {
		findTextColor: TEXTColor.findTextColor
	}
}
</script>

<style scoped>
</style>
