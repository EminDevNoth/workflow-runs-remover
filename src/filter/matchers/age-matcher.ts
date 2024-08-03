import type { ComparaisonOptions, Filter } from '../index.type'
import { DEFAULT_OPTIONS } from '../index.const'
import { getDaysNumberFromNow } from '../../utils/get-days-number-from-now'
import type { WorkflowRun } from '../../index.type'

export function ageMatcher({
  age,
  options = { age: DEFAULT_OPTIONS.age }
}: Filter) {
  if (age === undefined) return

  return ({ created_at }: WorkflowRun) => {
    const workflowRunAge = getDaysNumberFromNow(created_at)
    const ageValue = typeof age === 'string' ? parseInt(age) : age
    const ageOperator = options.age

    const operators: Record<
      ComparaisonOptions,
      (a: number, b: number) => boolean
    > = {
      '>=': (a: number, b: number) => a >= b,
      '<=': (a: number, b: number) => a <= b,
      '>': (a: number, b: number) => a > b,
      '<': (a: number, b: number) => a < b,
      '=': (a: number, b: number) => a === b
    }

    return operators[ageOperator!](workflowRunAge, ageValue)
  }
}
