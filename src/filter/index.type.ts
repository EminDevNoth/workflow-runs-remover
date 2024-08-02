export type InclusionOptions = 'include' | 'exclude'
export type ComparaisonOptions = '>=' | '<=' | '>' | '<' | '='

export enum FilterType {
  CONCLUSIONS = 'conclusions',
  BRANCHES = 'branches',
  AGE = 'age'
}

type FilterBase<T = any, O = any> = {
  value: T
  option: O
}

//----------------------------------------------------------
// CONCLUSIONS FILTER
//----------------------------------------------------------
export type ConclusionsFilter = FilterBase<string[], InclusionOptions>

//----------------------------------------------------------
// BRANCHES FILTER
//----------------------------------------------------------
export type BranchesFilter = FilterBase<string[], InclusionOptions>

//----------------------------------------------------------
// AGE FILTER
//----------------------------------------------------------
export type AgeFilter = FilterBase<string | number, ComparaisonOptions>

//----------------------------------------------------------
// FILTER GROUP
//----------------------------------------------------------
type FilterGroup<F extends { [key: string]: any }> = {
  [key in keyof F]?: F[key]['value']
} & {
  options?: {
    [key in keyof F]?: F[key]['option']
  }
}
export type Filter = FilterGroup<{
  [FilterType.CONCLUSIONS]: ConclusionsFilter
  [FilterType.BRANCHES]: BranchesFilter
  [FilterType.AGE]: AgeFilter
}>
