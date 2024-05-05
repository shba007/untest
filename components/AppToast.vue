<script setup lang="ts">
const props = defineProps<{
  type: 'success' | 'warning' | 'alert',
  message: string
}>()
const emit = defineEmits<{ (event: 'close'): void }>()

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return 'toast-check'
    case 'warning':
      return 'toast-exclamation'
    case 'alert':
      return 'toast-cross'
  }
})
</script>

<template>
  <div
    class="fixed top-5 left-1/2 -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-dark-500 rounded-lg shadow"
    role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
      <NuxtIcon :name="icon" filled class="text-[20px]" />
    </div>
    <div class="ms-3 text-sm font-normal">{{ message }}</div>
    <button type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-dark-400 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      @click="emit('close')">
      <NuxtIcon name="toast-close" class="text-[12px]" />
    </button>
  </div>
</template>