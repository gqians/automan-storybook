module.exports = {
	purge: {
		enabled: false,
		content: [
			'./storybook/**/*.js',
			'./storybook/components/**/*.vue'
		]
	},
	theme: {
		extend: {
			width: {
				// 'w-40': '10rem'
			},
		},
		// height: {
		// 	'h-13': '33rem'
		// },
		zIndex: {
			'1': 1
		},
	},
	future: {
		removeDeprecatedGapUtilities: true,
	},
	variants: {},
	plugins: [],
	corePlugins: {
		// height: true,
		// width: true
	}
}
