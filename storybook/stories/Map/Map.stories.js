import '../../css/utils.css'
import './global.css'
// import { action } from '@storybook/addon-actions'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import Map from '../../components/Map'
import OverView from '../../components/OverviewMap'
import { transform } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import { Vector as VectorLayer } from 'ol/layer'
import GeoJSON from 'ol/format/GeoJSON'
import { Fill, Icon, Stroke, Style } from 'ol/style'
import { Circle, Point } from 'ol/geom'
import { easeIn } from 'ol/easing'
import liangsan from './liangshanBorder.json'
import { getVectorContext } from 'ol/render'
import dc from './doubleCircle.svg'
// import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import MapMd from './Map.md'
import OverviewMd from './OverviewMap.md'
// import { toSize } from 'ol/size'
import URI from 'urijs'
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
	<div style="height:100%">
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
					visible: false
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
					visible: false
				}, {
					sourceType: 'wmts',
					sourceUrl: 'http://localhost:8001/geoserver/gwc/service/wmts',
					crossOrigin: 'Anonymous',
					title: 'googlewmts',
					layer: 'LS_BaseMap:L04',
					matrixSet: 'EPSG:3857',
					format: 'image/png',
					tileSize: [256, 256],
					loadingExtent: [11138622.9106820914894342, 3005026.1373932794667780, 11563449.6935122832655907, 3414672.2973421183414757],
					extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34], // 范围
					origin: [-20037508.34, -20037508.34],
					resolutions: [9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033],
					matrixIds: ['EPSG:3857:4', 'EPSG:3857:5', 'EPSG:3857:6', 'EPSG:3857:7', 'EPSG:3857:8', 'EPSG:3857:9', 'EPSG:3857:10', 'EPSG:3857:11', 'EPSG:3857:12', 'EPSG:3857:13'],
					tileLoadFunction: (imageTile, src, map) => {
						const zoom = Math.round(map.getView().getZoom())
						src = URI(src).setSearch({ layer: `LS_BaseMap:L${zoom < 10 ? '0' + zoom : zoom}`, TileMatrix: `EPSG:3857:${zoom}` })
						// console.log(Math.floor(zoom))
						imageTile.getImage().src = src
					},
					wrapX: false,
					zIndex: 3,
					visible: true
				}],
				view: {
					center: transform([102, 27], 'EPSG:4326', 'EPSG:3857'),
					zoom: 7,
					maxZoom: 13,
					minZoom: 4,
					fit: [11138622.9106820914894342, 3005026.1373932794667780, 11563449.6935122832655907, 3414672.2973421183414757],
					fitElement: document.getElementById('root')
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
			// const popup = new Overlay({
			// 	element: document.getElementById('pop'),
			// 	positioning: 'bottom-center',
			// 	stopEvent: false,
			// 	offset: [0, -50],
			// })
			// map.addOverlay(popup)
			// const popcorn = document.getElementById('pop')
			// const tooltip = document.getElementById('tooltip')
			// createPopper(popcorn, tooltip)
			// map.on('click', function(evt) {
			// 	var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
			// 	  return feature
			// 	})
			// 	if (feature) {
			// 	  var coordinates = feature.getGeometry().getCoordinates()
			// 	  console.log(coordinates)
			// 	  popup.setPosition(coordinates)
			// 	}
			// })
			const clipLayer = new VectorLayer({
				source: new VectorSource(),
				style: new Style({
					fill: new Fill({
						color: 'rgba(255,0,255,0)'
					}),
					stroke: new Stroke({
						color: 'red'
					}),
				})
			})

			const style = new Style({
				fill: new Fill({
				  color: 'red',
				})
			})
			function addPolyon(converLayer, geo_data) {
				const fts = new GeoJSON().readFeatures(geo_data)
				const ft = fts?.[0]
				converLayer.getSource().addFeature(ft)
				return converLayer
			}
			const newcliplayer = addPolyon(clipLayer, liangsan)
			const wmtsLayer = map.getLayers().getArray()[3]
			const sourceL = new VectorSource({
				wrapX: false,
			})
			const vectorL = new VectorLayer({
				source: sourceL,
				style: new Style({
					// image: new CircleStyle({
					// 	radius: 10,
					// 	color: 'yellow'
					// }),
					fill: new Fill({
						color: 'rgba(0,0,0,0)'
					})
				})
			})
			vectorL.setZIndex(6)
			map.addLayer(vectorL)
			sourceL.on('addfeature', function(e) {
				const feature = e.feature
				const center = feature.getGeometry().getCenter()
				// console.log('add feature')
				// var start = new Date().getTime()
				const duration = 8000
				var radius = 5.047288482140931
				wmtsLayer.on('postrender', (e) => {
					console.log(radius)
					const vectorContext = getVectorContext(e)
					// const resolution = map.getView().getResolution()
					// const frameState = e.frameState
					const elapsed = radius
					const elapsedRatio = elapsed * 100 / duration
					radius = easeIn(elapsedRatio) * 100 + 5
					// const opacity = easeOut(1 - elapsedRatio)
					const style2 = new Style({
						image: new Icon({
							crossOrigin: 'anonymous',
							src: dc,
							scale: 0.2,
						}),
					})
					const style3 = new Style({
						stroke: new Stroke({
							color: 'red'
						}),
						fill: new Fill({
							color: `rgba(180,132,132,0.2)`
						})
					})
					if (elapsed > duration) {
						radius = 0
						// unByKey(listenerKey)
						// return
					}
					// e.context.globalCompositeOperation = 'source-over'
					vectorContext.drawFeature(new Feature(new Point(center), 8000), style2)
					// console.log(feature)
					vectorContext.drawFeature(new Feature(new Circle(transform([102, 28.4], 'EPSG:4326', 'EPSG:3857'), 8000)), style3)
					vectorContext.drawFeature(new Feature(new Circle(transform([102, 28.4], 'EPSG:4326', 'EPSG:3857'), radius)), style3)
					// map.render()
				})
				// flash(e.feature);
			})
			sourceL.addFeature(new Feature(new Circle(transform([102, 28.4], 'EPSG:4326', 'EPSG:3857'), 8000)))
			wmtsLayer.on('postrender', function(e) {
				// var ctx = e.context
				// ctx.filter = 'sepia(80%)'// 设置滤镜值
				e.context.globalCompositeOperation = 'destination-in'
				const vectorContext = getVectorContext(e)
				newcliplayer.getSource().forEachFeature(feature => {
					vectorContext.drawFeature(feature, style)
				})
			})
			map.on('pointermove', function(e) {
				var pixel = map.getEventPixel(e.originalEvent)
				var hit = map.hasFeatureAtPixel(pixel)
				console.log(hit)
				// map.getTarget().style.cursor = hit ? 'pointer' : ''
			  })
			// test
			function createStyle(src, img) {
				return new Style({
					image: new Icon({
						// anchor: [0.5, 0.96],
						crossOrigin: 'anonymous',
						src: src,
						img: img,
						// size: toSize([100, 100]),
						scale: 0.3,
						imgSize: img ? [img.width, img.height] : undefined,
					})
				})
			}
			function createStyleClone() {
				return new Style({
					stroke: new Stroke({
						color: 'red'
					}),
					fill: new Fill({
						color: 'rgba(180,132,132,0.3)'
					})
				})
			}
			const iconFeature = new Feature(new Point(transform([102, 28], 'EPSG:4326', 'EPSG:3857')))
			iconFeature.set('style', createStyle(dc, undefined))
			const iconFeatureClone = new Feature(new Circle(transform([102, 28], 'EPSG:4326', 'EPSG:3857'), 8000))
			iconFeatureClone.set('style', createStyleClone())
			const vectorLayer = new VectorLayer({
				style: function(feature) {
				  return feature.get('style')
				},
				source: new VectorSource({ features: [iconFeature, iconFeatureClone] })
			})
			vectorLayer.setZIndex(5)
			map.addLayer(vectorLayer)
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
					fitElement: document.getElementById('root')
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
				}],
				style: {
					bottom: '20px',
					left: '10px',
					right: 'auto',
					top: 'auto',
					backgroundColor: 'transparent',
					margin: '0',
					border: 'solid 2px #4fd1c5'
				},
				collapseLabel: '-',
				label: '+',
				collapsed: false,
				tipLabel: '鹰眼'
			},
			boxConfig: {
				boxBackgroundColor: 'rgba(79,209,197,0.4)',
				boxBorderColor: 'rgb(79,209,197)',
				boxBorderStyle: 'solid',
				boxBorderWidth: '4px'
			},
			collapseButtonConfig: {
				bottom: '9px',
				left: '5px',
				right: 'auto',
				top: 'auto',
				backgroundColor: 'white',
				color: 'turquoise'
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
		notes: { OverviewMd }
	}
}

