<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

const name = computed(() => userStore.name)

const { data, execute } = await useFetch('/api/auth/login', { method: 'post', body: { name }, immediate: false })

async function onSubmit(value: string) {
  userStore.updateName(value)
  await execute()
  if (data.value)
    authStore.accessToken = data.value.accessToken

  router.push({ path: '/test' })
}
</script>

<template>
  <main class="flex flex-col gap-2 items-center justify-center h-screen">
    <h1 class="my-auto text-xl text-center align-middle">Welcome to Untest</h1>
    <AppInput placeholder="Fullname" title="Next" @submit="onSubmit" />
    <!-- <AppButton title="Next" href="/menu" /> -->
  </main>
</template>
