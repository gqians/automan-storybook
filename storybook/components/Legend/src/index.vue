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
			compress: VueTypes.bool,
			title: VueTypes.shape({
				text: VueTypes.string,
				textColor: VueTypes.string,
				backgroundColor: VueTypes.string,
				extra: VueTypes.arrayOf(VueTypes.string)
			}),
			content: VueTypes.shape({
				backgroundColor: VueTypes.string,
				extra: VueTypes.arrayOf(VueTypes.string)
			})
		}).def(() => ({
			title: {
				text: 'KDBI',
				textColor: 'text-white',
				backgroundColor: 'bg-indigo-800',
				extra: []
			},
			content: {
				backgroundColor: 'bg-white'
			}
		})),
		linerOption: VueTypes.shape({
			horizontal: VueTypes.bool,
			gradient: VueTypes.bool,
			backgroundImage: VueTypes.string,
			title: VueTypes.shape({
				text: VueTypes.string,
				backgroudColor: VueTypes.string,
				extra: VueTypes.arrayOf(VueTypes.string)
			}),
			extra: VueTypes.arrayOf(VueTypes.string)
		}),
		config: VueTypes.arrayOf(VueTypes.shape({
			color: VueTypes.string,
			value: VueTypes.string,
			key: VueTypes.string
		})).def(() => (
			[{
				color: '#fe0000',
				value: '极高',
				key: 'kdbi-1'
			  }, {
				color: '#ffc801',
				value: '很高',
				key: 'kdbi-2'
			  }, {
				color: '#b6fe8e',
				value: '	高',
				key: 'kdbi-3'
			  }, {
				color: '#33c1ff',
				value: '	中',
				key: 'kdbi-4'
			  }, {
				color: '#0000fe',
				value: '	低',
				key: 'kdbi-5'
			  }]
		))
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
