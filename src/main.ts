import * as core from '@actions/core'
import { Repository } from './repository'
import { isMatchSomeFilter } from './filter'
import type { WorkflowRun } from './index.type'
import { getInputs } from './inputs'

export async function run(): Promise<void> {
  try {
    let { token, filters } = getInputs()
    const repository = new Repository(token)

    core.info('Fetching runs in progress ... ⏳')

    let workflowRuns: WorkflowRun[] = await repository.getAllWorkflowRuns()

    workflowRuns = workflowRuns.filter(
      workflowRun => workflowRun.conclusion !== null
    )

    if (filters.length > 0) {
      workflowRuns = workflowRuns.filter(workflowRun =>
        isMatchSomeFilter(workflowRun, filters)
      )
    }

    core.info(`Deleting runs in progress ... ⏳ (${workflowRuns.length} found)`)

    for (let i = 0; i < workflowRuns.length; i++) {
      await repository.deleteWorkflowRunById(workflowRuns[i].id)
    }

    core.info('Deletion completed successfully ✅')
  } catch (error: any) {
    core.setFailed(error.message)
  }
}
