export const useTestStore = defineStore('test', () => {
  const id = ref<string | null>()
  const questions = ref<Question[]>([])
  const answers = ref<Answer[]>([])
  const { counter: duration, resume, pause, reset, isActive } = useInterval(1000, { immediate: false, controls: true })

  const stats = computed(() => {
    const [correctCount, incorrectCount] = answers.value.reduce(([correctCount, incorrectCount], { id, answer }) => {
      const question = questions.value.find((question) => question.id === id)
      if (!question)
        return [correctCount, incorrectCount]

      return (question.answer === answer) ? [correctCount + 1, incorrectCount] : [correctCount, incorrectCount + 1]
    }, [0, 0])

    return {
      correctCount,
      incorrectCount,
      duration: duration.value
    }
  })

  function addAnswer(answer: Answer) {
    if (!isActive) {
      reset()
      resume()
    }

    answers.value.push(answer)
  }

  function getResult() {
    if (isActive) {
      pause()
      reset()
    }

    return {
      testId: id.value,
      answers: answers.value
    }
  }

  return {
    id, questions, answers,
    stats,
    addAnswer, getResult
  }
})