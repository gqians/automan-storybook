import '../../css/utils.css'
import './global.css'
import { action } from '@storybook/addon-actions'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import Map from '../../components/Map'
import { transform } from 'ol/proj'
// import ButtonMd from './Button.md'

export default {
	title: 'Map',
	component: Map,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'iphone6'
		}
	}
}
export const Basic = () => ({
	components: {
		Map
	},
	template: `
    <Map :config="{
		tileLayers: [{
			sourceType: 'xyz',
			sourceUrl: 'http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6e9650f48c0a7f5212f2243a4af7f14b',
			crossOrigin: 'Anonymous',
			title: '3857_vec',
			zIndex: 0,
			visible: true
		}, {
			sourceType: 'xyz',
			sourceUrl: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6e9650f48c0a7f5212f2243a4af7f14b',
			crossOrigin: 'Anonymous',
			title: '3857_img',
			zIndex: 1,
			visible: false
		}, {
			sourceType: 'xyz',
			sourceUrl: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6e9650f48c0a7f5212f2243a4af7f14b',
			crossOrigin: 'Anonymous',
			title: '3857_cva',
			zIndex: 2,
			visible: true
		}],
		view: {
			center: [${transform([108.06327, 37.66074], 'EPSG:4326', 'EPSG:3857')}],
			zoom: 5,
			maxZoom: 18,
			minZoom: 2,
			fit:[${transform([73, 18], 'EPSG:4326', 'EPSG:3857')},${transform([135, 53.6], 'EPSG:4326', 'EPSG:3857')}]
		},
		control: {
			zoom: {
				show: true,
				duration: 250,
				zoomInTipLabel: '放大',
				zoomOutTipLabel: '缩小',
				delta: 1
			}
		}
	}" @getMap="getMap" />
	`,
	methods: {
		getMap: action('getMap')
	},
})

// 基础使用.story = {
// 	parameters: {
// 		notes: { ButtonMd }
// 	}
// }

// export const 使用viewport插件 = () => ({
// 	components: {
// 		MyButton,
// 	},
// 	template: `
//     <my-button text="点我呀"/>
//     `,
// })
// 使用viewport插件.story = {
//   parameters: {
//     viewport: {
//       defaultViewport: 'iphonex' ,
//       notes: { ButtonMd },
//     },
//   },
// }
