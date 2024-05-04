export const useTestStore = defineStore('test', () => {
  const id = ref<string | null>()
  const questions = ref<Question[]>([])
  const answers = ref<Answer[]>([])
  const { counter, resume, pause, reset, isActive } = useInterval(1000, { controls: true })

  const stats = computed(() => {
    const [correctCount, incorrectCount] = answers.value.reduce(([correctCount, incorrectCount], { id, answer }) => {
      const question = questions.value.find((question) => question.id === id)
      if (!question)
        return [correctCount, incorrectCount]

      return (question.answer === answer) ? [correctCount + 1, incorrectCount] : [correctCount, incorrectCount + 1]
    }, [0, 0])

    const duration = counter.value

    return {
      correctCount,
      incorrectCount,
      duration,
    }
  },)

  function addAnswer(answer: Answer) {
    if (!isActive) {
      reset()
    }

    answers.value.push(answer)
  }

  function getResult() {
    if (isActive) {
      pause()
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