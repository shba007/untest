<script setup lang="ts">
const props = defineProps<{
  total: number,
  value: {
    score: number,
    question: number
  },
  side: 'L' | 'R'
}>()

const percentage = computed(() => Math.round((props.value.question / props.total) * 100) / 100)
</script>

<template>
  <div
    class="absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-[7rem] aspect-square bg-gray-900">
    <div class="relative w-fit h-fit scale-105">
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="48" r="43.2" class="stroke-rose-500" stroke-width="6" />
        <circle cx="48" cy="48" r="43.2" stroke-linecap="round" class="stroke-white" stroke-width="6"
          stroke-dasharray="270" :stroke-dashoffset="(side === 'L' ? 1 : -1) * 270 * (1 - percentage)"
          transform="rotate(-90 48 48)" />
      </svg>
      <span class="absolute top-1/2 text-white text-2xl font-head -translate-y-1/2"
        :class="side === 'L' ? 'right-[26px]' : 'left-[26px]'">
        {{ value.score }}
      </span>
    </div>
  </div>
</template>