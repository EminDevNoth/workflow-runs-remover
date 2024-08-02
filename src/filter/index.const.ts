import type { Filter } from './index.type'

export const DEFAULT_OPTIONS: NonNullable<Required<Filter['options']>> = {
  conclusions: 'include',
  branches: 'include',
  age: '>='
}
