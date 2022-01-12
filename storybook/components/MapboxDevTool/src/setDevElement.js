const setDevElement = () => {
	const el = `
	<div x-data="{ types: ['map', 'layers', 'sources', 'features'], click: 'map' }" id="mapbox-dev-tool" @touchstart="dragStart" @mousedown="dragStart" @touchmove="drag" @mousemove="drag"  @touchend="dragEnd" @mouseup="dragEnd" style="padding:10px;pointer-events:all;width:400px;height:600px;background-color:white;display:flex;flex-direction: column;">
		<div id="mapbox-dev-headTab" style="flex: 0 0 auto;min-height:70px;display:flex;align-items: center;justify-content: space-around;box-shadow: 0px 0px 4px 0px rgba(20.19, 19.85, 19.85, 0.25);">
			<template x-for="type in types">
				<span x-text="type" style="max-width:80px;font-size:18px;cursor: pointer;display:inline-block;flex:1 1 auto;text-align:center;" :style="{color: type === click ? '#26CE4B' : 'black' }" @click="(click=type) && changeTab(type)">
				</span>
			</template>
		</div>
		<div style="flex: 1 1 auto;max-height: 500px;margin-top:10px;box-shadow: 0px 0px 4px 0px rgba(20.19, 19.85, 19.85, 0.25);" >
			<div x-show="click === 'features'" style="height:30px;width:100%;">
				<input name='tags' placeholder='select layer' value=''>
				<div id="jsonTreeWrapper"></div>
			</div>
			<div class="tree" id="div_tree"></div>
			<div>
			<ol class="p-pagination">
				<li class="p-pagination__item">
					<a class="p-pagination__link--previous" href="#previous" title="Previous page"><i class="p-icon--chevron-down">Previous page</i></a>
				</li>
				<li class="p-pagination__item">
					<a class="p-pagination__link" href="#1">1</a>
				</li>
				<li class="p-pagination__item p-pagination__item--truncation">
					…
				</li>
				<li class="p-pagination__item">
					<a class="p-pagination__link" href="#33">33</a>
				</li>
				<li class="p-pagination__item">
					<a class="p-pagination__link is-active" href="#34">34</a>
				</li>
				<li class="p-pagination__item">
					<a class="p-pagination__link" href="#35">35</a>
				</li>
				<li class="p-pagination__item p-pagination__item--truncation">
					…
				</li>
				<li class="p-pagination__item">
					<a class="p-pagination__link" href="#7">100</a>
				</li>
				<li class="p-pagination__item">
					<a class="p-pagination__link--next" href="#next" title="Next page"><i class="p-icon--chevron-down">Next page</i></a>
				</li>
			</ol>
			</div>
		</div>
	</div>
	`;
	// // console.log(el);
	const s = document.createElement('script');
	const link = document.createElement('link');
	link.href = 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
	link.rel = 'stylesheet';
	link.crossOrigin = 'anonymous';
	link.integrity = 'sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN';
	document.head.appendChild(link);
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
			// // console.log(type);
			// // console.log(value);
			// // console.log(mapconfig[0]);
			const item = mapconfig.find(item => item.value === type);
			window.mapboxMap[item.setMethod](item.settingFormat(value));
		};
		const changeTab = (type) => {
			// // console.log(type);
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
				case 'features':
					initFeaturesTree(type);
					break;
			};
		};


		const initMapTree = (type) => {
			const mapConfig = window.Alpine.store('treeConfig').map;
			// // console.log(mapConfig);
			const mapChildren = mapConfig.map((config) => {
				if(!window.mapboxMap[config.getMethod]) return null;
				return {
					n_id: config.value,
					n_title: config.labelFormat(window.mapboxMap[config.getMethod]()),
					n_order_num: 0,
					n_parentid: 0,
					n_editable: true
				};
			}).filter(item => item);
			const instance = new window.PickleTree({
				c_target: 'div_tree',
				nodeEditCallback: (node, text) => {
					// // console.log(node, text);
					const config = mapConfig.find(i => i.value === node.value);
					window.mapboxMap[config.setMethod](config.settingFormat(text));
				},
				c_config: {
					// start as folded or unfolded
					foldedStatus: false,
					// for logging
					logMode: false,
					// for switch element
					switchMode: false,
					// for automaticly select childs
					autoChild: true,
					// for automaticly select parents
					autoParent: true,
					// for drag / drop
					drag: false,
					// for ordering
					order: false,
				},
				c_data: mapChildren
			});
			window.treeInstance = instance;
		};


		const initLayersTree = (type) => {
			// // console.log(window.mapboxMap.getStyle().layers);
			const layers = window.mapboxMap.getStyle().layers;
			const layerConfig = layers.map((layer) => {
				let checkStatus = false;
				if(window.mapboxMap.getLayoutProperty(layer.id, 'visibility') === 'visible' || window.mapboxMap.getLayoutProperty(layer.id, 'visibility') === undefined){
					checkStatus = true;
				}
				const perentNode = {
					n_id: layer.id,
					n_title: layer.id,
					n_order_num: 0,
					n_parentid: 0,
					n_editable: false,
					n_showOrder: true,
					n_showSwitch: true,
					n_checkStatus: checkStatus,
				};
				// console.log(window.mapboxMap.getLayoutProperty(layer.id, 'visibility'));
				const childrenNode = Reflect.ownKeys(layer).map((key) => {
					if(typeof(layer[key]) === 'object' || typeof(layer[key]) === 'function') return null;
					return {
						n_id: layer.id+key,
						n_title: key+' -- '+layer[key],
						n_order_num: 0,
						n_parentid: layer.id,
						n_editable: false
					};
				});
				return [
					perentNode,
					...childrenNode,
				]
			});
			// console.log(layerConfig.flat().filter(i => i));
			const instance = new window.PickleTree({
				c_target: 'div_tree',
				switchCallback: (node)=>{
					window.mapboxMap.setLayoutProperty(node.value, 'visibility', node.checkStatus ? 'visible' : 'none');
				},
				orderCallback: (main, target, isbefore)=>{
					// console.log(main, target, isbefore);
					isbefore ? window.mapboxMap.moveLayer(main.value, target.value) : window.mapboxMap.moveLayer(target.value, main.value);
				},
				c_config: {
					// start as folded or unfolded
					foldedStatus: true,
					// for logging
					logMode: false,
					// for switch element
					switchMode: true,
					// for automaticly select childs
					autoChild: false,
					// for automaticly select parents
					autoParent: true,
					// for drag / drop
					drag: false,
					// for ordering
					order: true,
				},
				c_data: layerConfig.flat().filter(i => i)
			});
			window.treeInstance = instance;
		};

		const initSourceTree = (type) => {
			const sources = window.mapboxMap.getStyle().sources;
			const sourceConfig = Reflect.ownKeys(sources).map((key) => {
				const perentNode = {
					n_id: key,
					n_title: key,
					n_order_num: 0,
					n_parentid: 0,
					n_editable: false,
				};
				const childrenNode = Reflect.ownKeys(sources[key]).map((i) => {
					if(typeof(sources[key][i]) === 'object' || typeof(sources[key][i]) === 'function') return null;
					return {
						n_id: key+i,
						n_title: i+' -- '+sources[key][i],
						n_order_num: 0,
						n_parentid: key,
						n_editable: false
					};
				});
				return [
					perentNode,
					...childrenNode,
				]
			}).flat().filter(i => i);
			// console.log(sourceConfig);
			const instance = new window.PickleTree({
				c_target: 'div_tree',
				c_config: {
					// start as folded or unfolded
					foldedStatus: true,
					// for logging
					logMode: false,
					// for switch element
					switchMode: true,
					// for automaticly select childs
					autoChild: false,
					// for automaticly select parents
					autoParent: true,
					// for drag / drop
					drag: false,
					// for ordering
					order: false,
				},
				c_data: sourceConfig
			});
			window.treeInstance = instance;
		};
		const initFeaturesTree = (type) => {
			console.log(window.mapboxMap.getStyle().layers);
			const layers = window.mapboxMap.getStyle().layers.map(layer=>layer.id);
			console.log(layers);
			const input = document.querySelector('input[name="tags"]');
			const tagify = new window.Tagify(input, {
				whitelist: layers,
				maxTags: Infinity,
				dropdown: {
					maxItems: Infinity,
					classname: "tags-look",
					enabled: 0,
					closeOnSelect: false
				}
			});
			// var data = {
			// 	"firstName": "Jonh",
			// 	"lastName": "Smith",
			// 	"phones": [
			// 			"123-45-67",
			// 			"987-65-43"
			// 	]
			// };
			const data = window.mapboxMap.queryRenderedFeatures({layers: layers});
			console.log(JSON.parse(JSON.stringify(data)));
			const tree = window.jsonTree.create(JSON.parse(JSON.stringify(data.splice(0,10))), document.getElementById('jsonTreeWrapper'));
			// console.log(window.jsonTree);
		};
	`;
	s.appendChild(document.createTextNode(code));
	document.body.appendChild(s);
	return el;
};

export default setDevElement;
