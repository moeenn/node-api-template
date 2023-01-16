import { describe, it, expect } from "vitest"
import { ISocket } from "@/vendor/entities/sockets"
import { throws } from "@/vendor/testing"
import { echo } from "./echo"

describe("echo message handler", () => {
  /* setup */
  let recMessage = ""
  const mockSocket: ISocket = {
    id: "something",
    send: (data: unknown) => {
      recMessage = (data as { message: string }).message
    },
  }

  it("message echo", async () => {
    const payload = { message: "random message" }
    await echo(mockSocket, payload)

    expect(recMessage).toBe(payload.message)

    /* cleanup */
    recMessage = ""
  })

  it("invalid payload data", async () => {
    const payload = { invalid: "some data" }

    const isError = await throws(
      async () => await echo(mockSocket, payload),
      "invalid",
    )

    expect(isError).toBe(true)

    /* cleanup */
    recMessage = ""
  })
})
