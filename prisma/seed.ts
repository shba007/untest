import { PrismaClient, Role, Tag } from "@prisma/client";
import { faker } from '@faker-js/faker';

import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";

const prisma = new PrismaClient();

function readFileConstractor<T>(fileName: string, type: 'seed' | 'backup') {
  const filePath = path.join(process.cwd(), `/prisma/data/${type}/${fileName}.yml`)
  const fileContents = fs.readFileSync(filePath, "utf8");
  return yaml.parse(fileContents) as T[]
}

function readFile<T>(fileName: string) {
  return readFileConstractor<T>(fileName, 'seed')
}

interface User {
  id: string,
  name: string,
  email: string,
  image: string,
  role: string,
  createdAt: Date
  updatedAt: Date
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
  questions: Question[];
}

async function createUsers() {
  const fileUsers = readFile<User>('users')

  console.log({ fileUsers })

  await prisma.user.createMany({
    data: fileUsers.map(({ id, name, email, image, role, createdAt, updatedAt }) => ({
      id,
      name,
      email,
      image,
      role: role.toUpperCase() as Role,
      createdAt,
      updatedAt
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

  return tests.map(({ id, isDraft, createdAt, updatedAt }) => ({
    id,
    isDraft,
    createdAt,
    updatedAt,
    questions: fileTests.find((test) => test.id === id)!.questions
  }))
}

async function createQuestions() {
  const fileTests = readFile<Test>('tests')

  await prisma.question.createMany({
    data: fileTests.flatMap(({ id: testId, questions }) =>
      questions.map(({ id, question, options, answer, tags }) => ({
        testId,
        id: parseInt(id, 10),
        question,
        options,
        answer,
        tags: tags.map((category) => category.toUpperCase()) as Tag[]
      })))
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

async function createTest() {
  const filePath = path.join(process.cwd(), `/prisma/data/questions.json`)
  const fileContents = fs.readFileSync(filePath, "utf8");
  const questions = JSON.parse(fileContents) as Question[]

  console.log({ questions })

  const test = await prisma.test.create({
    data: {
      // id: "1ecbb214-6fb8-4937-975b-13213e3c3c11",
      questions: {
        createMany: {
          data: questions.slice(0, 10).map(({ question, options, answer, tags }, index) => ({
            id: index + 71,
            question,
            options,
            answer,
            tags: tags.map((tag) => tag.toUpperCase()) as Tag[]
          }))
        }
      }
    }
  })

  console.log({ test })

  return test
}

async function main() {
  // const users = await createUsers()
  // const tests = await createTests()
  // const questions = await createQuestions()
  // const results = await createResults()

  // await createTestUser()
  const test = await createTest()
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