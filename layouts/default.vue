<template>
  <div class="relative flex flex-col h-screen">
    <NuxtLoadingIndicator color="#2563EB" />
    <div class="relative flex flex-col px-4 py-8 h-full ">
      <slot />
    </div>
  </div>
</template>