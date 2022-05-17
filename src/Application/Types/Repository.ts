export default class Repository<T> {
  private items: Array<T>

  constructor() {
    this.items = []
  }

  All(): Array<T> {
    return this.items
  }

  Find(callback: (i: T) => Array<T>): Array<T> {
    return this.items.filter(callback)
  }

  Save(item: T): T {
    this.items.push(item)
    return item
  }

  Remove(callback: (i: T) => boolean): void {
    this.items = this.items.filter(item => !callback(item))
  }
} 