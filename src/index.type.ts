import { getOctokit } from '@actions/github'

export type Octokit = ReturnType<typeof getOctokit>

export type WorkflowRun = Awaited<
  ReturnType<Octokit['rest']['actions']['listWorkflowRunsForRepo']>
>['data']['workflow_runs'][number]
