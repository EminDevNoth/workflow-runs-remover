import { ageMatcher } from './matchers/age-matcher'
import { branchesMatcher } from './matchers/branches-matcher'
import { conclusionsMatcher } from './matchers/conclusions-matcher'
import type { Filter } from './index.type'
import type { WorkflowRun } from '../index.type'

const MATCHERS = [conclusionsMatcher, branchesMatcher, ageMatcher]

const isMatchFilter =
  (workflowRun: WorkflowRun) =>
  (filter: Filter): boolean => {
    const results = MATCHERS.map(matcher =>
      matcher(filter)?.(workflowRun)
    ).filter(matcher => matcher !== undefined)

    return results.length !== 0 && results.every(result => result)
  }

export const isMatchSomeFilter = (
  workflowRun: WorkflowRun,
  filters: Filter[]
) => {
  return filters.some(isMatchFilter(workflowRun))
}
