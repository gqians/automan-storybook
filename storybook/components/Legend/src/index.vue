<template>
  <div class="w-40 sm:w-32 shadow-md">
    <div class="title">
      {{ legendOption.title }}
    </div>
    <div class="content">
      <div v-for="i in legendOption.config" :key="i.key" :class="itemObject">
        <span :class="squreObject" :style="{ backgroundColor: i.color }" />
        <span class="value">{{ i.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
	name: 'Legend',
	props: {
		legendOption: VueTypes.shape({
			title: VueTypes.string,
			type: VueTypes.oneOf(['default', 'liner', 'gradient']).def('default'),
			config: VueTypes.arrayOf(VueTypes.shape({
				color: VueTypes.string,
				value: VueTypes.string,
				key: VueTypes.string
			}))
		})
	},
	data() {
		return {

		}
	},
	computed: {
		itemObject: function() {
			const type = this.legendOption.type || 'default'
			const finalClass = {
				item: true
			}
			switch (type) {
			case 'default':
				finalClass.itemDefault = true
				break
			case 'liner':
				finalClass.itemLiner = true
				break
			}
			return finalClass
		},
		squreObject: function() {
			const type = this.legendOption.type || 'default'
			console.log(type)
			const finalClass = {
				squre: true
			}
			switch (type) {
			case 'default':
				finalClass.squreDefault = true
				break
			case 'liner':
				finalClass.squreLiner = true
				break
			}
			return finalClass
		}
	},
	mounted() {
	},
	methods: {
	}
}
</script>

<style scoped>
.legend{
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  min-width: 144px;
  width: 10vw;
  max-width: 180px;
  box-shadow: 0 0 10px hsla(0, 0%, 40%, .65);
}
.title {
  background-color: #5252FB;
  color: #FFFFFF;
  text-align: center;
  width: 100%;
  height: 38px;
  line-height: 38px;
  font-size: 14px;
}
.squre {
  /* border: 1px solid #DEDEDE; */
  margin-left: 36px;
  margin-right: 18px;
  display: inline-block;
  vertical-align: middle;
}
.squreDefault{
  width: 20px;
  height: 20px;
}
.squreLiner{
  width: 20px;
  height: 8px;
}
.content {
    width: 100%;
    background-color: #FFFFFF;
}
.item {
    font-size: 12px;
}
.itemDefault{
  line-height: 38px;
}
.itemLiner{
  line-height: 20px;
}
.value{
  vertical-align: middle;
}
@media screen and (max-width: 414px) {
    .legend{
      visibility: hidden;
    }
}
</style>
