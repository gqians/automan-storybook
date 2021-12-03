import setDevElement from './setDevElement';
import EsTree from 'es6-tree';

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
		const config = {
			types: {
				folder: {
					css: 'icon icon-file-directory'
				},
				file: {
					css: 'icon icon-file'
				}
			}
		};
		const data = [{
			id: 'master-node',
			name: '#',
			type: 'main',
			expanded: true,
			children: [{
				id: 'folder-1',
				type: 'folder',
				name: 'A folder',
				children: [{
					id: 'article-1',
					name: 'An article',
					type: 'file',
				},
				{
					id: 'article-2',
					name: 'Another article',
					type: 'file'
				}
				]
			}]
		}];
		const tree = new EsTree('tree-view', config, data);
	}
}
export default MapboxGLDebuggerControl;
