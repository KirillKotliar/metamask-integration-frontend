type Nullable<T> = (T | null)
type Nullish<T> = (T | null | undefined)
type CallbackWithArgs = (...args: any[]) => void
type CallbackWithoutArgs = () => void
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}
type PromiseValue<T> = T extends PromiseLike<infer U> ? U : T
type ArrayValue<T extends unknown[]> = T extends Array<infer U> ? U : never
