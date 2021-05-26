<template>
	<div ref="map" class="relative h-full">
		<Zoom
			v-if="config.control.zoom.show"
			:duration="config.control.zoom.duration"
			:zoom-in-tip-label="config.control.zoom.zoomInTipLabel"
			:zoom-out-tip-label="config.control.zoom.zoomOutTipLabel"
			:delta="config.control.zoom.delta"
			:position="config.control.zoom.position"
			:background-color="config.control.zoom.backgroundColor"
			:color="config.control.zoom.color"
			:zoom-style="config.control.zoom.zoomStyle"
			:reset-button="config.control.zoom.resetButton"
			:reset-button-style="config.control.zoom.resetButtonStyle"
			:border-color="config.control.zoom.borderColor"
			:hover-color="config.control.zoom.hoverColor"
			@getZoom="getZoom"
			@resetClick="resetClickHandler"
		/>
	</div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
// import ImageWMS from 'ol/source/ImageWMS'
// import ImageLayer from 'ol/layer/Image'
// import TileWMS from 'ol/source/TileWMS'
import TileWMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import VueTypes from 'vue-types';
import Zoom from '@automan-component/zoom';
import { defaults } from 'ol/control';
import elementResizeDetectorMaker from 'element-resize-detector';
// import axios from 'axios'
export default {
	name: 'Map',
	components: { Zoom },
	props: {
		config: VueTypes.shape({
			tileLayers: VueTypes.arrayOf(
				VueTypes.shape({
					sourceType: VueTypes.oneOf(['xyz', 'wmts']),
					sourceUrl: VueTypes.string,
					crossOrigin: VueTypes.oneOf(['Anonymous']),
					title: VueTypes.string,
					visible: VueTypes.bool,
					zIndex: VueTypes.integer,
					id: VueTypes.string,
					layer: VueTypes.string,
					matrixSet: VueTypes.string,
					format: VueTypes.string,
					projection: VueTypes.any,
					tileSize: VueTypes.array,
					extent: VueTypes.array, // 范围
					loadingExtent: VueTypes.array,
					origin: VueTypes.array,
					resolutions: VueTypes.array,
					matrixIds: VueTypes.array,
					wrapX: VueTypes.bool,
					tileLoadFunction: VueTypes.func,
				}),
			),
			view: VueTypes.shape({
				center: VueTypes.arrayOf(Number),
				zoom: VueTypes.integer,
				maxZoom: VueTypes.integer,
				minZoom: VueTypes.integer,
				fit: VueTypes.arrayOf(Number),
				fitElement: VueTypes.any,
				extent: VueTypes.arrayOf(Number),
			}),
			control: VueTypes.shape({
				zoom: VueTypes.shape({
					show: VueTypes.bool,
					position: VueTypes.shape({
						left: VueTypes.string,
						right: VueTypes.string,
						top: VueTypes.string,
						bottom: VueTypes.string,
					}),
					backgroundColor: VueTypes.string,
					color: VueTypes.string,
					zoomStyle: VueTypes.oneOf(['origin', 'circle']),
					duration: VueTypes.integer,
					delta: VueTypes.integer,
					zoomInTipLabel: VueTypes.string,
					zoomOutTipLabel: VueTypes.string,
					borderColor: VueTypes.string,
					resetButton: VueTypes.bool,
					hoverColor: VueTypes.string,
					resetButtonStyle: VueTypes.shape({
						width: VueTypes.string,
						height: VueTypes.string,
						lineHeight: VueTypes.string,
						size: VueTypes.string,
					}),
				}),
			}),
		}),
	},
	data() {
		return {
			map: null,
			zoom: {
				instance: null,
			},
		};
	},
	mounted() {
		this.initMap();
		this.mapfit();
		this.resize();
	},
	methods: {
		// 初始化地图
		initMap() {
			this.map = new Map({
				target: this.$refs.map,
				view: new View({
					center: this.config.view.center,
					zoom: this.config.view.zoom,
					maxZoom: this.config.view.maxZoom,
					minZoom: this.config.view.minZoom,
					extent: this.config.view.extent,
				}),
				controls: defaults({ zoom: false, rotate: false }),
			});
			this.config.tileLayers.forEach(tileLayer => {
				switch (tileLayer.sourceType) {
				case 'xyz':
					const layer = new TileLayer({
						title: tileLayer.title,
						source: new XYZ({
							crossOrigin: tileLayer.crossOrigin,
							url: tileLayer.sourceUrl,
						}),
					});
					layer.set('id', tileLayer.id);
					layer.setZIndex(tileLayer.zIndex);
					layer.setVisible(tileLayer.visible);
					this.map.addLayer(layer);
					break;
				case 'wmts':
					const imageLayer = new TileLayer({
						title: tileLayer.title,
						extent: tileLayer.loadingExtent,
						source: new TileWMTS({
							// crossOrigin: tileLayer.crossOrigin,
							url: tileLayer.sourceUrl,
							layer: tileLayer.layer,
							// 切片集
							matrixSet: tileLayer.matrixSet,
							format: tileLayer.format,
							projection: tileLayer.projection,
							// 切片信息
							tileGrid: new WMTSTileGrid({
								tileSize: tileLayer.tileSize,
								extent: tileLayer.extent, // 范围
								// origin: tileLayer.origin,
								resolutions: tileLayer.resolutions,
								matrixIds: tileLayer.matrixIds,
							}),
							wrapX: tileLayer.wrapX,
							tileLoadFunction: (imageTile, src) => {
								tileLayer.tileLoadFunction(imageTile, src, this.map);
							},
						}),
					});
					imageLayer.set('id', tileLayer.id);
					imageLayer.setZIndex(tileLayer.zIndex);
					imageLayer.setVisible(tileLayer.visible);
					imageLayer.on('error', () => {
						console.log('err');
					});
					this.map.addLayer(imageLayer);
					break;
				}
			});
			if (this.config.control.zoom.show) {
				this.map.addControl(this.zoom.instance);
			}
			this.$emit('getMap', this.map);
		},
		// 获取zoom
		getZoom(zoom) {
			this.zoom.instance = zoom;
		},
		resetClickHandler() {
			this.$emit('resetClick');
		},
		// 设置resize事件
		resize() {
			if (!this.config.view.fitElement) return;
			const erd = elementResizeDetectorMaker();
			console.log(this.config.view.fitElement);
			if (this.config.view.fitElement instanceof Object) {
				erd.listenTo(this.config.view.fitElement, () => {
					this.map.updateSize();
				});
			} else {
				erd.listenTo(document.getElementById(this.config.view.fitElement), () => {
					this.map.updateSize();
				});
			}
		},
		// 设置自适应大小
		mapfit() {
			if (!this.config.view.fit) return;
			const view = this.map.getView();
			// const min = transform([73, 18], 'EPSG:4326', 'EPSG:3857')
			// const max = transform([135, 53.6], 'EPSG:4326', 'EPSG:3857')
			const extent = this.config.view.fit;
			view.fit([extent[0], extent[1], extent[2], extent[3]], this.map.getSize());
		},
	},
};
</script>

<style scoped>
.map {
	height: 100%;
	position: relative;
}
</style>
