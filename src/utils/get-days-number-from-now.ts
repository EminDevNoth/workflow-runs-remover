export const getDaysNumberFromNow = (date: string) => {
  const now = new Date()
  const to = new Date(date)

  const millisecondsDiff = now.getTime() - to.getTime()
  const aDayInMs = 24 * 60 * 60 * 1000

  return Math.round(millisecondsDiff / aDayInMs)
}
