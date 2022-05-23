async function Bootstrap(): Promise<void> {
  await import("./Config/Env")
  await import("./Config/Database")
}

export default {
  Bootstrap,
}