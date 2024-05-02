import { PrismaClient } from "@prisma/client";
import { Question } from "~/utils/models";

const prisma = new PrismaClient()

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

interface Response {
  id: string,
  questions: Question[]
}

export default defineEventHandler<Promise<Response>>(async (event) => {
  try {
    const config = useRuntimeConfig()
    const userId = readAuth(event)

    const test = await prisma.test.findUniqueOrThrow({
      where: {
        id: config.private.testId,
      }, include: { questions: true }
    })

    return {
      id: config.private.testId,
      questions: shuffle(test.questions.map<Question>(({ id, question, options, answer, tags }) => {
        return {
          id: id.toString(),
          question: question,
          options: options,
          answer: answer,
          tags: tags as string[]
        }
      }))
    }
  } catch (error: any) {
    console.error("API test GET", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})