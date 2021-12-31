import '../../css/utils.css';
import './global.css';
// import { action } from '@storybook/addon-actions'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Map from '../../components/Map';
import OverView from '../../components/OverviewMap';
import { transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
// import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style } from 'ol/style';
// import liangsan from './liangshanBorder.json';
// import jingsha from './jingshaBorder.json'
// import URI from 'urijs';
// import axios from 'axios';
import { getVectorContext } from 'ol/render';
// import Point from 'ol/geom/Point'
import MapMd from './Map.md';
import OverviewMd from './OverviewMap.md';
// import { toSize } from 'ol/size'
// import URI from 'urijs'
export default {
	title: 'Map',
	component: Map,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset',
		},
	},
};
export const Basic = () => ({
	components: {
		Map,
	},
	template: `
    <div style="height:100%">
        <Map :config="mapConfig" @getMap="getMap" @resetClick="resetClickHandler" />
    </div>
    `,
	data() {
		return {
			mapConfig: {
				tileLayers: [
					{
						sourceType: 'xyz',
						sourceUrl:
							'http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6e9650f48c0a7f5212f2243a4af7f14b',
						crossOrigin: 'Anonymous',
						title: '3857_vec',
						zIndex: 0,
						visible: true,
					},
					{
						sourceType: 'xyz',
						sourceUrl:
							'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6e9650f48c0a7f5212f2243a4af7f14b',
						crossOrigin: 'Anonymous',
						title: '3857_img',
						zIndex: 1,
						visible: false,
					},
					{
						sourceType: 'xyz',
						sourceUrl:
							'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6e9650f48c0a7f5212f2243a4af7f14b',
						crossOrigin: 'Anonymous',
						title: '3857_cva',
						zIndex: 2,
						visible: true,
					},
				],
				view: {
					center: transform([102, 32], 'EPSG:4326', 'EPSG:3857'),
					zoom: 7,
					maxZoom: 13,
					minZoom: 4,
					fitElement: document.getElementById('root'),
				},
				control: {
					zoom: {
						show: true,
						duration: 250,
						zoomInTipLabel: '放大',
						zoomOutTipLabel: '缩小',
						delta: 1,
						position: {
							right: '3rem',
							top: '1.5rem',
							left: 'auto',
							bottom: 'auto',
						},
						resetButton: false,
						backgroundColor: '#ffffff',
						color: '#999999',
						zoomStyle: 'origin',
					},
				},
			},
		};
	},
	methods: {
		getMap(map) {
			const clipLayer = new VectorLayer({
				source: new VectorSource(),
				style: new Style({
					fill: new Fill({
						color: 'rgb(255,0,255)',
					}),
					stroke: new Stroke({
						color: 'red',
					}),
				}),
			});

			const style = new Style({
				fill: new Fill({
					color: 'red',
				}),
			});
			// function addPolyon(converLayer, geo_data) {
			// 	const fts = new GeoJSON().readFeatures(geo_data);
			// 	// // console.log(fts);
			// 	const ft = fts?.[0];
			// 	converLayer.getSource().addFeature(ft);
			// }
			// addPolyon(clipLayer, liangsan);
			const wmtsLayer = map.getLayers().getArray()[0];
			wmtsLayer.on('postrender', function(e) {
				// ctx.filter = 'sepia(80%)'// 设置滤镜值
				e.context.globalCompositeOperation = 'destination-in';
				const vectorContext = getVectorContext(e);
				clipLayer.getSource().forEachFeature(feature => {
					vectorContext.drawFeature(feature, style);
				});
				e.context.globalCompositeOperation = 'source-over';
			});
		},
		// getMap: action('getMap')
		resetClickHandler() {
			// // console.log(1);
		},
	},
});

Basic.story = {
	parameters: {
		notes: { MapMd },
	},
};

export const AddOverviewMap = () => ({
	components: {
		Map,
		OverView,
	},
	template: `
    <div :style="{width:'100%',height:'100%'}">
        <OverView
            :overview-map-config="overviewConfig"
            :box-config="boxConfig"
            :collapse-button-config="collapseButtonConfig"
            @getOverviewMapControl="getOverviewMapControl" />
        <Map :config="mapConfig" @getMap="getMap" />
    </div>
    `,
	data() {
		return {
			mapConfig: {
				tileLayers: [
					{
						sourceType: 'xyz',
						sourceUrl:
							'http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6e9650f48c0a7f5212f2243a4af7f14b',
						crossOrigin: 'Anonymous',
						title: '3857_vec',
						zIndex: 0,
						visible: true,
					},
					{
						sourceType: 'xyz',
						sourceUrl:
							'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6e9650f48c0a7f5212f2243a4af7f14b',
						crossOrigin: 'Anonymous',
						title: '3857_img',
						zIndex: 1,
						visible: false,
					},
					{
						sourceType: 'xyz',
						sourceUrl:
							'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=6e9650f48c0a7f5212f2243a4af7f14b',
						crossOrigin: 'Anonymous',
						title: '3857_cva',
						zIndex: 2,
						visible: true,
					},
				],
				view: {
					center: transform([102.06327, 31.66074], 'EPSG:4326', 'EPSG:3857'),
					zoom: 5,
					maxZoom: 18,
					minZoom: 3,
					fitElement: document.getElementById('root'),
				},
				control: {
					zoom: {
						show: false,
						duration: 250,
						zoomInTipLabel: '放大',
						zoomOutTipLabel: '缩小',
						delta: 1,
						position: {
							right: '5rem',
							top: '2rem',
							left: 'auto',
							bottom: 'auto',
						},
						backgroundColor: '#ffffff',
						color: '#999999',
						zoomStyle: 'circle',
					},
				},
			},
			overviewConfig: {
				tileLayers: [
					{
						sourceType: 'xyz',
						sourceUrl:
							'http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=8224438ab24856da5d3aae952e06b5de',
						crossOrigin: 'Anonymous',
						title: '3857_vec_overview',
						maxZoom: 18,
						minZoom: 0,
					},
					{
						sourceType: 'xyz',
						sourceUrl:
							'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=8224438ab24856da5d3aae952e06b5de',
						crossOrigin: 'Anonymous',
						title: '3857_cva_overview',
						maxZoom: 18,
						minZoom: 0,
					},
				],
				style: {
					bottom: '20px',
					left: '10px',
					right: 'auto',
					top: 'auto',
					backgroundColor: 'transparent',
					margin: '0',
					border: 'solid 2px #4fd1c5',
				},
				collapseLabel: '-',
				label: '+',
				collapsed: false,
				tipLabel: '鹰眼',
			},
			boxConfig: {
				boxBackgroundColor: 'rgba(79,209,197,0.4)',
				boxBorderColor: 'rgb(79,209,197)',
				boxBorderStyle: 'solid',
				boxBorderWidth: '4px',
			},
			collapseButtonConfig: {
				bottom: '9px',
				left: '5px',
				right: 'auto',
				top: 'auto',
				backgroundColor: 'white',
				color: 'turquoise',
			},
		};
	},
	methods: {
		getMap(map) {
			map.addControl(this.overviewControl);
		},
		getOverviewMapControl(control) {
			this.overviewControl = control;
		},
	},
});

AddOverviewMap.story = {
	parameters: {
		notes: { OverviewMd },
	},
};
