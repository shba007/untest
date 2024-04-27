<script setup lang="ts">
export type Stage = 'wait' | 'play' | 'result'

export interface Stats {
	stand: string;
	correct: number;
	wrong: number;
	time: string;
}

const stage = ref<Stage>('play')
const stats = ref<Stats | null>(null)

function changeState(newStage: Stage, data?: Stats) {
	stage.value = newStage

	if (stage.value === 'result') {
		stats.value = { ...data! }
	}
}
</script>

<template>
	<!-- Waiting Stage -->
	<StageWait v-if="stage === 'wait'" />
	<!-- Playing Stage -->
	<StagePlay v-else-if="stage === 'play'" @changeState="(data) => changeState('result', data)" />
	<!-- Result Stage -->
	<StageResult v-else :stats="stats!" />
</template>