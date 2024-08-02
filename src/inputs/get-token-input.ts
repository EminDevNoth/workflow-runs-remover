import * as core from '@actions/core'
import * as v from 'valibot'

export const TOKEN_MESSAGES = {
  TYPE: 'Token should be an array'
}

const schema = v.string(TOKEN_MESSAGES.TYPE)

export function getTokenInput() {
  let token = core.getInput('token')

  const result = v.safeParse(schema, token, { abortEarly: true })

  return result.success
    ? {
        value: result.output
      }
    : {
        errors: v.flatten(result.issues)
      }
}
