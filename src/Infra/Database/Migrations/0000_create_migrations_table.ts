import SQL from "@src/Infra/Database/Init"

async function migration(): Promise<void> {
  await SQL`
    CREATE TABLE migrations (
      file VARCHAR(255) UNIQUE PRIMARY KEY,
      applied_at TIMESTAMP
    )
  `
}

export default migration