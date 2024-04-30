<script setup lang="ts">
const router = useRouter()
const user = useUserStore()

function onSubmit(value: string) {
  user.updateName(value)
  router.push({ path: '/room/psychology' })
}
</script>

<template>
  <main class="flex flex-col gap-2 items-center justify-center h-screen">
    <h1 class="my-auto text-xl text-center align-middle">Welcome to Untest</h1>
    <AppInput placeholder="Fullname" title="Next" @submit="onSubmit" />
    <!-- <AppButton title="Next" href="/menu" /> -->
  </main>
</template>
