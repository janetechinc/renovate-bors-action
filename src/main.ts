import * as core from "@actions/core";
import * as github from "@actions/github";

const MANUAL_MERGE_MESSAGE = "merge this manually";

async function run() {
  try {
    const token = core.getInput("github-token", { required: true });

    const { pull_request: pr } = github.context.payload;
    if (!pr) {
      throw new Error("Event payload missing `pull_request`");
    }

    if (pr.pull_request.body.includes(MANUAL_MERGE_MESSAGE)) {
      core.debug(`Not approving manual merge pull request #${pr.number}`)
      return
    }

    const client = new github.GitHub(token);
    core.debug(`Creating approving review for pull request #${pr.number}`);
    await client.pulls.createReview({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: pr.number,
      event: "APPROVE",
      body: "bors r+"
    });
    core.debug(`Approved pull request #${pr.number}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
