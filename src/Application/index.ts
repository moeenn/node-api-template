async function Bootstrap(): Promise<void> {
  await import("./Config/Env")
}

export default {
  Bootstrap,
}
