import { PrismaClient, Role } from "@prisma/client"

const prisma = new PrismaClient()

interface Response {
  id: string,
  name: string,
  stats: {
    totalCorrectCount: number,
    totalIncorrectCount: number,
    totalDuration: number
  }
}

function sortByRaking(data: Response[]) {
  return data.sort((a, b) => {
    if (a.stats.totalCorrectCount !== b.stats.totalCorrectCount) {
      return b.stats.totalCorrectCount - a.stats.totalCorrectCount;
    } else {
      return a.stats.totalDuration - b.stats.totalDuration;
    }
  });
}

export default defineEventHandler<Promise<Response[]>>(async (event) => {
  try {
    const query = getQuery(event)
    // const userId = readAuth(event)

    const dateRange = {
      start: query.start ? new Date(query.start as string) : null,
      end: query.end ? new Date(query.end as string) : null
    }

    const users = await prisma.user.findMany({
      where: {
        role: Role.USER
      },
      include: {
        results: true
      }
    })

    return sortByRaking(users.map(({ id, name, results }) => {
      const [totalCorrectCount, totalIncorrectCount, totalDuration] = results
        .filter(({ date }) => {
          if (dateRange.start && !(dateRange.start <= date))
            return false

          if (dateRange.end && !(date <= dateRange.end))
            return false

          return true
        })
        .reduce(([totalCorrectCount, totalIncorrectCount, totalDuration], { correctCount, incorrectCount, duration }) =>
          [totalCorrectCount + correctCount, totalIncorrectCount + incorrectCount, totalDuration + duration]
          , [0, 0, 0])

      return {
        id,
        name,
        stats: {
          totalCorrectCount,
          totalIncorrectCount,
          totalDuration
        }
      }
    }))
  } catch (error) {
    console.error("API user GET", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})
