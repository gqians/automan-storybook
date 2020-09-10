module.exports = {
	purge: {
		enabled: true,
		content: [
			'./storybook/**/*.js',
			'./storybook/components/**/*.vue'
		]
	},
	theme: {
		extend: {
			width: {
				// 'w-40': '10rem'
			}
		},
		zIndex: {
			'1': 1
		}
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
