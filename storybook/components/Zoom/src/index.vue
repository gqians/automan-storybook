<template>
  <div id="zoom" />
</template>

<script>
import 'ol/ol.css'
import Zoom from 'ol/control/Zoom'
import VueTypes from 'vue-types'
export default {
	name: 'Zoom',
	props: {
		position: VueTypes.shape({
			left: VueTypes.string,
			right: VueTypes.string,
			top: VueTypes.string,
			bottom: VueTypes.string
		}).def(() => ({
			right: '5rem',
			top: '2rem',
			left: 'auto',
			bottom: 'auto'
		})),
		width: VueTypes.string.def('2.2rem'),
		height: VueTypes.string.def('2.2rem'),
		hoverColor: VueTypes.string.def('#5253FB'),
		zoomStyle: VueTypes.oneOf(['origin', 'circle']).def('origin'),
		backgroundColor: VueTypes.string.def('#ffffff'),
		color: VueTypes.string.def('#999999'),
		duration: VueTypes.integer.def(250),
		zoomInTipLabel: VueTypes.string.def('放大'),
		zoomOutTipLabel: VueTypes.string.def('缩小'),
		delta: VueTypes.integer.def(1)
	},
	data() {
		return {

		}
	},
	mounted() {
		const zoom = new Zoom({
			duration: this.duration,
			zoomInTipLabel: this.zoomInTipLabel,
			className: 'zoom',
			zoomOutTipLabel: this.zoomOutTipLabel,
			delta: this.delta,
			target: 'zoom'
		})
		this.$emit('getZoom', zoom)
		this.$nextTick(() => {
			const zooms = document.getElementsByClassName('zoom')
			const zoomIns = document.getElementsByClassName('zoom-in')
			const zoomOuts = document.getElementsByClassName('zoom-out')
			const zoom = [...zooms][0]
			const zoomIn = [...zoomIns][0]
			const zoomOut = [...zoomOuts][0]
			let zoomStyle = `
				position: absolute;
				z-index: 1;
				box-shadow: 0 0 10px hsla(0, 0%, 40%, .65);
				right:${this.position.right || ''};
				left:${this.position.left || ''};
				top:${this.position.top || ''};
				bottom:${this.position.bottom || ''};
			`
			let zoomInStyle = `
				background-color:${this.backgroundColor || '#ffffff'};
				color:${this.color || '#999999'};
				width:${this.width || '2.2rem'};
				height:${this.height || '2.2rem'};
			`
			let zoomOutStyle = `
				background-color:${this.backgroundColor || '#ffffff'};
				color:${this.color || '#999999'};
				width:${this.width || '2.2rem'};
				height:${this.height || '2.2rem'};
			`
			switch (this.zoomStyle) {
			case 'origin':
				zoomInStyle += `
					margin:0;
					border: 1px solid #dedede;
				`
				zoomOutStyle += `
					margin:0;
					border: 1px solid #dedede;
				`
				break
			case 'circle':
				zoomStyle += `
					box-shadow:none;
					background-color: transparent;
				`
				zoomInStyle += `
					border-radius: 50%;
					box-shadow : 0 0 10px hsla(0, 0%, 40%, .65);
					margin-bottom : 5px;
				`
				zoomOutStyle += `
					border-radius: 50%;
					box-shadow : 0 0 10px hsla(0, 0%, 40%, .65);
				`
			}
			zoom && (zoom.style.cssText += zoomStyle)
			zoomIn && (zoomIn.style.cssText += zoomInStyle)
			zoomOut && (zoomOut.style.cssText += zoomOutStyle)
			zoomIn.addEventListener('mouseover', () => {
				zoomIn.style.color = this.hoverColor
			})
			zoomIn.addEventListener('mouseout', () => {
				zoomIn.style.color = this.color
			})
			zoomOut.addEventListener('mouseover', () => {
				zoomOut.style.color = this.hoverColor
			})
			zoomOut.addEventListener('mouseout', () => {
				zoomOut.style.color = this.color
			})
		})
	},
	methods: {
	}
}
</script>

<style >
.ol-control{
  padding: 0px !important;
}
.zoom button{
  cursor: pointer;
  outline: none;
}
</style>
