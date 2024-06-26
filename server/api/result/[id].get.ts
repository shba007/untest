import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const testId = getRouterParam(event, 'id')

  try {
    if (!testId)
      throw createError({ statusCode: 400, statusMessage: 'Test Id not found' })

    const userId = readAuth(event)

    const result = await prisma.result.findUniqueOrThrow({
      where: {
        userId_testId: {
          userId,
          testId
        }
      }
    })

    // TODO: Test Id not found

    return result
  } catch (error: any) {
    console.error(`API result/${testId} GET`, error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
