<template>
  <div class="w-full text-center leading-8">
    <div
      :class="['inline-block', 'align-middle', 'border-solid','mr-3','cursor-pointer',...controlStyle.extra]"
      @click="playClickHandler"
    >
      <svg v-show="!play" t="1597224938622" :style="{fill:controlStyle.backgroundColor}" viewBox="0 0 1082 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5022" width="40" height="40" @click="pauseClickHandler"><path d="M385.024 267.776c-24.064 0-43.52 19.456-43.52 43.52v401.408c0 24.064 19.456 43.52 43.52 43.52s43.52-19.456 43.52-43.52V311.296c0.512-24.064-18.944-43.52-43.52-43.52zM697.344 267.776c-24.064 0-43.52 19.456-43.52 43.52v401.408c0 24.064 19.456 43.52 43.52 43.52s43.52-19.456 43.52-43.52V311.296c0.512-24.064-18.944-43.52-43.52-43.52z" p-id="5023" /></svg>
      <svg v-show="play" t="1597225249797" :style="{fill:controlStyle.backgroundColor}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7228" width="40" height="40" @click="showClickHandler"><path d="M804.17792 474.04032L389.0688 187.58656a47.98464 47.98464 0 0 0-67.97312 1.21856 46.8992 46.8992 0 0 0-13.312 32.768c0 14.56128-1.20832 42.48576 0 42.48576V795.648a47.6672 47.6672 0 0 0 48.54784 47.33952 46.8992 46.8992 0 0 0 32.768-13.312L804.17792 543.232a45.9264 45.9264 0 0 0 14.56128-33.98656 44.9024 44.9024 0 0 0-14.56128-35.19488z" p-id="7229" /></svg>
    </div>
    <div :class="['inline-block','w-11/12','align-middle','cursor-pointer',...slider.extra]">
      <VueSlider
        ref="slider"
        v-model="sliderValue"
        :data="preTime"
        :marks="slider.marks"
        :height="slider.height"
        :lazy="slider.lazy"
        :use-keyboard="false"
        :hide-label="slider.hideLabel"
        :tooltip="slider.tooltip"
        :rail-style="slider.railStyle"
        :process-style="slider.processStyle"
        :tooltip-style="slider.tooltipStyle"
        :step-style="slider.stepStyle"
        :step-active-style="slider.stepActiveStyle"
        :label-style="slider.labelStyle"
        :label-active-style="slider.labelActiveStyle"
        :duration="slider.duration"
        @change="changeHandler"
      />
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import dayjs from 'dayjs'
import VueTypes from 'vue-types'
// import Mousetrap from 'mousetrap'
import hotkeys from 'hotkeys-js'

export default {
	name: 'TimeLine',
	components: { VueSlider },
	props: {
		controlStyle: VueTypes.shape({
			backgroundColor: VueTypes.string,
			extra: VueTypes.arrayOf(VueTypes.string)
		}).def(() => ({
			backgroundColor: '#5252fb',
			extra: [' border', 'rounded-full', 'border-purple-900']
		})),
		slider: VueTypes.shape({
			marks: VueTypes.bool,
			height: VueTypes.string,
			lazy: VueTypes.bool,
			useKeyboard: VueTypes.bool,
			hideLabel: VueTypes.bool,
			tooltip: VueTypes.oneOf(['none', 'always', 'hover', 'focus', 'active']),
			duration: VueTypes.number, // 滑动条的过度样式
			railStyle: VueTypes.any, // 轨道的样式
			processStyle: VueTypes.any, // 经度条的样式
			tooltipStyle: VueTypes.any, // 工具提示的样式
			stepStyle: VueTypes.any, // 步长的样式
			stepActiveStyle: VueTypes.any, // 步长激活下的样式
			labelStyle: VueTypes.any, // 标签样式mr-3mr-3
			labelActiveStyle: VueTypes.any, // 标签激活下的样式
			extra: VueTypes.arrayOf(VueTypes.string)
		}).def(() => ({
			marks: true,
			height: '12px',
			lazy: true,
			useKeyboard: true,
			hideLabel: true,
			tooltip: 'always',
			railStyle: {
				backgroundColor: 'rgba(0,0,0,0.4)'
			},
			processStyle: {
				backgroundColor: 'rgb(82,82,251)'
			},
			tooltipStyle: {
				backgroundColor: 'rgb(82,82,251)',
				borderColor: 'rgb(82,82,251)'
			},
			stepStyle: {
				backgroundColor: 'rgba(255,255,255,0.4)',
				width: '1px',
  					borderRadius: 'none'
			},
			extra: ['leading-3']
		})),
		startDate: VueTypes.string.def('2020-08-27'),
		days: VueTypes.integer.def(10),
		dateFormat: VueTypes.string.def('MM-DD'),
		intervals: VueTypes.integer.def(1000)
	},
	data() {
		return {
			play: true,
			sliderValue: dayjs(this.startDate).format(this.dateFormat),
			preTime: [],
			timer: null,
		}
	},
	mounted() {
		this.initTimeLine()
		this.$refs.slider.focus(0)
		hotkeys('left', () => {
			const currentIndex = this.$refs.slider.getIndex()
			this.$refs.slider.setIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex)
		})
		hotkeys('right', () => {
			const currentIndex = this.$refs.slider.getIndex()
			this.$refs.slider.setIndex(currentIndex < this.days - 1 ? currentIndex + 1 : currentIndex)
		})
	},
	updated() {
	},
	methods: {
		playClickHandler() {
			this.play = !this.play
		},
		initTimeLine() {
			const result = []
			for (let i = 0; i < this.days; i++) {
				result.push(dayjs(this.startDate).add(i, 'd').format(this.dateFormat))
			}
			this.preTime = result
		},
		changeHandler(value) {
			this.$emit('timeChange', value)
		},
		showClickHandler() {
			this.autoPlay()
		},
		autoPlay() {
			const curIndex = this.preTime.findIndex((item) => item === this.sliderValue)
			const nextIndex = curIndex + 1 < this.preTime.length ? curIndex + 1 : 0
			this.sliderValue = this.preTime[nextIndex]
			this.$emit('timeChange', this.preTime[nextIndex])
			this.timer = setInterval(() => {
				const curIndex = this.preTime.findIndex((item) => item === this.sliderValue)
				const nextIndex = curIndex + 1 < this.preTime.length ? curIndex + 1 : 0
				this.sliderValue = this.preTime[nextIndex]
				this.$emit('timeChange', this.preTime[nextIndex])
			}, this.intervals)
		},
		pauseClickHandler() {
			clearTimeout(this.timer)
		}
	}
}
</script>

