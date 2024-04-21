<script setup lang="ts">
const props = defineProps<{
	name: string,
	icon: string,
}>()
</script>

<template>
	<NuxtLink :to="`/play?topic=${name}`"
		class="relative flex flex-col justify-center items-center size-28 m-2 bg-slate-300 rounded-lg">
		<NuxtIcon :name="icon" class="text-[64px]" />
		<span class="capitalize">{{ name }}</span>
	</NuxtLink>
</template>