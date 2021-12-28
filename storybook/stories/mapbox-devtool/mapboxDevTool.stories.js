// import { action } from '@storybook/addon-actions'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import MapMd from './Map.md';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxDevtool from '../../components/MapboxDevTool';
export default {
	title: 'Mapbox',
	// component: Map,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
			defaultViewport: 'reset',
		},
	},
};
export const Basic = () => ({
	template: `
    <div style="height:100%" id="map">
    </div>
    `,
	data() {
		return {
		};
	},
	mounted() {
		// mapboxDevtool();
		mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ibGFicyIsImEiOiJwVlg0cnZnIn0.yhekddtKwZohGoORaWjqIw';
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			center: [-74.5, 40], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});
		map.addControl(
			// eslint-disable-next-line new-cap
			new mapboxDevtool({
				title: 'test'
			})
		);
		map.on('load', () => {
			this.addTduRasterLayer(map);
		});
	},
	methods: {
		addTduRasterLayer(map) {
			map.addSource('tdt-img-tiles', {
				type: 'raster',
				tiles: [
					'http://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=' +
						'4b01c1b56c6bcba2eb9b8e987529c44f'
				],
				tileSize: 256
			});
			map.addSource('tdt-tiles', {
				type: 'raster',
				tiles: [
					'http://t0.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=' +
						'4b01c1b56c6bcba2eb9b8e987529c44f'
				],
				tileSize: 256
			});
			map.addLayer({
				id: 'tdt-img-tiles',
				type: 'raster',
				source: 'tdt-img-tiles',
				minzoom: 9,
				maxzoom: 17
			});
			map.addLayer({
				id: 'tdt-tiles',
				type: 'raster',
				source: 'tdt-tiles',
				minzoom: 9,
				// maxzoom: 18
			});
		}
	},
});

Basic.story = {
	parameters: {
		notes: { MapMd },
	},
};
