<template>
	<section
		id="zoomContainer"
		style="box-shadow: 0 0 5px hsla(0, 0%, 40%, .65);cursor:pointer"
	>
		<div id="zoom" />
		<div
			v-if="resetButton"
			id="zoomReset"
			class="zoom ol-unselectable"
			@click="resetClickHandler"
		>
			<Refresh
				theme="outline"
				:style="{ lineHeight: resetButtonStyle.lineHeight }"
				:size="refreshFillSize"
				:fill="refreshFillColor"
				class="w-full inline-block text-center"
			/>
		</div>
	</section>
</template>

<script>
import 'ol/ol.css';
import Zoom from 'ol/control/Zoom';
import VueTypes from 'vue-types';
import { Refresh } from '@icon-park/vue';
export default {
	name: 'Zoom',
	components: {
		Refresh,
	},
	props: {
		position: VueTypes.shape({
			left: VueTypes.string,
			right: VueTypes.string,
			top: VueTypes.string,
			bottom: VueTypes.string,
		}).def(() => ({
			right: '5rem',
			top: '2rem',
			left: 'auto',
			bottom: 'auto',
		})),
		resetButton: VueTypes.bool.def(true),
		resetButtonStyle: VueTypes.shape({
			width: VueTypes.string,
			height: VueTypes.string,
			lineHeight: VueTypes.string,
			size: VueTypes.string,
		}).def(() => ({
			width: '2.2rem',
			height: '2.2rem',
			lineHeight: '2rem',
			size: '20',
		})),
		width: VueTypes.string.def('2.2rem'),
		height: VueTypes.string.def('2.2rem'),
		hoverColor: VueTypes.string.def('#5253FB'),
		zoomStyle: VueTypes.oneOf(['origin', 'circle']).def('origin'),
		backgroundColor: VueTypes.string.def('#ffffff'),
		borderColor: VueTypes.string.def('#dedede'),
		color: VueTypes.string.def('#999999'),
		duration: VueTypes.integer.def(250),
		zoomInTipLabel: VueTypes.string.def('放大'),
		zoomOutTipLabel: VueTypes.string.def('缩小'),
		delta: VueTypes.integer.def(1),
	},
	data() {
		return {
			refreshFillColor: '',
			refreshFillSize: '',
		};
	},
	mounted() {
		this.refreshFillColor = this.color;
		this.refreshFillSize = this.resetButtonStyle.size;
		const zoom = new Zoom({
			duration: this.duration,
			zoomInTipLabel: this.zoomInTipLabel,
			className: 'zoom',
			zoomOutTipLabel: this.zoomOutTipLabel,
			delta: this.delta,
			target: 'zoom',
		});
		this.$emit('getZoom', zoom);
		this.$nextTick(() => {
			const zooms = document.getElementsByClassName('zoom');
			const zoomIns = document.getElementsByClassName('zoom-in');
			const zoomOuts = document.getElementsByClassName('zoom-out');
			const zoomReset = this.resetButton && document.getElementById('zoomReset');
			const zoomContainer = document.getElementById('zoomContainer');
			const zoom = [...zooms][0];
			const zoomIn = [...zoomIns][0];
			const zoomOut = [...zoomOuts][0];
			let zoomContainerStyle = `
				position: absolute;
				z-index: 1;
				right:${this.position.right || ''};
				left:${this.position.left || ''};
				top:${this.position.top || ''};
				bottom:${this.position.bottom || ''};
			`;
			let zoomStyle = `
			`;
			let zoomResetStyle = `
				background-color:${this.backgroundColor || '#ffffff'};
				color:${this.color || '#999999'};
				width:${this.resetButtonStyle.width || '2.2rem'};
				height:${this.resetButtonStyle.height || '2.2rem'};
			`;
			let zoomInStyle = `
				background-color:${this.backgroundColor || '#ffffff'};
				color:${this.color || '#999999'};
				width:${this.width || '2.2rem'};
				height:${this.height || '2.2rem'};
			`;
			let zoomOutStyle = `
				background-color:${this.backgroundColor || '#ffffff'};
				color:${this.color || '#999999'};
				width:${this.width || '2.2rem'};
				height:${this.height || '2.2rem'};
			`;
			switch (this.zoomStyle) {
			case 'origin':
				zoomInStyle += `
					margin:0;
					border: 1px solid ${this.borderColor};
				`;
				zoomOutStyle += `
					margin:0;
					border: 1px solid ${this.borderColor};
				`;
				zoomResetStyle += `
					margin:0;
					border: 1px solid ${this.borderColor};
				`;
				break;
			case 'circle':
				zoomStyle += `
					box-shadow:none;
					background-color: transparent;
				`;
				zoomContainerStyle += `
					box-shadow:none;
					background-color: transparent;
				`;
				zoomInStyle += `
					border-radius: 50%;
					box-shadow : 0 0 10px hsla(0, 0%, 40%, .65);
					margin-bottom : 5px;
				`;
				zoomOutStyle += `
					border-radius: 50%;
					box-shadow : 0 0 10px hsla(0, 0%, 40%, .65);
					margin-bottom : 5px;
				`;
				zoomResetStyle += `
					border-radius: 50%;
					box-shadow : 0 0 10px hsla(0, 0%, 40%, .65);
					margin-bottom : 5px;
				`;
			}
			zoom && (zoom.style.cssText += zoomStyle);
			zoomReset && (zoomReset.style.cssText += zoomResetStyle);
			zoomIn && (zoomIn.style.cssText += zoomInStyle);
			zoomOut && (zoomOut.style.cssText += zoomOutStyle);
			zoomContainer && (zoomContainer.style.cssText += zoomContainerStyle);
			zoom && zoomIn.addEventListener('mouseover', () => {
				zoomIn.style.color = this.hoverColor;
			});
			zoomIn && zoomIn.addEventListener('mouseout', () => {
				zoomIn.style.color = this.color;
			});
			zoomOut && zoomOut.addEventListener('mouseover', () => {
				zoomOut.style.color = this.hoverColor;
			});
			zoomOut && zoomOut.addEventListener('mouseout', () => {
				zoomOut.style.color = this.color;
			});
			zoomReset && zoomReset.addEventListener('mouseover', () => {
				this.refreshFillColor = this.hoverColor;
			});
			zoomReset && zoomReset.addEventListener('mouseout', () => {
				this.refreshFillColor = this.color;
			});
		});
	},
	methods: {
		resetClickHandler() {
			this.$emit('resetClick');
		},
	},
};
</script>

<style>
#zoom .ol-control {
	padding: 0px !important;
	position: static !important;
}
.zoom button {
	cursor: pointer;
	outline: none;
}
</style>
