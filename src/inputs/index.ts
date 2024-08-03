import { getFiltersInput } from './get-filters-input'
import { getTokenInput } from './get-token-input'

export function getInputs() {
  const token = getTokenInput()
  const filters = getFiltersInput()

  if (token.errors !== undefined) {
    throw new Error('Invalid token')
  }

  if (filters.errors !== undefined) {
    throw new Error('Invalid filters')
  }

  return {
    token: token.value,
    filters: filters.value!
  }
}
