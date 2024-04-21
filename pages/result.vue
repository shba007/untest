<script setup lang="ts">
import confetti from 'canvas-confetti';

const route = useRoute()

const right = computed(() => Number(route.query.right))
const wrong = computed(() => Number(route.query.wrong))
const score = ref(right.value - wrong.value)

onMounted(() => {
	if (score.value >= 3) {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 }
		})
	}
})
</script>

<template>
	<main class="relative  flex flex-col justify-between items-center h-full">
		<span class="text-2xl font-semibold">🎉Congrates! You completed</span>
		<img
			src="https://images.unsplash.com/photo-1572467551143-a57f5de1f861?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			alt="background-img" class="aspect-video w-full object-cover rounded-lg" />
		<div class="flex items-center justify-between w-full text-white">
			<div
				class="flex flex-col gap-2 justify-center items-center rounded-full w-24 p-2 bg-sky-500 border-4 border-sky-700  aspect-square">
				<h2 class="text-lg">Right</h2>
				<span class="text-lg">{{ right }}</span>
			</div>
			<div
				class="flex flex-col gap-2 justify-center items-center rounded-full w-24 p-2 bg-pink-500 border-4 border-pink-700  aspect-square">
				<h2 class="text-lg">Wrong</h2>
				<span class="text-lg">{{ wrong }}</span>
			</div>
			<div class="flex flex-col gap-2 justify-center items-center rounded-full w-28 p-2 border-4 aspect-square"
				:class="score > 0 ? 'bg-sky-500 border-sky-700' : 'bg-pink-500 border-pink-700'">
				<h2 class="text-lg">Score</h2>
				<span class="text-lg">{{ score }}</span>
			</div>
		</div>
		<NuxtLink to="/" class="rounded-2xl p-3 w-full bg-blue-500 text-white text-lg font-medium text-center">
			Go to main
		</NuxtLink>
	</main>
</template>