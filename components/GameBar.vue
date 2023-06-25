<script setup lang="ts">
const scores = defineProps<{
	opponent: {
		score: number,
		question: number
	},
	player: {
		score: number,
		question: number
	}
}>()

const health = computed(() => {
	if (!(scores.player.score + scores.opponent.score))
		return 50

	return (scores.player.score / (scores.player.score + scores.opponent.score)) * 80 + 10
})
</script>

<template>
	<div class="relative">
		<div class="relative flex rounded-lg w-full h-[92px] overflow-hidden">
			<div class="border-black border-r-[1px] rounded-lg rounded-r-none min-h-max bg-rose-500 transition-[width] ease-out duration-200"
				:style="{ width: `${100 - health}%` }" />
			<ProgressCircular :total="10" :value="scores.opponent" side="L" />
			<ProgressCircular :total="10" :value="scores.player" side="R" />
			<div class="border-black border-l-[1px] rounded-lg rounded-l-none min-h-max bg-blue-500 transition-[width] ease-out duration-200"
				:style="{ width: `${health}%` }">
			</div>
		</div>
		<!-- <ProgressCircular :total="600" :value="540" class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" /> -->
	</div>
</template>