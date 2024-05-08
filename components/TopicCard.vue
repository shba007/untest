<script setup lang="ts">
const props = defineProps<{
  topic: string,
  done: boolean,
  // icon: string,
  color: 'red' | 'blue' | 'green'
}>()
const emit = defineEmits<{ (event: 'click'): void }>()
</script>

<template>
  <div class="flex flex-col gap-2 rounded-full bg-dark-500 pb-6" @click="emit('click')">
    <div class="flex items-center justify-center rounded-full aspect-square border-8 p-4"
      :class="{ 'border-alert-500': !done, 'border-primary-500': done }">
      <!-- <NuxtIcon :name="icon" class="text-[48px]" /> -->
      <div class="text-xl">
        {{ topic }}
      </div>
    </div>
    <span class="text-sm text-center capitalize">{{ done ? 'done' : 'take' }}</span>
  </div>
</template>