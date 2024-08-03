import { getOctokit, context } from '@actions/github'

export class Repository {
  octokit: ReturnType<typeof getOctokit>

  constructor(...rest: Parameters<typeof getOctokit>) {
    this.octokit = getOctokit(...rest)
  }

  async getAllWorkflowRuns() {
    return this.octokit.paginate(
      this.octokit.rest.actions.listWorkflowRunsForRepo,
      context.repo
    )
  }

  async deleteWorkflowRunById(id: number) {
    return this.octokit.rest.actions.deleteWorkflowRun({
      ...context.repo,
      run_id: id
    })
  }
}
