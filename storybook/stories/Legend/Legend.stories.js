import '../../css/utils.css'
import './global.css'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import Legend from '../../components/Legend'
import LegendMd from './Legend.md'
export default {
	title: 'Legend',
	component: Legend,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset'
		}
	}
}
export const Basic = () => ({
	components: {
		Legend
	},
	template: `
    <Legend :legend-option="legendOption" />
	`,
	data() {
		return {
			legendOption: {
				title: 'KBDI',
				config: [{
				  color: '#fe0000',
				  value: '极高',
				  key: 'kdbi-1'
				}, {
				  color: '#ffc801',
				  value: '很高',
				  key: 'kdbi-2'
				}, {
				  color: '#b6fe8e',
				  value: '高',
				  key: 'kdbi-3'
				}, {
				  color: '#33c1ff',
				  value: '中',
				  key: 'kdbi-4'
				}, {
				  color: '#0000fe',
				  value: '低',
				  key: 'kdbi-5'
				}]
			  }
		}
	},
	methods: {
	},
})

Basic.story = {
	parameters: {
		notes: { LegendMd }
	}
}
