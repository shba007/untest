import { PrismaClient, Tag } from "@prisma/client";
import { faker } from '@faker-js/faker';

import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

const prisma = new PrismaClient();

function readFile<T>(fileName: string) {
  const filePath = path.join(process.cwd(), '/prisma/data/', fileName + ".yml")
  const fileContents = fs.readFileSync(filePath, "utf8");
  return yaml.parse(fileContents) as T[]
}

interface User {
  id: string,
  name: string,
  results: {
    testId: string;
    date: string
    correctCount: number
    incorrectCount: number
    duration: number
  }[]
}

interface Test {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  questions: string[];
}

async function createUsers() {
  const fileUsers = readFile<User>('users')

  await prisma.user.createMany({
    data: fileUsers.map(({ id, name }) => ({
      id,
      name
    }))
  })

  const users = await prisma.user.findMany()

  console.log({ users })

  return users
}

async function createTests() {
  const fileTests = readFile<Omit<Test, 'updatedAt'>>('tests')

  await prisma.test.createMany({
    data: fileTests.map(({ id, createdAt }) => ({ id, createdAt }))
  })

  const tests = await prisma.test.findMany({})

  console.log({ tests })

  return tests.map(({ id, createdAt, updatedAt }) => ({
    id,
    createdAt,
    updatedAt,
    questions:
      fileTests.find((test) => test.id === id)!.questions
  }))
}

async function createQuestions(tests: Test[]) {
  const fileQuestions = readFile<Question>('questions')
  const questionTestMap: { [question: string]: string } =
    tests.reduce((acc, { id: testId, questions }) => {
      return {
        ...acc, ...questions.reduce((acc, questionId) => {
          acc[questionId] = testId
          return acc
        }, {} as { [question: string]: string })
      }
    }, {} as { [question: string]: string })

  console.log({ questionTestMap })

  await prisma.question.createMany({
    data: fileQuestions.map(({ id, question, options, answer, tags }) => ({
      testId: questionTestMap[id],
      id: parseInt(id, 10),
      question,
      options,
      answer,
      tags: tags.map((category) => category.toUpperCase()) as Tag[]
    }))
  })
}

async function createResults() {
  const fileUsers = readFile<User>('users')

  await prisma.result.createMany({
    data: [...fileUsers.flatMap(({ id, results }) => {
      return results.map((result) => ({ ...result, userId: id }))
    })]
  })

  const results = await prisma.result.findMany()

  console.log({ results })

  return results
}

async function createTestUser() {
  const user = await prisma.user.create({
    data: {
      name: 'Test User 1',
    }
  })

  console.log(user)

  return user
}

async function main() {
  // const users = await createUsers()
  // const tests = await createTests()
  // const questions = await createQuestions(tests)
  // const results = await createResults()

  await createTestUser()
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });