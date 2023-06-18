import { RootState } from 'store'

export type Selector = (state: RootState) => void

export type SelectorValue<T extends unknown> = {
  prev: T | undefined,
  current: T,
}

export class StoreListener {

  private selectors: Map<Selector, SelectorValue<unknown>>

  private readonly onChange: CallbackWithArgs

  constructor(selectors: Map<Selector, SelectorValue<unknown>>, onChange: CallbackWithArgs) {
    this.selectors = selectors
    this.onChange = onChange
  }

  async run(state: RootState): Promise<void> {
    let changed = false
    this.selectors.forEach((value, selector) => {
      const newValue = selector(state)
      if (newValue !== value.current) {
        changed = true
        this.selectors.set(selector, {
          prev: value.current,
          current: newValue,
        })
      }
    })
    if (changed) {
      await this.onChange(...this.selectors.values())
    }
  }
}
