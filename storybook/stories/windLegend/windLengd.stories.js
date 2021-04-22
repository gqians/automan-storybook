import '../../css/utils.css';
import './global.css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withKnobs } from '@storybook/addon-knobs';
import Legend from '../../components/windLegend';
// import LegendMd from './Legend.md';
export default {
	title: 'windLegend',
	component: Legend,
	decorators: [withKnobs],
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset'
		}
	}
};
export const Default = () => ({
	components: {
		Legend
	},
	props: {

	},
	template: `
    <Legend />
	`,
	data() {
		return {};
	},
	methods: {
	},
});

// Default.story = {
// 	parameters: {
// 		notes: { LegendMd }
// 	}
// };
