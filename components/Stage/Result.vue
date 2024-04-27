<script setup lang="ts">
const props = defineProps<{
	stats: {
		stand: string,
		correct: number,
		wrong: number,
		time: string,
	}
}>()
</script>

<template>
	<main class="flex flex-col gap-8 items-center justify-center h-screen">
		<section class="mt-8">
			<Avatar name="Player 1" />
		</section>
		<h2 class="text-2xl">You are {{ stats.stand }}</h2>
		<section class="flex-1 flex justify-between items-start w-full">
			<PointCard topic="correct" :point="stats.correct" color="blue" />
			<PointCard topic="wrong" :point="stats.wrong" color="red" />
			<PointCard topic="time" :point="stats.time" color="green" />
		</section>
		<AppButton title="Go to Main" href="/menu" />
	</main>
</template>