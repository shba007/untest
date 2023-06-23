<script setup lang="ts">
const items = ref([{
	"id": "20",
	"question": "Which artery supplies oxygenated blood to the stomach",
	"options": [
		"Carotid artery",
		"Gastric artery",
		"Celiac artery",
		"Cephalic artery"
	],
	"answer": 3,
	"categories": [
		"biology"
	]
}, {
	"id": "21",
	"question": "Five words are given below. Four of them are similar. Choose the word which is not similar to the remaining: Paper, Wool, Wood, Plastic, Leather",
	"options": [
		"Paper",
		"Wool",
		"Wood",
		"Plastic"
	],
	"answer": 4,
	"categories": [
		"logic"
	]
}])

const { count, inc } = useCounter(0, { min: 0, max: 1 })
const item = computed(() => items.value[count.value])

const selectedAnswer = ref<number>()
const isSubmitted = ref(false)

function onOptionChange(index: number) {
	if (isSubmitted.value)
		return

	selectedAnswer.value = index + 1
}

const now = useNow({ interval: 500 })
const future = ref<number>()
const remaining = computed(() => Math.max(future.value ? (future.value - now.value.getTime()) / 1000 : 0, 0))

function onSubmit() {
	isSubmitted.value = true
	future.value = now.value.getTime() + 2000
}

watch(remaining, () => {
	if (remaining.value === 0) {
		inc()
		selectedAnswer.value = undefined
		isSubmitted.value = false
	}
})

function calculateState(index: number) {
	if (selectedAnswer.value !== undefined && isSubmitted.value && index + 1 === item.value.answer)
		return 'right'

	if (selectedAnswer.value === index + 1) {
		if (isSubmitted.value)
			return selectedAnswer.value === item.value.answer ? 'right' : 'wrong'
		else
			return 'selected'
	} else
		return 'neutral'
}
</script>

<template>
	<main class="flex-1 relative flex flex-col gap-4">
		<GameBar />
		<span class="opacity-50">Question {{ count + 1 }}/10</span>
		<Transition mode="out-in" enter-active-class="transition duration-300 ease-out"
			enter-from-class="transform translate-x-20 scale-95 opacity-0"
			enter-to-class="transform translate-x-0 scale-100 opacity-100"
			leave-active-class="transition duration-300 ease-in"
			leave-from-class="transform translate-x-0 scale-100 opacity-100"
			leave-to-class="transform -translate-x-20 scale-95 opacity-0">
			<div class="flex-1 flex flex-col" :key="item.id">
				<h1 class="grow text-2xl font-medium">{{ item.question }}</h1>
				<ul class="grow flex flex-col gap-6">
					<li v-for="option, index in item.options">
						<Option :index="index + 1" :value="option" :state="calculateState(index)"
							@click="onOptionChange(index)" />
					</li>
				</ul>
			</div>
		</Transition>
		<button class="rounded-2xl p-3 w-full bg-blue-500 text-white text-lg font-medium text-center" @click="onSubmit"
			:disabled="!!remaining">
			{{ remaining ? `Next in ${remaining.toFixed(0)}` : 'Submit' }}
		</button>
	</main>
</template>