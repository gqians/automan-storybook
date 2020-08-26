import '../../css/utils.css'
import './global.css'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withKnobs } from '@storybook/addon-knobs'
import Legend from '../../components/Legend'
import LegendMd from './Legend.md'
export default {
	title: 'Legend',
	component: Legend,
	decorators: [withKnobs],
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset'
		}
	}
}
export const Default = () => ({
	components: {
		Legend
	},
	props: {

	},
	template: `
    <Legend :default-option="defaultOption" :config="config" />
	`,
	data() {
		return {
			defaultOption: {
				title: {
					text: 'KDBI',
					textColor: 'text-white',
					backgroundColor: 'bg-indigo-800',
					extra: []
				},
				content: {
					backgroundColor: 'bg-white'
				}
			},
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
		}
	},
	methods: {
	},
})

Default.story = {
	parameters: {
		notes: { LegendMd }
	}
}

export const DefaultCompress = () => ({
	components: {
		Legend
	},
	template: `
    <Legend :default-option="defaultOption" :config="config" />
	`,
	data() {
		return {
			defaultOption: {
				compress: true,
				title: {
					text: 'KDBI',
					textColor: 'text-white',
					backgroundColor: 'bg-indigo-800',
					extra: []
				},
				content: {
					backgroundColor: 'bg-white'
				}
			},
			config: [{
				color: '#46060F',
				value: '>50',
				key: 'tem-1'
			  }, {
				color: '#660917',
				value: '45~50',
				key: 'tem-2'
			  }, {
				color: '#A91517',
				value: '40~45',
				key: 'tem-3'
			  }, {
				color: '#E74B1F',
				value: '35~40',
				key: 'tem-4'
			  }, {
				color: '#F0760C',
				value: '30~35',
				key: 'tem-18'
			  }, {
				color: '#F29B11',
				value: '25~30',
				key: 'tem-5'
			  }, {
				color: '#FFCD4F',
				value: '20~25',
				key: 'tem-6'
			  }, {
				color: '#FFE579',
				value: '15~20',
				key: 'tem-7'
			  }, {
				color: '#FCF1A0',
				value: '10~15',
				key: 'tem-8'
			  }, {
				color: '#FFFFC9',
				value: '5~10',
				key: 'tem-9'
			  }, {
				color: '#EAFFFF',
				value: '0~5',
				key: 'tem-10'
			  }, {
				color: '#C0E7FA',
				value: '-5~0',
				key: 'tem-11'
			  }, {
				color: '#97CFF4',
				value: '-10~-5',
				key: 'tem-12'
			  }, {
				color: '#65B8F7',
				value: '-15~-10',
				key: 'tem-13'
			  }, {
				color: '#3293F5',
				value: '-20~-15',
				key: 'tem-14'
			  }, {
				color: '#1A6BD5',
				value: '-25~-20',
				key: 'tem-15'
			  }, {
				color: '#1743C5',
				value: '-30~-25',
				key: 'tem-16'
			  }, {
				color: '#0F2795',
				value: '<-30',
				key: 'tem-17'
			  }]
		}
	},
	methods: {
	},
})

DefaultCompress.story = {
	parameters: {
		notes: { LegendMd }
	}
}

export const Liner = () => ({
	components: {
		Legend
	},
	template: `
    <Legend :type="type" :liner-option="linerOption" :config="config" />
	`,
	data() {
		return {
			type: 'liner',
			linerOption: {
				horizontal: false,
				gradient: false,
				title: {
					text: '',
					backgroudColor: 'bg-white'
				}
			},
			config: [{
				color: '#46060F',
				value: '>50',
				key: 'tem-1'
			  }, {
				color: '#660917',
				value: '45',
				key: 'tem-2'
			  }, {
				color: '#A91517',
				value: '40',
				key: 'tem-3'
			  }, {
				color: '#E74B1F',
				value: '35',
				key: 'tem-4'
			  }, {
				color: '#F0760C',
				value: '30',
				key: 'tem-18'
			  }, {
				color: '#F29B11',
				value: '25',
				key: 'tem-5'
			  }, {
				color: '#FFCD4F',
				value: '20',
				key: 'tem-6'
			  }, {
				color: '#FFE579',
				value: '15',
				key: 'tem-7'
			  }, {
				color: '#FCF1A0',
				value: '10',
				key: 'tem-8'
			  }, {
				color: '#FFFFC9',
				value: '5',
				key: 'tem-9'
			  }, {
				color: '#EAFFFF',
				value: '0',
				key: 'tem-10'
			  }, {
				color: '#C0E7FA',
				value: '-5',
				key: 'tem-11'
			  }, {
				color: '#97CFF4',
				value: '-10',
				key: 'tem-12'
			  }, {
				color: '#65B8F7',
				value: '-15',
				key: 'tem-13'
			  }, {
				color: '#3293F5',
				value: '-20',
				key: 'tem-14'
			  }, {
				color: '#1A6BD5',
				value: '-25',
				key: 'tem-15'
			  }, {
				color: '#1743C5',
				value: '-30',
				key: 'tem-16'
			  }, {
				color: '#0F2795',
				value: '<-30',
				key: 'tem-17'
			  }]
		}
	},
	methods: {
	},
})

Liner.story = {
	parameters: {
		notes: { LegendMd }
	}
}

export const LinerHorizontal = () => ({
	components: {
		Legend
	},
	template: `
    <Legend :type="type" :liner-option="linerOption" :config="config" />
	`,
	data() {
		return {
			type: 'liner',
			linerOption: {
				horizontal: true,
				gradient: true,
				backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
				title: {
					text: '',
					backgroudColor: 'bg-white'
				}
			},
			config: [{
				color: '#46060F',
				value: '>50',
				key: 'tem-1'
			  }, {
				color: '#660917',
				value: '45',
				key: 'tem-2'
			  }, {
				color: '#A91517',
				value: '40',
				key: 'tem-3'
			  }, {
				color: '#E74B1F',
				value: '35',
				key: 'tem-4'
			  }, {
				color: '#F0760C',
				value: '30',
				key: 'tem-18'
			  }, {
				color: '#F29B11',
				value: '25',
				key: 'tem-5'
			  }, {
				color: '#FFCD4F',
				value: '20',
				key: 'tem-6'
			  }, {
				color: '#FFE579',
				value: '15',
				key: 'tem-7'
			  }, {
				color: '#FCF1A0',
				value: '10',
				key: 'tem-8'
			  }, {
				color: '#FFFFC9',
				value: '5',
				key: 'tem-9'
			  }, {
				color: '#EAFFFF',
				value: '0',
				key: 'tem-10'
			  }, {
				color: '#C0E7FA',
				value: '-5',
				key: 'tem-11'
			  }, {
				color: '#97CFF4',
				value: '-10',
				key: 'tem-12'
			  }, {
				color: '#65B8F7',
				value: '-15',
				key: 'tem-13'
			  }, {
				color: '#3293F5',
				value: '-20',
				key: 'tem-14'
			  }, {
				color: '#1A6BD5',
				value: '-25',
				key: 'tem-15'
			  }, {
				color: '#1743C5',
				value: '-30',
				key: 'tem-16'
			  }, {
				color: '#0F2795',
				value: '<-30',
				key: 'tem-17'
			  }]
		}
	},
	methods: {
	},
})

LinerHorizontal.story = {
	parameters: {
		notes: { LegendMd }
	}
}
