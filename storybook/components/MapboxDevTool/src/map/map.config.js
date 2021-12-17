const mapConfig = [{
	value: 'zoom',
	getMethod: 'getZoom',
	setMethod: 'setZoom',
	labelFormat: (value) => `zoom -- ${value}`,
}, {
	value: 'bounds',
	getMethod: 'getBounds',
	setMethod: 'setBounds',
	labelFormat: (value) => `bounds -- [${value._sw.lng.toFixed(3)},${value._sw.lat.toFixed(3)},${value._ne.lng.toFixed(3)},${value._ne.lat.toFixed(3)}]`,
}, {
	value: 'center',
	getMethod: 'getCenter',
	setMethod: 'setCenter',
	labelFormat: (value) => `center -- [${value.lng.toFixed(3)},${value.lat.toFixed(3)}]`,
}, {
	value: 'bearing',
	getMethod: 'getBearing',
	setMethod: 'setBearing',
	labelFormat: (value) => `bearing -- ${value}`,
}, {
	value: 'pitch',
	getMethod: 'getPitch',
	setMethod: 'setPitch',
	labelFormat: (value) => `pitch -- ${value}`,
}, {
	value: 'projection',
	getMethod: 'getProjection',
	setMethod: 'setProjection',
	labelFormat: (value) => `projection -- ${value.name}`,
}, {
	value: 'padding',
	getMethod: 'getPadding',
	setMethod: 'setPadding',
	labelFormat: (value) => `padding -- [${value.top},${value.right},${value.bottom},${value.left}]`,
}];
export { mapConfig };
