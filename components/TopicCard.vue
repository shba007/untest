<script setup lang="ts">
const props = defineProps<{
	name: string,
	icon: string,
}>()
</script>

<template>
	<NuxtLink :to="`/play?topic=${name}`"
		class="relative flex justify-center items-center w-[100px] h-[100px] m-2 bg-slate-300 rounded-lg">
		<NuxtIcon :name="icon" class="text-[64px]" />
	</NuxtLink>
</template>