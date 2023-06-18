import { Store, Unsubscribe } from 'redux'
import { StoreListener, Selector, SelectorValue } from 'utils/store-observer/StoreListener'

export class StoreObserver {

  private readonly store: Store

  private readonly unsub: Unsubscribe

  private listeners: StoreListener[]

  private running: Promise<unknown>

  constructor(store: Store) {
    this.store = store
    this.listeners = []
    this.running = Promise.resolve()

    this.unsub = this.store.subscribe(async () => {
      const state = { ...this.store.getState() }
      await this.running

      this.running = Promise.all(this.listeners.map(listener => listener.run(state)))
    })
  }

  getStore() {
    return this.store
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listen(selectors: Selector[], onChange: (...args: Array<SelectorValue<any>>) => void, immediate = false): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectorsMap = new Map<Selector, SelectorValue<any>>()
    selectors.forEach((selector) => {
      selectorsMap.set(selector, {
        prev: undefined,
        current: !immediate ? selector(this.store.getState()) : undefined,
      })
    })
    const listener = new StoreListener(
      selectorsMap,
      onChange,
    )
    this.listeners.push(listener)
    if (immediate) {
      listener.run(this.store.getState())
    }
  }

  destroy(): void {
    this.unsub()
  }
}
