import { describe, it, expect } from "vitest"
import { StorageService } from "./StorageService"

describe("StorageService", () => {
  it("extractMimeType valid", () => {
    const testCases = [
      {
        input: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
        output: "image/jpeg",
      },
      {
        input: "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
        output: "image/png",
      },
      {
        input: "data:document/pdf;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
        output: "document/pdf",
      },
    ]

    for (const testCase of testCases) {
      const got = StorageService.extractMimeType(testCase.input)
      expect(got).toBe(testCase.output)
    }
  })

  it("extractMimeType invalid", () => {
    const input = "some-random-encoding"
    expect(() => StorageService.extractMimeType(input)).toThrowError("invalid")
  })

  it("encodingToBuffer", () => {
    const got = StorageService.encodingToBuffer(
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD",
    )
    expect(got).toBeTruthy()

    expect(() =>
      StorageService.encodingToBuffer("invalid encoding"),
    ).toThrowError("invalid")
  })
})
