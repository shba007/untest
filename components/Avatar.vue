<script setup lang="ts">
const props = defineProps<{
	name: string
}>()
</script>

<template>
	<div class="flex flex-col gap-2 items-center justify-center">
		<div class="size-24 bg-primary-500 border-[6px] border-white rounded-full"></div>
		<span>{{ name }}</span>
	</div>
</template>