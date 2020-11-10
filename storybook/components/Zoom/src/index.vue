<template>
  <section id="zoomContainer" style="box-shadow: 0 0 5px hsla(0, 0%, 40%, .65);cursor:pointer">
    <div id="zoom" />
    <div id="zoomReset" class="zoom ol-unselectable" @click="resetClickHandler">
      <img style="width:100%;" :src="resetIcon">
    </div>
  </section>
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
		resetButton: VueTypes.bool.def(true),
		resetButtonStyle: VueTypes.shape({
			width: VueTypes.string,
			height: VueTypes.string
		}).def(() => ({
			width: '2.2rem',
			height: '2.2rem'
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
			resetIcon: `data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M221.1 477c16.7 3.9 33.4-6.5 37.4-23.2 1.1-5 2.6-10.3 4.6-16.8 1.4-4.5 2.9-9 4.5-13.4 37.8-102.3 136.5-171 245.7-171 102 0 193.6 58.2 236.6 149.4l-123.1-33c-8-2.1-16.4-1-23.6 3.1-7.2 4.2-12.3 10.9-14.5 18.9-4.4 16.6 5.4 33.6 22 38.1l179 48c2.8.8 5.7 1.3 8.7 1.3 2.4 0 4.8-.3 7.1-.8 16.6-3.9 27-20.7 23.1-37.3-1.7-7.2-3.6-14.4-5.8-21.4-20.5-65.7-60.5-122.3-115.5-163.6-40.2-30-87.5-50.6-136.9-59.4-49.4-8.9-100.9-6-149 8.2-48.1 14.2-92.9 39.8-129.5 74.1-36.6 34.3-65.2 77.2-82.6 124.3-2 5.6-3.9 11.1-5.6 16.6-2 6.5-3.9 13.3-5.7 21-3.9 16.3 6.5 33 23.1 36.9zm603.7 88.3c-4.4-7.1-11.2-12-19.3-13.9-16.7-3.9-33.4 6.5-37.3 23.2-1.4 5.9-3 11.7-4.7 17.3-34.1 110.3-134.6 184.3-250.2 184.3-101.9 0-193.4-58.1-236.5-149.1L399.7 660h.1c16.3 4 33.1-5.9 37.5-22.1 4.3-16.2-5.3-33.2-21.4-37.9l-179.8-48.2c-16.5-4.4-33.6 5.4-38.1 22-1.5 5.7-1.4 11.7.4 17.3 1.6 6.6 3.4 13.1 5.3 19.1 20.6 65.7 60.5 122.2 115.5 163.6 28.3 21.1 59.6 37.4 93 48.4 32.6 10.7 66.6 16.1 101 16.1s68.4-5.4 101.1-16.1c33.4-11 64.7-27.2 93-48.4 55-41.4 94.9-97.9 115.5-163.6 2.2-7.1 4.2-14.3 5.8-21.4 2-8.1.6-16.4-3.8-23.5z' fill='%23a4a4a4'/%3E%3C/svg%3E`
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
			const zoomReset = this.resetButton && document.getElementById('zoomReset')
			const zoomContainer = document.getElementById('zoomContainer')
			const zoom = [...zooms][0]
			const zoomIn = [...zoomIns][0]
			const zoomOut = [...zoomOuts][0]
			let zoomContainerStyle = `
				position: absolute;
				z-index: 1;
				right:${this.position.right || ''};
				left:${this.position.left || ''};
				top:${this.position.top || ''};
				bottom:${this.position.bottom || ''};
			`
			let zoomStyle = `
			`
			let zoomResetStyle = `
				background-color:${this.backgroundColor || '#ffffff'};
				color:${this.color || '#999999'};
				width:${this.resetButtonStyle.width || '2.2rem'};
				height:${this.resetButtonStyle.height || '2.2rem'};
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
				zoomResetStyle += `
					margin:0;
					border: 1px solid #dedede;
				`
				break
			case 'circle':
				zoomStyle += `
					box-shadow:none;
					background-color: transparent;
				`
				zoomContainerStyle += `
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
					margin-bottom : 5px;
				`
				zoomResetStyle += `
					border-radius: 50%;
					box-shadow : 0 0 10px hsla(0, 0%, 40%, .65);
					margin-bottom : 5px;
				`
			}
			zoom && (zoom.style.cssText += zoomStyle)
			zoomReset && (zoomReset.style.cssText += zoomResetStyle)
			zoomIn && (zoomIn.style.cssText += zoomInStyle)
			zoomOut && (zoomOut.style.cssText += zoomOutStyle)
			zoomContainer && (zoomContainer.style.cssText += zoomContainerStyle)
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
			zoomReset.addEventListener('mouseover', () => {
				this.resetIcon = `data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M221.1 477c16.7 3.9 33.4-6.5 37.4-23.2 1.1-5 2.6-10.3 4.6-16.8 1.4-4.5 2.9-9 4.5-13.4 37.8-102.3 136.5-171 245.7-171 102 0 193.6 58.2 236.6 149.4l-123.1-33c-8-2.1-16.4-1-23.6 3.1-7.2 4.2-12.3 10.9-14.5 18.9-4.4 16.6 5.4 33.6 22 38.1l179 48c2.8.8 5.7 1.3 8.7 1.3 2.4 0 4.8-.3 7.1-.8 16.6-3.9 27-20.7 23.1-37.3-1.7-7.2-3.6-14.4-5.8-21.4-20.5-65.7-60.5-122.3-115.5-163.6-40.2-30-87.5-50.6-136.9-59.4-49.4-8.9-100.9-6-149 8.2-48.1 14.2-92.9 39.8-129.5 74.1-36.6 34.3-65.2 77.2-82.6 124.3-2 5.6-3.9 11.1-5.6 16.6-2 6.5-3.9 13.3-5.7 21-3.9 16.3 6.5 33 23.1 36.9zm603.7 88.3c-4.4-7.1-11.2-12-19.3-13.9-16.7-3.9-33.4 6.5-37.3 23.2-1.4 5.9-3 11.7-4.7 17.3-34.1 110.3-134.6 184.3-250.2 184.3-101.9 0-193.4-58.1-236.5-149.1L399.7 660h.1c16.3 4 33.1-5.9 37.5-22.1 4.3-16.2-5.3-33.2-21.4-37.9l-179.8-48.2c-16.5-4.4-33.6 5.4-38.1 22-1.5 5.7-1.4 11.7.4 17.3 1.6 6.6 3.4 13.1 5.3 19.1 20.6 65.7 60.5 122.2 115.5 163.6 28.3 21.1 59.6 37.4 93 48.4 32.6 10.7 66.6 16.1 101 16.1s68.4-5.4 101.1-16.1c33.4-11 64.7-27.2 93-48.4 55-41.4 94.9-97.9 115.5-163.6 2.2-7.1 4.2-14.3 5.8-21.4 2-8.1.6-16.4-3.8-23.5z' fill='${this.hoverColor.replace('#', '%23')}'/%3E%3C/svg%3E`
			})
			zoomReset.addEventListener('mouseout', () => {
				this.resetIcon = `data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M221.1 477c16.7 3.9 33.4-6.5 37.4-23.2 1.1-5 2.6-10.3 4.6-16.8 1.4-4.5 2.9-9 4.5-13.4 37.8-102.3 136.5-171 245.7-171 102 0 193.6 58.2 236.6 149.4l-123.1-33c-8-2.1-16.4-1-23.6 3.1-7.2 4.2-12.3 10.9-14.5 18.9-4.4 16.6 5.4 33.6 22 38.1l179 48c2.8.8 5.7 1.3 8.7 1.3 2.4 0 4.8-.3 7.1-.8 16.6-3.9 27-20.7 23.1-37.3-1.7-7.2-3.6-14.4-5.8-21.4-20.5-65.7-60.5-122.3-115.5-163.6-40.2-30-87.5-50.6-136.9-59.4-49.4-8.9-100.9-6-149 8.2-48.1 14.2-92.9 39.8-129.5 74.1-36.6 34.3-65.2 77.2-82.6 124.3-2 5.6-3.9 11.1-5.6 16.6-2 6.5-3.9 13.3-5.7 21-3.9 16.3 6.5 33 23.1 36.9zm603.7 88.3c-4.4-7.1-11.2-12-19.3-13.9-16.7-3.9-33.4 6.5-37.3 23.2-1.4 5.9-3 11.7-4.7 17.3-34.1 110.3-134.6 184.3-250.2 184.3-101.9 0-193.4-58.1-236.5-149.1L399.7 660h.1c16.3 4 33.1-5.9 37.5-22.1 4.3-16.2-5.3-33.2-21.4-37.9l-179.8-48.2c-16.5-4.4-33.6 5.4-38.1 22-1.5 5.7-1.4 11.7.4 17.3 1.6 6.6 3.4 13.1 5.3 19.1 20.6 65.7 60.5 122.2 115.5 163.6 28.3 21.1 59.6 37.4 93 48.4 32.6 10.7 66.6 16.1 101 16.1s68.4-5.4 101.1-16.1c33.4-11 64.7-27.2 93-48.4 55-41.4 94.9-97.9 115.5-163.6 2.2-7.1 4.2-14.3 5.8-21.4 2-8.1.6-16.4-3.8-23.5z' fill='%23a4a4a4'/%3E%3C/svg%3E`
			})
		})
	},
	methods: {
		resetClickHandler() {
			this.$emit('resetClick')
		}
	}
}
</script>

<style >
.ol-control{
  padding: 0px !important;
  position:static !important;
}
.zoom button{
  cursor: pointer;
  outline: none;
}
</style>
