import * as core from '@actions/core'
import * as github from '@actions/github'

export async function run(): Promise<void> {
  try {
    const name = core.getInput('name')
    const payload = JSON.stringify(github.context.payload, undefined, 2)

    if (!name) throw new Error('Required input "name"')

    core.info(`Hello ${name}!`)
    core.info(`The event payload: ${payload}`)
  } catch (error: any) {
    core.setFailed(error.message)
  }
}
