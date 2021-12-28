<template>
  <div class="w-full h-full p-3 bg-white rounded border-2 border-gray-300">
    <div class="w-full text-center">
      <div class="w-2/3 relative mx-auto text-gray-600 inline-block align-middle">
        <input
          class="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="请输入站号"
        >
        <button type="submit" class="absolute right-0 top-0 bottom-0 my-auto focus:outline-none mr-2">
          <svg
            id="Capa_1"
            class="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style="enable-background:new 0 0 56.966 56.966;"
            xml:space="preserve"
            width="512px"
            height="512px"
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </button>
      </div>
      <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none align-middle ml-3">
        提  交
      </button>
    </div>
    <div id="tableContainer" style="height: 50vh" class="w-full border-solid border-2 border-gray-300 rounded-lg mt-4 overflow-y-auto overflow-x-hidden">
      <section class="text-gray-700 body-font">
        <div class="container mx-auto">
          <div class="w-full mx-auto overflow-hidden">
            <table class="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tl rounded-bl">站号</th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200">站名</th>
                  <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-200 rounded-tr rounded-br">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(station, $index) in list" :key="$index">
                  <td class="border-t-2 border-b-2 border-gray-200 px-4 py-3">{{ station.stationNumber }}</td>
                  <td style="max-width: 2.4rem" class="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 truncate ">{{ station.stationName }}</td>
                  <td class="border-t-2 border-b-2 border-gray-200 w-10 text-center">
                    <div class="pretty p-svg p-curve p-pulse">
                      <input type="checkbox">
                      <div class="state p-success">
                        <!-- svg path -->
                        <svg class="svg svg-icon" viewBox="0 0 20 20">
                          <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;" />
                        </svg>
                        <label />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <InfiniteLoading @infinite="infiniteHandler" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import VueTypes from 'vue-types'
// import Scrollload from 'Scrollload'
import 'pretty-checkbox/dist/pretty-checkbox.min.css'
import InfiniteLoading from 'vue-infinite-loading'
export default {
	name: 'ToolBarSelect',
	components: { InfiniteLoading },
	props: {
	},
	data() {
		return {
			page: 1,
			list: [{
				stationNumber: '12324',
				stationName: '12321313',
			}, {
				stationNumber: '1',
				stationName: '12321313',
			}]
		}
	},
	mounted() {
	},
	updated() {
	},
	 beforeDestroy() {
	},
	methods: {
		infiniteHandler($state) {
			// console.log('push')
			this.list.push({
				stationNumber: '12324',
				stationName: 'add',
			})
			$state.complete()
		}
	}
}
</script>
<style scoped>
#tableContainer::-webkit-scrollbar {
    width: 10px;
    background-color: #F5F5F5;
}
#tableContainer::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(219, 219, 219);
}
</style>
