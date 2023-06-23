<script setup lang="ts">
const exams = ref([1, 2, 3, 4, 5, 6])
</script>

<template>
	<main class="flex flex-col gap-2">
		<h2 class="text-xl font-medium">Exam</h2>
		<div class="grid gap-3 grid-cols-3">
			<ExamCard v-for="exam in exams" />
		</div>
		<h2 class="text-xl font-medium">Topic</h2>
		<div class="grid gap-3 grid-cols-3">
			<ExamCard v-for="exam in exams" />
		</div>
	</main>
</template>