import { describe, it, expect } from "vitest"
import { routes } from "@/app/routes"

describe("route definitins", () => {
  it("route method and url duplication test", () => {
    const routeKeys: string[] = routes.map((r) => r.method + " " + r.url)
    const duplicates = findDuplicates(routeKeys)

    expect(duplicates).toStrictEqual([])
  })
})

function findDuplicates(items: string[]): string[] {
  const inputList = new Set()
  const duplicates = new Set<string>()

  for (const item of items) {
    if (inputList.has(item)) {
      duplicates.add(item)
    } else {
      inputList.add(item)
    }
  }

  return Array.from(duplicates)
}
