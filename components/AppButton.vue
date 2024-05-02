<script setup lang="ts">
const { disabled = false } = defineProps<{
  title: string,
  disabled?: boolean,
  href?: string,
  class?: string
}>()

const emit = defineEmits<{ (event: 'submit'): void }>()

</script>

<template>
  <NuxtLink v-if="href" :href="href"
    class="rounded-2xl p-2.5 w-full bg-primary-500 text-white text-lg font-medium text-center" :class="class"
    :disabled="disabled">
    {{ title }}
  </NuxtLink>
  <button v-else class="rounded-2xl p-2.5 w-full bg-primary-500 text-white text-lg font-medium text-center"
    :class="class" @click="emit('submit')" :disabled="disabled">
    {{ title }}
  </button>
</template>