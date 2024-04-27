<script setup lang="ts">
const props = defineProps<{
	topic: string,
	point: number | string,
	color: string
}>()
const emit = defineEmits<{ (event: 'click'): void }>()
</script>

<template>
	<div class="relative flex flex-col gap-2 rounded-full bg-dark-500 pb-6 w-[88px]" @click="emit('click')">
		<div class="flex justify-center items-center rounded-full aspect-square border-8 p-4"
			:class="{ 'border-alert-500': color === 'red', 'border-primary-500': color === 'blue', 'border-success-500': color === 'green' }">
			<span class="text-xl">{{ point }}</span>
		</div>
		<span class="text-sm text-center capitalize">{{ topic }}</span>
	</div>
</template>