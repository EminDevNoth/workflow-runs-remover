import * as core from '@actions/core'
import * as v from 'valibot'

export const FILTERS_MESSAGES = {
  TYPE: 'Filters should be an array'
}

export const FILTER_MESSAGES = {
  TYPE: 'A Filter should be an object',
  EMPTY: 'At least one criteria should be defined'
}

export const CONCLUSIONS_CRITERIA_MESSAGES = {
  TYPE: 'Conclusions should be an array'
}

export const BRANCHES_CRITERIA_MESSAGES = {
  TYPE: 'Branches should be an array'
}

export const AGE_CRITERIA_MESSAGES = {
  TYPE: 'Age should be a string or a number'
}

export const FILTER_OPTIONS_MESSAGES = {
  TYPE: 'Filter options should be an object'
}

const schema = v.array(
  v.pipe(
    v.custom(
      (input: any) => input?.constructor === Object,
      FILTER_MESSAGES.TYPE
    ),
    v.partial(
      v.object(
        {
          conclusions: v.array(v.string(), CONCLUSIONS_CRITERIA_MESSAGES.TYPE),
          branches: v.array(v.string(), BRANCHES_CRITERIA_MESSAGES.TYPE),
          age: v.union([v.string(), v.number()], AGE_CRITERIA_MESSAGES.TYPE),
          options: v.pipe(
            v.custom(
              (input: any) => input?.constructor === Object,
              FILTER_OPTIONS_MESSAGES.TYPE
            ),
            v.partial(
              v.object(
                {
                  conclusions: v.picklist(['include', 'exclude']),
                  branches: v.picklist(['include', 'exclude']),
                  age: v.picklist(['<', '<=', '=', '>', '>='])
                },
                FILTER_OPTIONS_MESSAGES.TYPE
              )
            )
          )
        },
        FILTER_MESSAGES.TYPE
      )
    )
  ),
  FILTERS_MESSAGES.TYPE
)

export function getFiltersInput() {
  try {
    let filters = core.getInput('filters')

    if (filters === '') return { value: [] }

    filters = JSON.parse(filters)

    const result = v.safeParse(schema, filters, { abortEarly: true })

    return result.success
      ? {
          value: result.output
        }
      : {
          errors: v.flatten(result.issues)
        }
  } catch (e: any) {
    return {
      errors: e.message
    }
  }
}
