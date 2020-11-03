<template>
  <div class="border-solid border-2 border-gray-300 rounded-lg bg-white bg-opacity-75 p-3 flex flex-row flex-wrap justify-content justify-between" style="width:18rem">
    <span v-for="i in data" :key="i.level" class="align-middle mt-3 inline-block text-gray-700 w-32">
      <img :src="require(`../windIcons/level_${i.level}.svg`)" class="w-6 h-6 inline-block">
      {{ i.level===0?'':i.level*2-2 }} {{ i.level===0?'':'-' }} {{ i.level*2 }}m/s
    </span>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
	name: 'Legend',
	props: {
		data: VueTypes.arrayOf(VueTypes.shape({
			level: VueTypes.integer,
			text: VueTypes.string
		})).def([{
			level: 0,
			text: ''
		}, {
			level: 1,
			text: ''
		}, {
			level: 2,
			text: ''
		}, {
			level: 3,
			text: ''
		}, {
			level: 4,
			text: ''
		}, {
			level: 5,
			text: ''
		}, {
			level: 6,
			text: ''
		}, {
			level: 7,
			text: ''
		}, {
			level: 8,
			text: ''
		}, {
			level: 9,
			text: ''
		}, {
			level: 10,
			text: ''
		}, {
			level: 11,
			text: ''
		}, {
			level: 12,
			text: ''
		}])
	},
	data() {
		return {

		}
	},
	computed: {

	},
	mounted() {
	},
	methods: {
	}
}
</script>

<style scoped>
</style>
