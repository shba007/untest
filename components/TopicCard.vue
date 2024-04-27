<script setup lang="ts">
const props = defineProps<{
	topic: string,
	icon: string,
	// color: string
}>()
const emit = defineEmits<{ (event: 'click'): void }>()
</script>

<template>
	<div class="flex flex-col gap-2 rounded-full bg-dark-500 pb-6" @click="emit('click')">
		<div class="flex items-center justify-center rounded-full aspect-square border-8 p-4"
			:class="{ 'border-alert-500': topic === 'math', 'border-primary-500': topic === 'physics' || topic === 'biology', 'border-success-500': topic === 'chemistry' }">
			<NuxtIcon :name="icon" class="text-[48px]" />
		</div>
		<span class="text-sm text-center capitalize">{{ topic }}</span>
	</div>
</template>