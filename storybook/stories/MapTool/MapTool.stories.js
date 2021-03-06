import '../../css/utils.css';
import './global.css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withKnobs } from '@storybook/addon-knobs';
import MapTool from '../../components/MapTool';
import LegendMd from './Legend.md';
export default {
	title: 'MapTool',
	component: MapTool,
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
		MapTool
	},
	props: {

	},
	template: `
    <MapTool/>
	`,
	data() {
		return {
		};
	},
	methods: {
	},
});

Default.story = {
	parameters: {
		notes: { LegendMd }
	}
};
