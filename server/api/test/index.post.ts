import { PrismaClient } from "@prisma/client"
import { readAuth } from "~/server/utils/authHandler";

const prisma = new PrismaClient()

interface Request {
  testId: string;
  answers: [{ id: string, answer: number }]
}

export default defineEventHandler(async (event) => {
  try {
    const { testId, answers } = await readBody<Request>(event)
    const userId = readAuth(event)

    const { questions } = await prisma.test.findUniqueOrThrow({
      where: {
        id: testId,
      }, include: { questions: true }
    })

    const [correctCount, incorrectCount] = answers.reduce(([correctCount, incorrectCount], { id, answer }) => {
      if (answer === questions.find((question) => question.id.toString() === id)?.answer)
        correctCount++
      else
        incorrectCount++

      return [correctCount, incorrectCount]
    }, [0, 0])

    const result = await prisma.result.create({
      data: {
        userId,
        testId,
        correctCount,
        incorrectCount,
        duration: 0
      }
    })

    return result
  } catch (error: any) {
    console.error(`API result POST`, error)

    if (error?.statusCode)
      throw error

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
