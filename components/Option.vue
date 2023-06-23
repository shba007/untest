<script setup lang="ts">
const props = defineProps<{
	index: number,
	value: string,
	state: 'neutral' | 'selected' | 'wrong' | 'right',
}>()
</script>

<template>
	<div class="flex items-center gap-4 w-full h-12 rounded-full bg-slate-200 p-[6px] cursor-pointer"
		:class="{ 'outline outline-offset-2 outline-2 ': state !== 'neutral', 'outline-blue-400': state === 'selected', 'outline-rose-500': state === 'wrong', 'outline-emerald-500': state === 'right' }">
		<span class="inline-flex justify-center items-center rounded-full w-9 aspect-square  text-white"
			:class="{ 'bg-blue-500': state === 'neutral' || state === 'selected', 'bg-rose-500': state === 'wrong', 'bg-emerald-500': state === 'right' }">
			{{ index }}
		</span>
		<span>{{ value }}</span>
	</div>
</template>