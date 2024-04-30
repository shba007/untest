import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";
import { Question } from "~/utils/models";

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

const config = useRuntimeConfig()

const filePath = path.join(process.cwd(), config.private.rootDir, 'questions-psychology.yml')
const fileContents = fs.readFileSync(filePath, "utf8");
const questions: Question[] = yaml.parse(fileContents);

export default defineEventHandler<Question[]>(() => {
  try {
    return shuffle(questions)
  } catch (error: any) {
    console.error("API certificate GET", error)

    throw createError({ statusCode: 500, statusMessage: "Some Unknown Error Found" })
  }
})