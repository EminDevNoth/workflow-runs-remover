import type { InclusionOptions } from '../index.type'

export function inclusionFilter(
  values: string[],
  searchValue: string,
  option: InclusionOptions
) {
  const isExclusion = option === 'exclude'
  const isIncluded = values.includes(searchValue)

  return isExclusion ? !isIncluded : isIncluded
}
