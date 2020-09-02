import Draw from 'ol/interaction/Draw'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { unByKey } from 'ol/Observable.js'
import Overlay from 'ol/Overlay'
import { getArea, getLength } from 'ol/sphere.js'
import { LineString, Polygon } from 'ol/geom.js'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js'
function hasDrawLayer(map, layerId) {
	const layers = map.getLayers()
	let has = false
	let effectiveLayer = null
	layers.forEach((layer) => {
	  // console.log(layer.get('id'))
	  if (layer.get('id') === layerId) {
			has = true
			effectiveLayer = layer
	  }
	})
	return { has, effectiveLayer }
}

export function	measure(map, measureType, layerStyle = null, drawStyle = null, layerId = 'lineAndArea', overlayId = 'measureOverlay', continuePolygonMsg = '', continueLineMsg = '') {
	layerStyle = layerStyle || new Style({
		fill: new Fill({
			color: 'rgba(255, 255, 0, 0.2)'
		}),
		stroke: new Stroke({
			color: '#ffcc33',
			width: 2
		}),
		image: new CircleStyle({
			radius: 7,
			fill: new Fill({
				color: '#ffcc33'
			})
		})
	})
	drawStyle = drawStyle || new Style({
		fill: new Fill({
			color: 'rgba(255, 255, 0, 0.2)'
		}),
		stroke: new Stroke({
			color: 'rgba(255, 255, 0, 1)',
			lineDash: [10, 10],
			width: 2
		}),
		image: new CircleStyle({
			radius: 5,
			stroke: new Stroke({
				color: 'rgba(255, 255, 0, 0.7)'
			}),
			fill: new Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			})
		})
	})
	if (!hasDrawLayer(map, layerId).has) {
		const source = new VectorSource()
		const vector = new VectorLayer({
			id: layerId,
			source: source,
			style: layerStyle
		})
		map.addLayer(vector)
		  }
		  const effectiveLayer = hasDrawLayer(map, layerId).effectiveLayer
		  const source = effectiveLayer.getSource()
	/**
     * Currently drawn feature.
     * @type {module:ol/Feature~Feature}
     */
	let sketch

	/**
     * The help tooltip element.
     * @type {Element}
     */
	let helpTooltipElement

	/**
     * Overlay to show the help messages.
     * @type {module:ol/Overlay}
     */
	let helpTooltip

	/**
     * The measure tooltip element.
     * @type {Element}
     */
	let measureTooltipElement

	/**
     * Overlay to show the measurement.
     * @type {module:ol/Overlay}
     */
	let measureTooltip

	/**
     * Message to show when the user is drawing a polygon.
     * @type {string}
     */
	// const continuePolygonMsg = ''

	/**
     * Message to show when the user is drawing a line.
     * @type {string}
     */
	// const continueLineMsg = ''

	/**
     * Handle pointer move.
     * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
     */
	const pointerMoveHandler = function(evt) {
		if (evt.dragging) {
			return
		}
		/** @type {string} */
		let helpMsg = ''

		if (sketch) {
			const geom = sketch.getGeometry()
			if (geom instanceof Polygon) {
				helpMsg = continuePolygonMsg
			} else if (geom instanceof LineString) {
				helpMsg = continueLineMsg
			}
		}

		helpTooltipElement.innerHTML = helpMsg
		helpTooltipElement.className = helpMsg ? 'ol-tooltip hidden' : ''
		helpTooltip.setPosition(evt.coordinate)

		helpTooltipElement.classList.remove('hidden')
	}

	map.on('pointermove', pointerMoveHandler)

	map.getViewport().addEventListener('mouseout', function() {
		helpTooltipElement.classList.add('hidden')
	})

	let draw
	const formatLength = function(line) {
		// 获取投影坐标系
		const sourceProj = map.getView().getProjection()
		// ol/sphere里有getLength()和getArea()用来测量距离和区域面积，默认的投影坐标系是EPSG:3857, 其中有个options的参数，可以设置投影坐标系
		const length = getLength(line, { projection: sourceProj })
		// let length = getLength(line);
		let output
		if (length > 100) {
			output = (Math.round(length / 1000 * 100) / 100) +
          ' ' + 'km'
		} else {
			output = (Math.round(length * 100) / 100) +
          ' ' + 'm'
		}
		return output
	}
	const formatArea = function(polygon) {
		// 获取投影坐标系
		const sourceProj = map.getView().getProjection()
		const area = getArea(polygon, { projection: sourceProj })
		// let area = getArea(polygon);
		// console.info(area)
		let output
		if (area > 10000) {
			output = (Math.round(area / 1000000 * 100) / 100) +
          ' ' + 'km<sup>2</sup>'
		} else {
			output = (Math.round(area * 100) / 100) +
          ' ' + 'm<sup>2</sup>'
		}
		return output
	}

	function addInteraction() {
		draw = new Draw({
			source: source,
			type: measureType,
			stopClick: true,
			style: drawStyle
		})
		map.addInteraction(draw)

		createMeasureTooltip()
		createHelpTooltip()

		let listener
		draw.on('drawstart',
			function(evt) {
				// set sketch
				sketch = evt.feature

				/** @type {module:ol/coordinate~Coordinate|undefined} */
				let tooltipCoord = evt.coordinate

				listener = sketch.getGeometry().on('change', function(evt) {
					const geom = evt.target
					let output
					if (geom instanceof Polygon) {
						output = formatArea(geom)
						tooltipCoord = geom.getInteriorPoint().getCoordinates()
					} else if (geom instanceof LineString) {
						output = formatLength(geom)
						tooltipCoord = geom.getLastCoordinate()
					}
					measureTooltipElement.innerHTML = output
					measureTooltip.setPosition(tooltipCoord)
				})
			}, this)

		draw.on('drawend',
			function() {
				measureTooltipElement.className = 'ol-tooltip ol-tooltip-static measureNum'
				measureTooltip.setOffset([0, -7])
				// unset sketch
				sketch = null
				// unset tooltip so that a new one can be created
				measureTooltipElement = null
				createMeasureTooltip()
				unByKey(listener)
				map.un('pointermove', pointerMoveHandler)
				map.removeInteraction(draw)
				helpTooltipElement.classList.add('hidden')
				// console.info(helpTooltipElement.classList)
			}, this)
	}

	function createHelpTooltip() {
		if (helpTooltipElement) {
			helpTooltipElement.parentNode.removeChild(helpTooltipElement)
		}
		helpTooltipElement = document.createElement('div')
		helpTooltipElement.className = 'ol-tooltip hidden'
		helpTooltip = new Overlay({
			id: overlayId,
			element: helpTooltipElement,
			offset: [15, 0],
			positioning: 'center-left'
		})
		map.addOverlay(helpTooltip)
	}

	function createMeasureTooltip() {
		if (measureTooltipElement) {
			measureTooltipElement.parentNode.removeChild(measureTooltipElement)
		}
		measureTooltipElement = document.createElement('div')
		measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure'
		measureTooltip = new Overlay({
			id: 'measureOverlay',
			element: measureTooltipElement,
			offset: [0, -15],
			positioning: 'bottom-center'
		})
		map.addOverlay(measureTooltip)
	}
	// 量测调用
	addInteraction()
}

