import { inclusionFilter } from '../filters/inclusion-filter'
import type { Filter } from '../index.type'
import { DEFAULT_OPTIONS } from '../index.const'
import type { WorkflowRun } from '../../index.type'

export function conclusionsMatcher({
  conclusions,
  options = { conclusions: DEFAULT_OPTIONS.conclusions }
}: Filter) {
  if (conclusions === undefined) return

  return ({ conclusion }: WorkflowRun) => {
    if (conclusion === null) return false

    return inclusionFilter(conclusions, conclusion, options.conclusions!)
  }
}
