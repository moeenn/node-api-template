import SQL from "@src/Application/Config/Database"

async function migration(): Promise<void> {
  await SQL`
    CREATE TABLE migrations (
      file VARCHAR(255) UNIQUE PRIMARY KEY,
      applied_at TIMESTAMP
    )
  `
}

export default migration