<script setup lang="ts">
const props = withDefaults(defineProps<{
  topic: string,
  point: number | string,
  color: 'red' | 'green' | 'blue',
  size?: 'compact' | 'standard'
}>(), {
  size: 'standard'
})
const emit = defineEmits<{ (event: 'click'): void }>()
</script>

<template>
  <div class="relative flex flex-col gap-2 rounded-full h-full bg-dark-500 "
    :class="size === 'standard' ? 'w-[88px] pb-6' : 'w-[44px]'" @click="emit('click')">
    <div class="flex justify-center items-center rounded-full aspect-square"
      :class="[{ 'border-alert-500': color === 'red', 'border-primary-500': color === 'blue', 'border-success-500': color === 'green' }, size === 'standard' ? 'p-4 border-8' : 'p-2 border-2']">
      <span :class="size === 'standard' ? 'text-xl' : 'text-sm'">{{ point }}</span>
    </div>
    <span v-if="size === 'standard'" class="text-sm text-center capitalize">{{ topic }}</span>
  </div>
</template>