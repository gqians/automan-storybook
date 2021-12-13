import setDevElement from './setDevElement';
import simpleTree from 'simple-tree-component';
import 'simple-tree-component/dist/simple-tree-component.min.css';
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
		const instance = simpleTree('#tree-view', 'singleSelectDropdown', {
			nodes: [
				{
					label: 'Parent 1',
					value: 'p1',
					children: [
						{
							label: 'Parent 1 - Child 1',
							value: 'p1c1'
						},
						{
							label: 'Parent 1 - Child 2',
							value: 'p1c2',
							selected: true
						}
					]
				}
			]
		});
		// new EsTree('tree-view', config, data);
		console.log(this._map);
	}
}
export default MapboxGLDebuggerControl;
