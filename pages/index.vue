<script setup lang="ts">
const topics = ref([{
	name: 'physics',
	icon: 'atom',
}, {
	name: 'biology',
	icon: 'dna',
}, {
	name: 'chemistry',
	icon: 'flask',
}, {
	name: 'mathematics',
	icon: 'formula',
}])
</script>

<template>
	<main class="flex flex-col gap-2">
		<h2 class="text-xl font-medium">Topics</h2>
		<div class="grid gap-3 grid-cols-3">
			<TopicCard v-for="{ name, icon } in topics" :key="name" :name="name" :icon="icon" />
		</div>
		<!-- <h2 class="text-xl font-medium">Topic</h2>
		<div class="grid gap-3 grid-cols-3">
			<ExamCard v-for="exam in exams" />
		</div> -->
	</main>
</template>