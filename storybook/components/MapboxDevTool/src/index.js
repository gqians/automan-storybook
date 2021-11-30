import setDevElement from './setDevElement';
class MapboxGLButtonControl {
	constructor({
		title = '',
	}) {
		this._title = title;
	}

	onAdd(map) {
		this._container = document.createElement('div');
		this._container.appendChild(setDevElement());
		return this._container;
	}

	onRemove() {
		this._container.parentNode.removeChild(this._container);
		this._map = undefined;
	}
}
export default MapboxGLButtonControl;
