import '../../css/utils.css'
import './global.css'
import { action } from '@storybook/addon-actions'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import Map from '../../components/Map'
import OverView from '../../components/OverviewMap'
import { transform } from 'ol/proj'
import MapMd from './Map.md'
export default {
	title: 'Map',
	component: Map,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset'
		}
	}
}
export const Basic = () => ({
	components: {
		Map
	},
	template: `
    <Map :config="mapConfig" @getMap="getMap" />
	`,
	data() {
		return {
			mapConfig: {
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
					center: transform([108.06327, 37.66074], 'EPSG:4326', 'EPSG:3857'),
					zoom: 5,
					maxZoom: 18,
					minZoom: 2,
					fit: transform([73, 18], 'EPSG:4326', 'EPSG:3857').concat(transform([135, 53.6], 'EPSG:4326', 'EPSG:3857')),
					fitElement: 'root'
				},
				control: {
					zoom: {
						show: true,
						duration: 250,
						zoomInTipLabel: '放大',
						zoomOutTipLabel: '缩小',
						delta: 1,
						position: {
							right: '5rem',
							top: '2rem',
							left: 'auto',
							bottom: 'auto'
						},
						backgroundColor: '#ffffff',
						color: '#999999',
						zoomStyle: 'origin'
					}
				}
			}
		}
	},
	methods: {
		getMap(map) {
			console.dir(map)
		},
		// getMap: action('getMap')
	},
})

Basic.story = {
	parameters: {
		notes: { MapMd }
	}
}

export const AddOverviewMap = () => ({
	components: {
		Map,
		OverView
	},
	template: `
	<div :style="{width:'100%',height:'100%'}">
		<OverView
			:overview-map-config="overviewConfig" @getOverviewMapControl="getOverviewMapControl" />
		<Map :config="mapConfig" @getMap="getMap" />
	</div>
	`,
	data() {
		return {
			mapConfig: {
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
					center: transform([108.06327, 37.66074], 'EPSG:4326', 'EPSG:3857'),
					zoom: 5,
					maxZoom: 18,
					minZoom: 3,
					fit: transform([73, 18], 'EPSG:4326', 'EPSG:3857').concat(transform([135, 53.6], 'EPSG:4326', 'EPSG:3857')),
					fitElement: 'root'
				},
				control: {
					zoom: {
						show: true,
						duration: 250,
						zoomInTipLabel: '放大',
						zoomOutTipLabel: '缩小',
						delta: 1,
						position: {
							right: '5rem',
							top: '2rem',
							left: 'auto',
							bottom: 'auto'
						},
						backgroundColor: '#ffffff',
						color: '#999999',
						zoomStyle: 'circle'
					}
				}
			},
			overviewConfig: {
				tileLayers: [{
					sourceType: 'xyz',
					sourceUrl: 'http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=8224438ab24856da5d3aae952e06b5de',
					crossOrigin: 'Anonymous',
					title: '3857_vec_overview',
					maxZoom: 18,
					minZoom: 0,
				}, {
					sourceType: 'xyz',
					sourceUrl: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=8224438ab24856da5d3aae952e06b5de',
					crossOrigin: 'Anonymous',
					title: '3857_cva_overview',
					maxZoom: 18,
					minZoom: 0,
				}]
			}
		}
	},
	methods: {
		getMap(map) {
			map.addControl(this.overviewControl)
		},
		getOverviewMapControl(control) {
			this.overviewControl = control
		}
	},
})

AddOverviewMap.story = {
	parameters: {
		notes: { MapMd }
	}
}

