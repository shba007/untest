<script setup lang="ts">
const router = useRouter()

interface Topic {
	topic: string;
	icon: string;
}

const topics = ref<Topic[]>([{
	topic: 'mathematics',
	icon: 'formula'
}, {
	topic: 'physics',
	icon: 'atom'
}, {
	topic: 'chemistry',
	icon: 'flask'
}, {
	topic: 'biology',
	icon: 'dna'
}, {
	topic: 'mathematics',
	icon: 'formula'
}, {
	topic: 'physics',
	icon: 'atom'
}, {
	topic: 'chemistry',
	icon: 'flask'
}, {
	topic: 'biology',
	icon: 'dna'
}, {
	topic: 'mathematics',
	icon: 'formula'
}, {
	topic: 'physics',
	icon: 'atom'
}, {
	topic: 'chemistry',
	icon: 'flask'
}, {
	topic: 'biology',
	icon: 'dna'
}])

function createRoom(topic: string) {
	router.push({ path: `room/${topic}` })
}
</script>

<template>
	<main class="flex flex-col gap-2 items-center justify-center h-screen">
		<h1>Create a new Room</h1>
		<section class="flex gap-2 flex-wrap">
			<TopicCard v-for="{ topic, icon }, index of topics" :key="index" :topic="topic" :icon="icon"
				@click="createRoom(topic)" />
		</section>
		<span />
		<h1>Join a Room</h1>
		<AppInput placeholder="Code" title="Join" />
	</main>
</template>
