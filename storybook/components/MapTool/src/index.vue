<template>
	<div class="flex flex-wrap">
		<div class="w-full">
			<ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row cursor-pointer">
				<li class="-mb-px last:mr-0 flex-auto text-center">
					<a
						class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
						:class="{
							'text-blue-500 bg-blue-900': openTab !== 1,
							'text-blue-900 bg-blue-500': openTab === 1,
						}"
						@click="toggleTabs(1)"
					>
						<map-draw theme="outline" size="24" fill="#333" :stroke-width="2" />
						地图切换
					</a>
				</li>
				<li class="-mb-px last:mr-0 flex-auto text-center">
					<a
						class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
						:class="{
							'text-blue-500 bg-blue-900': openTab !== 2,
							'text-blue-900 bg-blue-500': openTab === 2,
						}"
						@click="toggleTabs(2)"
					>
						<tool theme="outline" size="24" fill="#333" :stroke-width="2" /> 地图工具
					</a>
				</li>
			</ul>
			<div
				class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
			>
				<div class="px-4 py-5 flex-auto">
					<div class="tab-content tab-space">
						<div :class="{ hidden: openTab !== 1, block: openTab === 1 }">
							<p>
								Collaboratively administrate empowered markets via plug-and-play
								networks. Dynamically procrastinate B2C users after installed base
								benefits.
								<br />
								<br />
								Dramatically visualize customer directed convergence without
								revolutionary ROI.
							</p>
						</div>
						<div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
							<p>
								Completely synergize resource taxing relationships via premier niche
								markets. Professionally cultivate one-to-one customer service with
								robust ideas.
								<br />
								<br />
								Dynamically innovate resource-leveling customer service for state of the
								art customer service.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { MapDraw, Tool } from '@icon-park/vue';
// import VueTypes from 'vue-types';
export default {
	name: 'PinkTabs',
	components: {
		MapDraw,
		Tool,
	},
	data() {
		return {
			openTab: 1,
		};
	},
	methods: {
		toggleTabs: function(tabNumber) {
			this.openTab = tabNumber;
		},
	},
};
</script>
