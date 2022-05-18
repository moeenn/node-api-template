export default abstract class Repository<T> {
  private table: string
  private conn: Function

  constructor(conn: Function, table_name: string) {
    this.conn = conn
    this.table = table_name
  }

  All(): Array<T> {
    const all = this.conn`
      SELECT * FROM ${this.table};
    `

    return [...all].map((entry: unknown): T => {
      return new T(entry)
    })
  }

  Find(id: string): T {
    const result = this.conn`
      SELECT * FROM ${this.table}
      WHERE id = ${id}
      LIMIT 1;
    `

    return new T(result)
  }

  Remove(id: string): void {
    this.conn`
      DELETE FROM ${this.table}
      WHERE id = ${id};
    `    
  }
} 