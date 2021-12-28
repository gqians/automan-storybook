import Alpine from 'alpinejs';
import store from './store';
// import mapConfig from './map/map.config';
const setDevElement = () => {
	if (!window.Alpine) {
		window.Alpine = Alpine;
		document.addEventListener('alpine:init', () => {
			store();
			// console.log(window.Alpine);
		});
		window.Alpine.start();
	}
	const el = `
	<div id="mapbox-dev-tool" @touchstart="dragStart" @mousedown="dragStart" @touchmove="drag" @mousemove="drag"  @touchend="dragEnd" @mouseup="dragEnd" style="padding:10px;pointer-events:all;width:400px;height:600px;background-color:white;display:flex;flex-direction: column;">
		<div id="mapbox-dev-headTab" x-data="{ types: ['map', 'layers', 'sources', 'markers', 'tools'], click: 'map' }" style="flex: 0 0 auto;min-height:70px;display:flex;align-items: center;justify-content: center;box-shadow: 0px 0px 4px 0px rgba(20.19, 19.85, 19.85, 0.25);">
			<template x-for="type in types">
				<span x-text="type" style="max-width:80px;font-size:18px;cursor: pointer;display:inline-block;flex:1 1 auto;text-align:center;" :style="{color: type === click ? '#26CE4B' : 'black' }" @click="(click=type) && changeTab(type)">
				</span>
			</template>
		</div>
		<div style="flex: 1 1 auto;max-height: 435px;margin-top:10px;box-shadow: 0px 0px 4px 0px rgba(20.19, 19.85, 19.85, 0.25);" id="tree-view"></div>
		<div x-data style="padding-left:10px;display: flex;align-items: center;flex: 0 0 auto;min-height:60px;margin-top:10px;box-shadow: 0px 0px 4px 0px rgba(20.19, 19.85, 19.85, 0.25);">
			<span x-data x-text="$store.clickItem.type" style="font-size:16px;color: #707070"></span>
			<div x-show="$store.clickItem.type.length>0" style="display:inline-block;">
				<input type="text" @keyup.enter="mapBottonClickHandler($store.clickItem.type, $store.clickItem.value, $store.treeConfig.map)" style="vertical-align: middle;margin-left:10px;padding-left:10px;border: 1px solid #569A3E;color:#707070;font-size:14px;" x-model="$store.clickItem.value" >
				<svg @click="mapBottonClickHandler($store.clickItem.type, $store.clickItem.value, $store.treeConfig.map)" style="vertical-align: middle;cursor: pointer;" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.3 6.00012H8.7C7.20883 6.00012 6 7.20895 6 8.70012V39.3001C6 40.7913 7.20883 42.0001 8.7 42.0001H39.3C40.7912 42.0001 42 40.7913 42 39.3001V8.70012C42 7.20895 40.7912 6.00012 39.3 6.00012Z" fill="none" stroke="#569A3E" stroke-width="4" stroke-linejoin="round"/><path d="M32 6V24H15V6H32Z" fill="none" stroke="#569A3E" stroke-width="4" stroke-linejoin="round"/><path d="M26 13.0001V17.0001" stroke="#569A3E" stroke-width="4" stroke-linecap="round"/><path d="M10.9969 6.00012H35.9985" stroke="#569A3E" stroke-width="4" stroke-linecap="round"/>
				</svg>
			</div>
		</div>
	</div>
	`;
	// console.log(el);
	const s = document.createElement('script');
	s.type = 'text/javascript';
	const code = `
		let active = false;
		let currentX;
		let currentY;
		let initialX;
		let initialY;
		let xOffset = 0;
		let yOffset = 0;
		const dragStart = (e) => {
			const dragItem = document.getElementById('mapbox-dev-headTab');
			if (e.type === 'touchstart') {
				initialX = e.touches[0].clientX - xOffset;
				initialY = e.touches[0].clientY - yOffset;
			} else {
				initialX = e.clientX - xOffset;
				initialY = e.clientY - yOffset;
			}

			if (dragItem.contains(e.target)) {
				active = true;
			}
		};
		const dragEnd = (e) => {
			initialX = currentX;
			initialY = currentY;
			active = false;
		};
		const drag = (e) => {
			if (active) {
				e.preventDefault();

				if (e.type === 'touchmove') {
					currentX = e.touches[0].clientX - initialX;
					currentY = e.touches[0].clientY - initialY;
				} else {
					currentX = e.clientX - initialX;
					currentY = e.clientY - initialY;
				}

				xOffset = currentX;
				yOffset = currentY;
				const dragItem = document.getElementById('mapbox-dev-tool');
				setTranslate(currentX, currentY, dragItem);
			}
		};
		const setTranslate = (xPos, yPos, el) => {
			el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
		};
		const mapBottonClickHandler = (type,value,mapconfig) => {
			// console.log(type);
			// console.log(value);
			// console.log(mapconfig[0]);
			const item = mapconfig.find(item => item.value === type);
			window.mapboxMap[item.setMethod](item.settingFormat(value));
		};
		const changeTab = (type) => {
			// console.log(type);
			window.treeInstance?.destroy();
			initTree(type);
		};
		const initTree = (type) => {
			switch (type) {
				case 'map':
					initMapTree(type);
					break;
				case 'layers':
					initLayersTree(type);
					break;
				case 'sources':
					initSourceTree(type);
					break;
			};
		};


		const initMapTree = (type) => {
			const mapConfig = window.Alpine.store('treeConfig').map;
			// console.log(mapConfig);
			const mapChildren = mapConfig.map((config) => {
				return {
					label: config.labelFormat(window.mapboxMap[config.getMethod]()),
					value: config.value,
					selectable: config.selectable,
				};
			});
			const instance = window.simpleTree('#tree-view', 'tree', {
				dragAndDrop: false,
				nodes: [
					{
						label: type,
						value: type,
						selectable: false,
						children: mapChildren,
					},
				]
			});
			const subscription = instance.subscribe('selectionChanged', (selected, eventName, e) => {
				window.Alpine.store('clickItem').setType(selected.label);
				window.Alpine.store('clickItem').setValue(selected.label);
			});
			window.treeInstance = instance;
		};


		const initLayersTree = (type) => {
			// console.log(window.mapboxMap.getStyle().layers);
			const layers = window.mapboxMap.getStyle().layers;
			const layerConfig = layers.map((layer) => {
				return {
					label: layer.id,
					value: layer.id,
					selectable: true,
					children: [
						{
							label: 'type -- ' + layer.type,
							value: window.uuidv4(),
							selectable: false,
						},
						layer.source ? {
							label: 'source -- ' + layer.source,
							value: window.uuidv4(),
							selectable: false,
						}: null,
					]
				}
			});
			const instance = window.simpleTree('#tree-view', 'tree', {
				dragAndDrop: true,
				nodes: [
					{
						label: type,
						value: type,
						selectable: false,
						children: layerConfig,
					},
				]
			});
			// instance.collapseAllNodes();
			// window.treeInstance = instance;
			// addUpandDownBotton();
		};

		const initSourceTree = (type) => {
			const sources = window.mapboxMap.getStyle().sources;
			const sourceConfig = Reflect.ownKeys(sources).map((key) => {
				return {
					label: key,
					value: key,
					selectable: true,
					children: [
						{
							label: 'type -- ' + sources[key].type,
							value: window.uuidv4(),
							selectable: false,
						},
					]
				}
			});
			const instance = window.simpleTree('#tree-view', 'tree', {
				dragAndDrop: false,
				nodes: [
					{
						label: type,
						value: type,
						selectable: false,
						children: sourceConfig,
					},
				]
			});
			// instance.collapseAllNodes();
			window.treeInstance = instance;
		}
	`;
	s.appendChild(document.createTextNode(code));
	document.body.appendChild(s);
	return el;
};

export default setDevElement;
