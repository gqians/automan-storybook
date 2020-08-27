<template>
  <div id="map" class="relative h-full">
    <Zoom
      :duration="config.control.zoom.duration"
      :zoom-in-tip-label="config.control.zoom.zoomInTipLabel"
      :zoom-out-tip-label="config.control.zoom.zoomOutTipLabel"
      :delta="config.control.zoom.delta"
      :position="config.control.zoom.position"
      :background-color="config.control.zoom.backgroundColor"
      :color="config.control.zoom.color"
      :zoom-style="config.control.zoom.zoomStyle"
      @getZoom="getZoom"
    />
  </div>
</template>

<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import VueTypes from 'vue-types'
import Zoom from '@automan-component/zoom'
import { defaults } from 'ol/control'
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
	name: 'Map',
	components: { Zoom },
	props: {
		config: VueTypes.shape({
			tileLayers: VueTypes.arrayOf(VueTypes.shape({
				sourceType: VueTypes.oneOf(['xyz']).def('xyz'),
				sourceUrl: VueTypes.string.def(''),
				crossOrigin: VueTypes.oneOf(['Anonymous']).def('Anonymous'),
				title: VueTypes.string.def(''),
				visible: VueTypes.bool.def(true),
				zIndex: VueTypes.integer
			})),
			view: VueTypes.shape({
				center: VueTypes.arrayOf(Number),
				zoom: VueTypes.integer,
				maxZoom: VueTypes.integer,
				minZoom: VueTypes.integer,
				fit: VueTypes.arrayOf(Number),
				fitElement: VueTypes.string
			}),
			control: VueTypes.shape({
				zoom: VueTypes.shape({
					show: VueTypes.bool,
					position: VueTypes.shape({
						left: VueTypes.string,
						right: VueTypes.string,
						top: VueTypes.string,
						bottom: VueTypes.string
					}),
					backgroundColor: VueTypes.string,
					color: VueTypes.string,
					zoomStyle: VueTypes.oneOf(['origin', 'circle']),
					duration: VueTypes.integer,
					delta: VueTypes.integer,
					zoomInTipLabel: VueTypes.string,
					zoomOutTipLabel: VueTypes.string
				})
			})
		})
	},
	data() {
		return {
			map: null,
			zoom: {
				instance: null
			}
		}
	},
	mounted() {
		this.initMap()
		this.mapfit()
		this.resize()
	},
	methods: {
		// 初始化地图
		initMap() {
			this.map = new Map({
				target: 'map',
				view: new View({
					center: this.config.view.center,
					zoom: this.config.view.zoom,
					maxZoom: this.config.view.maxZoom,
					minZoom: this.config.view.minZoom
				}),
				controls: defaults({ zoom: false, rotate: false })
			})
			this.config.tileLayers.forEach(tileLayer => {
				switch (tileLayer.sourceType) {
				case 'xyz':
					const layer = new TileLayer({
						title: tileLayer.title,
						source: new XYZ({
							crossOrigin: tileLayer.crossOrigin,
							url: tileLayer.sourceUrl
						})
					})
					layer.setZIndex(tileLayer.zIndex)
					layer.setVisible(tileLayer.visible)
					this.map.addLayer(layer)
				}
			})
			if (this.config.control.zoom.show) this.map.addControl(this.zoom.instance)
			this.$emit('getMap', this.map)
		},
		// 获取zoom
		getZoom(zoom) {
			this.zoom.instance = zoom
		},
		// 设置resize事件
		resize() {
			if (!this.config.view.fitElement) return
			const erd = elementResizeDetectorMaker()
			erd.listenTo(document.getElementById(this.config.view.fitElement), () => {
				this.mapfit()
			})
		},
		// 设置自适应大小
		mapfit() {
			if (!this.config.view.fit) return
			const view = this.map.getView()
			// const min = transform([73, 18], 'EPSG:4326', 'EPSG:3857')
			// const max = transform([135, 53.6], 'EPSG:4326', 'EPSG:3857')
			const extent = this.config.view.fit
			view.fit([extent[0], extent[1], extent[2], extent[3]], this.map.getSize())
		}
	}
}
</script>

<style scoped>
.map{
  height:100%;
  position: relative;
}
</style>
