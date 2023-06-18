class Store {
  private store: Storage

  private readonly prefix = '@website-prefix'

  constructor() {
    this.store = localStorage
  }

  getItem<T>(key: string): T | null {
    const str = this.store.getItem(`${this.prefix}:${key}`)
    if (!str) {
      return null
    }

    return JSON.parse(str) as T
  }

  setItem(key: string, value: unknown): void {
    this.store.setItem(`${this.prefix}:${key}`, JSON.stringify(value))
  }

  removeItem(key: string): void {
    this.store.removeItem(`${this.prefix}:${key}`)
  }

  hasItem(key: string): boolean {
    return this.getItem(key) !== null
  }

  clear(): void {
    this.store.clear()
  }
}

export const storage = new Store()
