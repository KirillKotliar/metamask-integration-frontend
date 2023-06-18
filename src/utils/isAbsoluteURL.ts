export const isAbsoluteURL = (urlString: string): boolean => {
  return urlString.toLowerCase().indexOf('http://') === 0
    || urlString.toLowerCase().indexOf('https://') === 0
}
