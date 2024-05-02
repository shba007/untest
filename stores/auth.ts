export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>('eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjZlM2RkOTY0LTk3YzYtNDY1Zi04ZWI5LTljMTAyZmY4OWE5YSJ9.Syh9IhgIiEoKRFd0rWNU5wGRB1faC1tU96AXMyUZe6Q')
  const refreshToken = ref<string | null>()

  return { accessToken, refreshToken }
})