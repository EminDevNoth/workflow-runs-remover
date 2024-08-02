import { inclusionFilter } from '../filters/inclusion-filter'
import type { Filter } from '../index.type'
import { DEFAULT_OPTIONS } from '../index.const'
import type { WorkflowRun } from '../../index.type'

export function branchesMatcher({
  branches,
  options = { branches: DEFAULT_OPTIONS.branches }
}: Filter) {
  if (branches === undefined) return

  return ({ head_branch }: WorkflowRun) => {
    if (head_branch === null) return false

    return inclusionFilter(branches, head_branch, options.branches!)
  }
}
