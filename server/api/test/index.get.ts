import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const userId = readAuth(event)

    const tests = await prisma.test.findMany({
      orderBy: {
        createdAt: "asc"
      }, select: {
        id: true,
        createdAt: true,
        updatedAt: true
      }
    })

    const userTests = (await prisma.result.findMany({
      where: {
        userId
      }, select: {
        testId: true
      }
    })).map(({ testId }) => testId)

    return tests.map(({ id, createdAt, updatedAt }) => ({
      id, createdAt, updatedAt, isComplete: userTests.includes(id)
    }))
  } catch (error: any) {
    console.error("API test GET", error)

    if (error?.statusCode)
      throw error

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})