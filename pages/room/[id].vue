<script setup lang="ts">
export type Stage = 'wait' | 'play' | 'result'

const route = useRoute()
const roomId = route.query.id?.toString()

export interface Stats {
  stand: string;
  correct: number;
  wrong: number;
  time: string;
}

/* const { status, data, send, open, close } = useWebSocket(`ws://localhost:3000/api/room/${roomId}`)

watch(status, (value, oldValue) => {
  console.log("Diff status", oldValue, "->", value)

  if (value === "OPEN") {
    send('ping')
  }
})

watch(data, (value, oldValue) => {
  console.log("Diff Data", oldValue, "->", value)
})
 */

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
  <StagePlay v-else-if="stage === 'play'" :topic="roomId ?? ''" @changeState="(data) => changeState('result', data)" />
  <!-- Result Stage -->
  <StageResult v-else :stats="stats!" />
</template>