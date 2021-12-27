import setDevElement from './setDevElement';
import simpleTree from 'simple-tree-component';
import { mapConfig } from './map/map.config';
import { v4 as uuidv4 } from 'uuid';
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
		this._container.innerHTML = setDevElement();
		// this._container = this._container.firstChild;
		// this._container.appendChild();
		this._map = map;
		window.mapboxMap = map;
		window.simpleTree = simpleTree;
		window.uuidv4 = uuidv4;
		window.treeInstance = null;
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
				selectable: config.selectable,
			};
		});
		const instance = simpleTree('#tree-view', 'view', {
			nodes: [
				{
					label: 'map',
					value: 'map',
					selectable: false,
					children: mapChildren,
				},
			]
		});
		window.treeInstance = instance;
		this._map.on('move', () => {
			// instance.updateNodeLabel(instance.getNode('zoom'), `zoom -- ${String(this._map.getZoom())}`);
			// instance.updateNodeLabel(instance.getNode('bounds'), `bounds -- [${this._map.getBounds()._sw.lng.toFixed(3)},${this._map.getBounds()._sw.lat.toFixed(3)},${this._map.getBounds()._ne.lng.toFixed(3)},${this._map.getBounds()._ne.lat.toFixed(3)}]`);
			mapConfig.forEach((config) => {
				instance.updateNodeLabel(instance.getNode(config.value), config.labelFormat(this._map[config.getMethod]()));
			});
		});
		// window.Alpine.store('treeInstance').setValue(instance);
		const subscription = instance.subscribe('selectionChanged', (selected, eventName, e) => {
			// do whatever you want
			console.log(selected, eventName, e);
			// window.Alpine.store['clickItem'].changeType(selected.value);
			// window.Alpine.store('clickItem', {
			// 	type: '',
			// 	value: '',
			// 	setType(label) { this.type = label.split(' ')[0]; },
			// 	setValue(label) { this.value = label.split(' ')[2]; },
			// });
			window.Alpine.store('clickItem').setType(selected.label);
			window.Alpine.store('clickItem').setValue(selected.label);
		});
		// new EsTree('tree-view', config, data);
		console.log(subscription);
	}
}
export default MapboxGLDebuggerControl;
