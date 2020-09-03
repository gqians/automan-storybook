import '../../css/utils.css'
import './global.css'
// import { action } from '@storybook/addon-actions'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import TimeLine from '../../components/TimeLine'
import TimeLineMd from './TimeLine.md'
export default {
	title: 'TimeLine',
	component: TimeLine,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset'
		}
	}
}
export const Basic = () => ({
	components: {
		TimeLine
	},
	template: `
	<div class="absolute z-1 right-0 left-0 m-auto w-8/12 bottom-2">
		<TimeLine
		:controlStyle="controlStyle"
		:slider="slider"
		@timeChange="timeChange"
		:startDate="startDate"
		:days="days"
		:dateFormat="dateFormat"
		:intervals="intervals"
	/>
	</div>
	`,
	data() {
		return {
			controlStyle: {
				backgroundColor: '#5252fb',
				extra: [' border', 'rounded-full', 'border-purple-900']
			},
			slider: {
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
			},
			startDate: '2020-08-27',
			days: 13,
			dateFormat: 'MM-DD',
			intervals: 1000
		}
	},
	methods: {
		timeChange(time) {
			// console.dir(time)
		},
	},
})

Basic.story = {
	parameters: {
		notes: { TimeLineMd }
	}
}
