<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `Compeer - ${titleChunk}` : 'Compeer'),
})
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = ref(true)

watchEffect(() => {
  if (process.client)
    isMobile.value = breakpoints.smaller('sm').value
})
</script>

<template>
  <div v-show="isMobile">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <main v-show="!isMobile" class="flex flex-col gap-4 justify-center items-center w-screen h-screen">
    <!-- TODO: Improve Notice -->
    <div>
      <h1>The Desktop site is Under Development</h1>
      <h2>Please use your Mobile to Visit</h2>
    </div>
  </main>
</template>

<style>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.nuxt-icon>svg {
  @apply !m-0;
}
</style>