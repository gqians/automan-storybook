// postcss.config.js
// console.log(process.env.NODE_ENV)
// process.env.NODE_ENV = 'production'
const purgecss = require('@fullhuman/postcss-purgecss')({
	// Specify the paths to all of the template files in your project
	content: [
	  './storybook/**/*.js',
	  './storybook/components/**/*.vue',
	  // etc.
	],

	// This is the function used to extract class names from your templates
	defaultExtractor: content => {
	  // Capture as liberally as possible, including things like `h-(screen-1.5)`
	  const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

	  // Capture classes within other delimiters like .block(class="w-1/2") in Pug
	  const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

	  return broadMatches.concat(innerMatches)
	}
})
module.exports = {
	plugins: [
		require('postcss-import')(),
		require('tailwindcss'),
		require('autoprefixer'),
		...process.env.NODE_ENV === 'production'
			? [purgecss]
			: []
		// production &&
		//     purgecss({
		//     	content: ['./**/*.html', './**/*.vue'],
		//     	defaultExtractor: (content) => {
		//     		const regExp = new RegExp(/[A-Za-z0-9-_:/]+/g)

		//     		const matchedTokens = []

		//     		let match = regExp.exec(content)
		//     		// To make sure that you do not lose any tailwind classes used in class directive.
		//     		// https://github.com/tailwindcss/discuss/issues/254#issuecomment-517918397
		//     		while (match) {
		//     			if (match[0].startsWith('class:')) {
		//     				matchedTokens.push(match[0].substring(6))
		//     			} else {
		//     				matchedTokens.push(match[0])
		//     			}

		//     			match = regExp.exec(content)
		//     		}

		//     		return matchedTokens
		//     	}
		//     })
	]
}
