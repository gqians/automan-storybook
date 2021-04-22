import '../../css/utils.css';
import './global.css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withKnobs } from '@storybook/addon-knobs';
import ToolBar from '../../components/ToolBar-Select';
// import LegendMd from './Legend.md';
export default {
	title: 'ToolBar',
	component: ToolBar,
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
		ToolBar
	},
	props: {

	},
	template: `
	<div class="h-auto w-1/4">
		<ToolBar></ToolBar>
	</div>
	`,
	data() {
		return {
		};
	},
	methods: {
	},
});

// Default.story = {
// 	parameters: {
// 		notes: { LegendMd }
// 	}
// };
