<script setup lang="ts">
const router = useRouter()
const testStore = useTestStore()

const { data: days } = await useFetch('/api/test', { method: 'get', onRequest: authInterceptor })

function goToTest(id: string, isComplete: boolean) {

  if (!isComplete)
    router.push({ path: `/test/${id}` })
}

onMounted(() => {
  testStore.reset()
})
</script>

<template>
  <main class="flex flex-col gap-8 items-center  h-screen">
    <h1 class="text-lg">All Tests</h1>
    <section class="grid grid-cols-4 gap-2 justify-between w-full">
      <TopicCard v-for="{ id, createdAt, isComplete }, index of days" :key="id" :topic="(index + 1).toString()"
        :color="index % 2 === 0 ? 'red' : 'blue'" :done="isComplete" @click="goToTest(id, isComplete)" />
    </section>
    <span />
    <AppButton title="Go to Leaderboard" href="/leaderboard" class="mt-auto" />
    <!-- <h1>Join a Room</h1> -->
    <!-- <AppInput placeholder="Code" title="Join" /> -->
  </main>
</template>
