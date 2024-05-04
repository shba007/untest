import { Prisma, PrismaClient } from "@prisma/client"
import JWT from 'jsonwebtoken'

const prisma = new PrismaClient()

interface Request {
  name: string
}

interface Response {
  accessToken: string,
  refreshToken: string
}

function preprocess(name: string) {
  name = name.trim()
  name = name.toLowerCase()
  return name.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")
}

export default defineEventHandler(async (event) => {
  const { name } = await readBody<Request>(event)
  try {
    const config = useRuntimeConfig()

    let processedName = preprocess(name)

    const user = await prisma.user.findFirstOrThrow({
      where: {
        name: processedName
      }, select: {
        id: true
      }
    })

    let accessToken = JWT.sign({ id: user.id }, config.private.authAccessSecret, { expiresIn: '7d' })

    return {
      accessToken: accessToken,
      refreshToken: ''
    }
  } catch (error: any) {
    console.error(`API result POST`, error)

    if (error?.statusCode)
      throw error

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025')
        throw createError({ statusCode: 404, statusMessage: `${name} user not found` })
    }

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
