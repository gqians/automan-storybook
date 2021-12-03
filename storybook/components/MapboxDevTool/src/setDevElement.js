import html from 'nanohtml';
import ko from 'tko';
let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
const setDevElement = () => {
	const el = html`
	<div id="mapbox-dev-tool" ontouchstart=${dragStart} onmousedown=${dragStart} ontouchmove=${drag} onmousemove=${drag}  ontouchend=${dragEnd} onmouseup=${dragEnd} style="pointer-events:all;width:400px;height:600px;background-color:white;display:flex;flex-direction: column;">
		<div style="flex: 1 1 auto;display:flex;align-items: center;justify-content: center;box-shadow: 0px 4px 6px 1px rgba(20.19, 19.85, 19.85, 0.25);">
			<span style="max-width:80px;display:inline-block;flex:1 1 auto;text-align:center;">map</span>
			<span style="max-width:80px;display:inline-block;flex:1 1 auto;text-align:center;">layers</span>
			<span style="max-width:80px;display:inline-block;flex:1 1 auto;text-align:center;">sources</span>
			<span style="max-width:80px;display:inline-block;flex:1 1 auto;text-align:center;">markers</span>
			<span style="max-width:80px;display:inline-block;flex:1 1 auto;text-align:center;">tools</span>
		</div>
		<div style="flex: 5 1 auto;" id="tree-view"></div>
	</div>
	`;
	// console.log(el);
	// const view = {
	// 	observable: ko.observable('asd'),
	// 	text: 'Text is a constant.'
	// };
	// ko.applyBindings(view, el);
	return el;
};
const dragStart = (e) => {
	const dragItem = document.getElementById('mapbox-dev-tool');
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
export default setDevElement;
