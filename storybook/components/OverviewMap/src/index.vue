<template>
  <div />
</template>

<script>
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import VueTypes from 'vue-types'
import { OverviewMap } from 'ol/control'
export default {
	name: 'Overview',
	props: {
		overviewMapConfig: VueTypes.shape({
			tileLayers: VueTypes.arrayOf(VueTypes.shape({
				sourceType: VueTypes.oneOf(['xyz']).def('xyz'),
				sourceUrl: VueTypes.string.def(''),
				crossOrigin: VueTypes.oneOf(['Anonymous']).def('Anonymous'),
				title: VueTypes.string.def(''),
				maxZoom: VueTypes.integer,
				minZoom: VueTypes.integer
			})),
		}),
		boxBackgroundColor: VueTypes.string,
		boxBorderColor: VueTypes.string,
		boxBorderStyle: VueTypes.string,
		boxBorderWidth: VueTypes.string
	},
	data() {
		return {

		}
	},
	computed: {
	},
	mounted() {
		this.initOverView()
		this.$nextTick(() => {
			const box = document.getElementsByClassName('ol-overviewmap-box')[0]
			console.dir(box)
			console.log(box.style.backgroundColor)
			box.style.backgroundColor = this.boxBackgroundColor
			box.style.borderColor = this.boxBorderColor
			box.style.borderStyle = this.boxBorderStyle
			box.style.borderWidth = this.boxBorderWidth
		})
	},
	methods: {
		initOverView() {
			const layers = this.overviewMapConfig.tileLayers.map((tileLayer) => {
				switch (tileLayer.sourceType) {
				case 'xyz':
					return new TileLayer({
						title: tileLayer.title,
						source: new XYZ({
							crossOrigin: tileLayer.crossOrigin,
							url: tileLayer.sourceUrl
						})
					})
				}
			})
			const overviewMapControl = new OverviewMap({
				className: 'ol-overviewmap ol-custom-overviewmap',
				layers,
				collapseLabel: '-',
				label: '+',
				collapsed: false,
			})
			// const control = defaultControls().extend(overviewMapControl)
			this.$emit('getOverviewMapControl', overviewMapControl)
		}
	}
}
</script>

<style>
	#map .ol-custom-overviewmap,
	#map .ol-custom-overviewmap.ol-uncollapsible {
		bottom: 20px;
		left: 10px;
		right: auto;
		top: auto;
	}
	#map .ol-overviewmap-map{
		width: 400px !important;
		height: 180px !important;
		/* margin: 0 !important;
		padding: 1px 1px 3px; */
	}
	#map .ol-custom-overviewmap:not(.ol-collapsed)  {
		border: 1px solid black;
	}
	#map .ol-overviewmap.ol-custom-overviewmap.ol-unselectable.ol-control{
		height: 182px;
		background-color: transparent;
	}
	#map .ol-custom-overviewmap .ol-overviewmap-map {
		border: none;
		width: 300px;
	}
	.ol-overviewmap .ol-overviewmap-map{
		margin:0;
	}
	#map .ol-custom-overviewmap:not(.ol-collapsed) button{
		display: none;
		/* bottom: auto;
		left: auto;
		right: 1px;
		top: 1px; */
	}
</style>
