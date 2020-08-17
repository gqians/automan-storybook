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
		position: VueTypes.oneOf(['leftTop', 'rightTop']).def('rightTop'),
		zoomStyle: VueTypes.oneOf(['origin', 'white']).def('origin'),
		size: VueTypes.oneOf(['large', 'normal', 'small']).def('normal'),
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
}
.leftTop{
  left: 3.1rem;
  top: 1.5rem;
}
.ol-control{
  padding: 0px !important;
  box-shadow: 0 0 10px hsla(0, 0%, 40%, .65);
}
.zoom button{
  color: #999999 !important;
  width: 2.2rem !important;
  height: 2.2rem !important;
  background-color: #ffffff !important;
  margin: 0px !important;
  border: 1px solid #dedede;
  cursor: pointer;
  outline: none;
}
.zoom  button:hover{
	color: #5253FB !important;
}
@media screen and (max-width: 414px) {
  .zoom{
    top:60vh;
    right: 0.5rem;
  }
}
</style>
