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
	<div id="mapbox-dev-tool" ontouchstart=${dragStart} onmousedown=${dragStart} ontouchmove=${drag} onmousemove=${drag}  ontouchend=${dragEnd} onmouseup=${dragEnd} style="pointer-events: all;width:100px;height:100px;background-color:red;">
		{{ observable }}
		<input type='text' class='form-control' data-bind='textInput: observable' placeholder='Type the value for  observable'/>
	</div>
	`;
	console.log(el);
	const view = {
		observable: ko.observable('asd'),
		text: 'Text is a constant.'
	};
	ko.applyBindings(view, el);
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

	if (e.target === dragItem) {
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
