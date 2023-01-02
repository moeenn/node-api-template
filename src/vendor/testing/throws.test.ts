import { test, expect } from "vitest"
import { throws } from "./throws"

test("throws shouldn't throw", async () => {
  const callback = () => {
    1 + 2
  }
  const isError = await throws(callback)
  expect(isError).toBe(false)
})

test("throws shouldn't throw async", async () => {
  const callback = async () => {
    1 + 2
  }
  const isError = await throws(callback)
  expect(isError).toBe(false)
})

test("throws should throw", async () => {
  const callback = () => {
    throw new Error("some random error")
  }

  const isError = await throws(callback, "random")
  expect(isError).toBe(true)
})

test("throws should throw async", async () => {
  const callback = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    throw new Error("some random error")
  }

  const isError = await throws(callback)
  expect(isError).toBe(true)
})

test("throws should throw async (invalid error message partial)", async () => {
  const callback = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    throw new Error("some random error")
  }

  const isError = await throws(callback, "example")
  expect(isError).toBe(false)
})
