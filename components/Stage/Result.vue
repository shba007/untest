<script setup lang="ts">
import confetti from 'canvas-confetti';

const props = defineProps<{
	stats: {
		stand: string,
		correct: number,
		wrong: number,
		time: string,
	}
}>()

const user = useUserStore()

onMounted(() => {
	if (props.stats.stand === 'winner') {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 }
		})
	}
})
</script>

<template>
	<main class="flex flex-col gap-8 items-center justify-center h-screen">
		<section class="mt-8">
			<Avatar :name="user.name ?? ''" />
		</section>
		<!-- <h2 class="text-2xl">You are {{ stats.stand }}</h2> -->
		<h2 class="text-xl">{{ user.name?.split(' ')[0] }}'s Report</h2>
		<section class="flex-1 flex justify-between items-start w-full">
			<PointCard topic="correct" :point="stats.correct" color="blue" />
			<PointCard topic="wrong" :point="stats.wrong" color="red" />
			<PointCard topic="time" :point="stats.time" color="green" />
		</section>
		<AppButton title="Go to Main" href="/" />
	</main>
</template>