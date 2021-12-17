import setDevElement from './setDevElement';
import simpleTree from 'simple-tree-component';
import { mapConfig } from './map/map.config';
import 'simple-tree-component/dist/simple-tree-component.min.css';
import './css/tree.css';
class MapboxGLDebuggerControl {
	constructor({
		title = '',
	}) {
		this._title = title;
	}

	onAdd(map) {
		this._container = document.createElement('div');
		this._container.appendChild(setDevElement());
		this._map = map;
		map.on('load', () => {
			this._addTreeView();
		});
		return this._container;
	}

	onRemove() {
		this._container.parentNode.removeChild(this._container);
		this._map = undefined;
	}
	_addTreeView() {
		const mapChildren = mapConfig.map((config) => {
			return {
				label: config.labelFormat(this._map[config.getMethod]()),
				value: config.value,
			};
		});
		const instance = simpleTree('#tree-view', 'view', {
			nodes: [
				{
					label: 'map',
					value: 'map',
					children: mapChildren,
				},
			]
		});
		this._map.on('move', () => {
			// instance.updateNodeLabel(instance.getNode('zoom'), `zoom -- ${String(this._map.getZoom())}`);
			// instance.updateNodeLabel(instance.getNode('bounds'), `bounds -- [${this._map.getBounds()._sw.lng.toFixed(3)},${this._map.getBounds()._sw.lat.toFixed(3)},${this._map.getBounds()._ne.lng.toFixed(3)},${this._map.getBounds()._ne.lat.toFixed(3)}]`);
			mapConfig.forEach((config) => {
				instance.updateNodeLabel(instance.getNode(config.value), config.labelFormat(this._map[config.getMethod]()));
			});
		});
		// new EsTree('tree-view', config, data);
		console.log(this._map.getPadding());
	}
}
export default MapboxGLDebuggerControl;
