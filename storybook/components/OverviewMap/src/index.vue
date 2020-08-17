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
				title: VueTypes.string.def('')
			}))
		})
	},
	data() {
		return {

		}
	},
	computed: {
	},
	mounted() {
		this.initOverView()
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
				collapseLabel: '\u00BB',
				label: '\u00AB',
				collapsed: false
			})
			// const control = defaultControls().extend(overviewMapControl)
			this.$emit('getOverviewMapControl', overviewMapControl)
		}
	}
}
</script>

<style>
  .map .ol-custom-overviewmap,
  .map .ol-custom-overviewmap.ol-uncollapsible {
    bottom: auto;
    left: auto;
    right: 0;
    top: 100px;
  }

  .map .ol-custom-overviewmap:not(.ol-collapsed)  {
    border: 1px solid black;
  }

  .map .ol-custom-overviewmap .ol-overviewmap-map {
    border: none;
    width: 300px;
  }

  .map .ol-custom-overviewmap .ol-overviewmap-box {
    border: 2px solid rgb(82,82,251);
  }

  .map .ol-custom-overviewmap:not(.ol-collapsed) button{
    bottom: auto;
    left: auto;
    right: 1px;
    top: 1px;
  }

  .map .ol-rotate {
    top: 170px;
    right: 0;
  }
</style>
