<script setup lang="ts">
import type { Stats } from "~/pages/room/[id].vue";
import { questions } from "~/utils/qna";

const emit = defineEmits<{ (event: 'changeState', data: Stats): void }>()

function shuffle<T>(array: T[]): T[] {
	const shuffledArray = [...array];

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
}

const router = useRouter()
const route = useRoute()
const topic = 'biology'

const items = ref(shuffle(questions.filter(({ categories }) => categories.includes(topic))))

const { count: correctCount, inc: incCorrect } = useCounter(0, { min: 0, max: 10 })
const { count: incorrectCount, inc: incIncorrect } = useCounter(0, { min: 0, max: 10 })
const totalCount = computed(() => correctCount.value + incorrectCount.value)
const score = ref({
	correct: 0,
	incorrect: 0
})
const scores = computed(() => ({
	opponent: { score: score.value.incorrect, question: incorrectCount.value + 1 },
	player: { score: score.value.correct, question: correctCount.value + 1 }
}))

const item = computed(() => items.value[totalCount.value])

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

watch(remaining, () => {
	if (remaining.value === 0) {
		if (selectedAnswer.value === item.value.answer)
			incCorrect()
		else
			incIncorrect()

		selectedAnswer.value = undefined
		isSubmitted.value = false
	}
})

function onSubmit() {
	isSubmitted.value = true
	future.value = now.value.getTime() + 2000

	if (selectedAnswer.value === item.value.answer)
		score.value.correct++
	else
		score.value.incorrect++
}

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

const time = useInterval(1000)

watch(totalCount, () => {
	if (totalCount.value >= 10) {
		emit('changeState',
			{
				stand: scores.value.player.score > scores.value.opponent.score ? 'winner' : 'looser',
				correct: scores.value.player.score, wrong: scores.value.opponent.score,
				time: time.value + 's'
			}
		)
	}
})

</script>

<template>
	<main class="flex-1 relative flex flex-col gap-4">
		<GameBar :opponent="scores.opponent" :player="scores.player" />
		<span class="opacity-50">Question {{ totalCount + 1 }}/10</span>
		<Transition mode="out-in" enter-active-class="transition duration-200 ease-out"
			enter-from-class="transform translate-x-20  opacity-0" enter-to-class="transform translate-x-0 opacity-100"
			leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-x-0  opacity-100"
			leave-to-class="transform -translate-x-20  opacity-0">
			<div class="flex-1 flex flex-col" :key="item.id">
				<h1 class="grow text-2xl font-medium">{{ item.question }}</h1>
				<ul class="grow flex flex-col gap-6">
					<li v-for="option, index in item.options">
						<Option :index="index + 1" :value="option" :state="calculateState(index)" @click="onOptionChange(index)" />
					</li>
				</ul>
			</div>
		</Transition>
		<AppButton :title="remaining ? `Next in ${remaining.toFixed(0)}` : 'Submit'" :disabled="!!remaining"
			@submit="onSubmit" />
	</main>
</template>