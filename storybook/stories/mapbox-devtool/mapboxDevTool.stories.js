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
	},
	methods: {
	},
});

Basic.story = {
	parameters: {
		notes: { MapMd },
	},
};
