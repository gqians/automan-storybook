<template>
  <div id="zoom" />
</template>

<script>
import 'ol/ol.css'
import Zoom from 'ol/control/Zoom'
import VueTypes from 'vue-types'
// import { css } from 'styled-vue'
export default {
	name: 'Zoom',
	props: {
		position: VueTypes.shape({
			left: VueTypes.string,
			right: VueTypes.string,
			top: VueTypes.string,
			bottom: VueTypes.string
		}),
		zoomStyle: VueTypes.oneOf(['origin', 'circle']).def('origin'),
		backgroundColor: VueTypes.string,
		color: VueTypes.string,
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
			zoom.style.right = this.position.right || ''
			zoom.style.left = this.position.left || ''
			zoom.style.top = this.position.top || ''
			zoom.style.bottom = this.position.bottom || ''
			zoomIn.style.backgroundColor = this.backgroundColor || '#ffffff'
			zoomOut.style.backgroundColor = this.backgroundColor || '#ffffff'
			zoomIn.style.color = this.color || '#999999'
			zoomOut.style.color = this.color || '#999999'
			switch (this.zoomStyle) {
			case 'origin':
				zoomIn.style.margin = '0'
				zoomOut.style.margin = '0'
				break
			case 'circle':
				zoom.style.boxShadow = 'none'
				zoom.style.backgroundColor = 'transparent'
				zoomIn.style.borderRadius = '50%'
				zoomOut.style.borderRadius = '50%'
				zoomIn.style.boxShadow = '0 0 10px hsla(0, 0%, 40%, .65)'
				zoomIn.style.marginBottom = '5px'
				zoomOut.style.boxShadow = '0 0 10px hsla(0, 0%, 40%, .65)'
			}
			// zoomIn.style.cssText += this.backgroundColor || ''
			// zoomOut.style.cssText += this.backgroundColor || ''
		})
	},
	methods: {
	}
}
</script>

<style >
.zoom{
	position: absolute;
	z-index: 1;
	box-shadow: 0 0 10px hsla(0, 0%, 40%, .65);
	right: 3.1rem;
	top: 1.5rem;
	/* @apply absolute z-1 top-0 right-0 shadow-2xl */
}
.ol-control{
  padding: 0px !important;
  /* box-shadow: 0 0 10px hsla(0, 0%, 40%, .65); */
}
.zoom button{
  width: 2.2rem !important;
  height: 2.2rem !important;
  border: 1px solid #dedede;
  cursor: pointer;
  outline: none;
}
.zoom  button:hover{
	color: #5253FB !important;
}
</style>
