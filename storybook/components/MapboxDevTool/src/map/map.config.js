const mapConfig = [{
	value: 'zoom',
	getMethod: 'getZoom',
	setMethod: 'setZoom',
	selectable: true,
	labelFormat: (value) => `zoom -- ${value}`,
	settingFormat: (value) => value,
}, {
	value: 'bounds',
	getMethod: 'getBounds',
	setMethod: 'setBounds',
	selectable: false,
	labelFormat: (value) => `bounds -- [ ${value._sw.lng.toFixed(3)}, ${value._sw.lat.toFixed(3)}, ${value._ne.lng.toFixed(3)}, ${value._ne.lat.toFixed(3)} ]`,
}, {
	value: 'center',
	getMethod: 'getCenter',
	setMethod: 'setCenter',
	selectable: true,
	settingFormat: (value) => JSON.parse(value),
	labelFormat: (value) => `center -- [ ${value.lng.toFixed(3)}, ${value.lat.toFixed(3)} ]`,
}, {
	value: 'bearing',
	getMethod: 'getBearing',
	setMethod: 'setBearing',
	selectable: true,
	settingFormat: (value) => Number(value),
	labelFormat: (value) => `bearing -- ${value}`,
}, {
	value: 'pitch',
	getMethod: 'getPitch',
	setMethod: 'setPitch',
	selectable: true,
	settingFormat: (value) => Number(value),
	labelFormat: (value) => `pitch -- ${value}`,
}, {
	value: 'projection',
	getMethod: 'getProjection',
	setMethod: 'setProjection',
	selectable: false,
	labelFormat: (value) => `projection -- ${value.name}`,
}, {
	value: 'padding',
	getMethod: 'getPadding',
	setMethod: 'setPadding',
	selectable: true,
	settingFormat: (value) => { return { top: JSON.parse(value)[0], right: JSON.parse(value)[1], bottom: JSON.parse(value)[2], left: JSON.parse(value)[3] }; },
	labelFormat: (value) => `padding -- [ ${value.top}, ${value.right}, ${value.bottom}, ${value.left} ]`,
}];
const layerConfig = [{}];
export { mapConfig, layerConfig };
