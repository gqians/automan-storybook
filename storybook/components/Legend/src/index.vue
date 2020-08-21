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
    <div
      v-if="type==='liner'"
      :class="[...linerStyle.content]"
      :style="{
        backgroundImage: linerOption.gradient? linerOption.backgroundImage || '' : ''
      }"
    >
      <span
        v-if="linerOption.title.text"
        :class="[linerOption.title.backgroudColor,...linerStyle.span,...linerOption.title.extra]"
      >
        {{ linerOption.title.text }}
      </span>
      <span
        v-for="i in config"
        :key="i.key"
        :class="[...linerStyle.span,...linerOption.extra]"
        :style="{
          backgroundColor: linerOption.gradient ? '' : i.color,
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
		type: VueTypes.oneOf(['default', 'liner']).def('default'),
		defaultOption: VueTypes.shape({
			compress: VueTypes.bool.def(false),
			title: VueTypes.shape({
				text: VueTypes.string,
				textColor: VueTypes.string,
				backgroundColor: VueTypes.string,
				extra: VueTypes.arrayOf(VueTypes.string).def([])
			}),
			content: VueTypes.shape({
				backgroundColor: VueTypes.string.def('bg-white'),
				extra: VueTypes.arrayOf(VueTypes.string).def([])
			})
		}),
		linerOption: VueTypes.shape({
			horizontal: VueTypes.bool.def(false),
			gradient: VueTypes.bool.def(true),
			backgroundImage: VueTypes.string,
			title: VueTypes.shape({
				text: VueTypes.string,
				backgroudColor: VueTypes.string.def('bg-white'),
				extra: VueTypes.arrayOf(VueTypes.string).def([])
			}),
			extra: VueTypes.arrayOf(VueTypes.string).def([])
		}),
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
			if (this.type !== 'default') return finalClass
			if (this.defaultOption.compress) {
				finalClass.itemObject.push(['leading-7'])
				finalClass.squreObject.push(['w-5', 'h-2'])
			} else {
				finalClass.itemObject.push(['leading-10'])
				finalClass.squreObject.push(['w-4', 'h-4'])
			}
			return finalClass
		},
		linerStyle: function() {
			if (this.type !== 'liner') return []
			const finalClass = {
				content: ['inline-flex', 'content-center'],
				span: ['text-center']
			}
			if (this.linerOption.horizontal) {
				finalClass.span.push('w-8')
				finalClass.content.push(['flex-row'])
			} else {
				finalClass.span.push('w-10')
				finalClass.content.push(['flex-col'])
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
