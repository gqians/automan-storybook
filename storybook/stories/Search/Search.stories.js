import '../../css/utils.css';
import './global.css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withKnobs } from '@storybook/addon-knobs';
import Search from '../../components/Search';
import SearchMd from './Search.md';
// import LegendMd from './Legend.md'
export default {
	title: 'Search',
	component: Search,
	decorators: [withKnobs],
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset',
		},
	},
};
export const Default = () => ({
	components: {
		Search,
	},
	props: {},
	template: `
    <Search />
	`,
	data() {
		return {};
	},
	methods: {},
});
Default.story = {
	parameters: {
		notes: { SearchMd },
	},
};
