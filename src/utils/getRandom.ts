export const getRandom = () => {
  return '_' + Math.random().toString(36).slice(2, 9)
}
