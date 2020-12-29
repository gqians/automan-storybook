<template>
  <div />
</template>

<script>
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VueTypes from 'vue-types';
import { OverviewMap } from 'ol/control';
export default {
	name: 'Overview',
	props: {
		overviewMapConfig: VueTypes.shape({
			tileLayers: VueTypes.arrayOf(VueTypes.shape({
				sourceType: VueTypes.oneOf(['xyz']),
				sourceUrl: VueTypes.string,
				crossOrigin: VueTypes.oneOf(['Anonymous']),
				title: VueTypes.string,
				maxZoom: VueTypes.integer,
				minZoom: VueTypes.integer
			})),
			style: VueTypes.shape({
				bottom: VueTypes.string,
				left: VueTypes.string,
				right: VueTypes.string,
				top: VueTypes.string,
				backgroundColor: VueTypes.string,
				margin: VueTypes.string,
				border: VueTypes.string
			}),
			collapseLabel: VueTypes.string,
			label: VueTypes.string,
			collapsed: VueTypes.bool,
			tipLabel: VueTypes.string
		}),
		boxConfig: VueTypes.shape({
			boxBackgroundColor: VueTypes.string,
			boxBorderColor: VueTypes.string,
			boxBorderStyle: VueTypes.string,
			boxBorderWidth: VueTypes.string
		}),
		collapseButtonConfig: VueTypes.shape({
			bottom: VueTypes.string,
			left: VueTypes.string,
			right: VueTypes.string,
			top: VueTypes.string,
			backgroundColor: VueTypes.string,
			color: VueTypes.string,
		})
	},
	data() {
		return {

		};
	},
	computed: {
	},
	mounted() {
		this.initOverView();
		this.$nextTick(() => {
			const box = document.getElementsByClassName('ol-overviewmap-box')[0];
			const collapseButton = document.querySelectorAll('#map .ol-custom-overviewmap.ol-collapsed button')[0];
			const notcollapseButton = document.querySelectorAll('#map .ol-custom-overviewmap:not(.ol-collapsed) button')[0];
			const overviewmap = document.getElementsByClassName('ol-custom-overviewmap')[0];
			const overviewmapMap = document.getElementsByClassName('ol-overviewmap-map')[0];
			const boxStyle = `
				background-color: ${this.boxConfig.boxBackgroundColor};
				border-color: ${this.boxConfig.boxBorderColor};
				border-style: ${this.boxConfig.boxBorderStyle};
				border-width: ${this.boxConfig.boxBorderWidth};
			`;
			const collapseButtonStyle = `
				bottom: ${this.collapseButtonConfig.bottom};
				left: ${this.collapseButtonConfig.left};
				right: ${this.collapseButtonConfig.right};
				top: ${this.collapseButtonConfig.top};
				background-color: ${this.collapseButtonConfig.backgroundColor};
				color: ${this.collapseButtonConfig.color};
			`;
			const overviewmapStyle = `
				bottom: ${this.overviewMapConfig.style.bottom};
				left: ${this.overviewMapConfig.style.left};
				right: ${this.overviewMapConfig.style.right};
				top: ${this.overviewMapConfig.style.top};
				background-color: ${this.overviewMapConfig.style.backgroundColor};
			`;
			const overviewmapMapStyle = `
				margin: ${this.overviewMapConfig.style.margin};
				border: ${this.overviewMapConfig.style.border};
			`;
			box.style.cssText += boxStyle;
			collapseButton && (collapseButton.style.cssText += collapseButtonStyle);
			notcollapseButton && (notcollapseButton.style.cssText += collapseButtonStyle);
			overviewmap && (overviewmap.style.cssText += overviewmapStyle);
			overviewmapMap && (overviewmapMap.style.cssText += overviewmapMapStyle);
		});
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
					});
				}
			});
			const overviewMapControl = new OverviewMap({
				className: 'ol-overviewmap ol-custom-overviewmap',
				layers,
				collapseLabel: this.overviewMapConfig.collapseLabel,
				label: this.overviewMapConfig.label,
				collapsed: this.overviewMapConfig.collapsed,
				tipLabel: this.overviewMapConfig.tipLabel
			});
			// const control = defaultControls().extend(overviewMapControl)
			this.$emit('getOverviewMapControl', overviewMapControl);
		}
	}
};
</script>

<style>
	#map .ol-overviewmap-map{
		width: 400px !important;
		height: 180px !important;
		box-sizing: content-box;
		/* margin: 0 !important; */
		/* padding: 1px 1px 3px; */
	}
	#map .ol-custom-overviewmap:not(.ol-collapsed)  {
		border: none;
	}
	.ol-overviewmap .ol-overviewmap-map{
		border: none;
	}
	#map .ol-custom-overviewmap button{
		outline: none;
		margin: 0;
		position: absolute;
	}
</style>
