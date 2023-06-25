<script setup lang="ts">
const route = useRoute()
const score = route.query.score
</script>

<template>
	<main class="relative  flex flex-col justify-between items-center h-full">
		<span> </span>
		<div class="flex flex-col gap-4 justify-center items-center rounded-md px-4 py-2 bg-slate-300">
			<h2 class="text-xl">Final Score</h2>
			<span class="text-2xl">{{ score }}</span>
		</div>
		<NuxtLink to="/" class="rounded-2xl p-3 w-full bg-blue-500 text-white text-lg font-medium text-center">
			Go to main
		</NuxtLink>
	</main>
</template>