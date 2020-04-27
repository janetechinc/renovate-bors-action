# Auto Bors and Approve Renovate PRs

**Name:** `janetechinc/renovate-bors-action`

Automatically bors and approve GitHub pull requests from renovate. The `GITHUB_TOKEN` secret must be provided as the `github-token` input for the action to work.

## Usage instructions

Create a workflow file (e.g. `.github/workflows/renovate-bors.yml`) that contains a step that `uses: janetechinc/renovate-bors-action@v3.0.0`. Here's an example workflow file:

```yaml
name: Renovate Bors
on: pull_request

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: janetechinc/renovate-bors-action
      if: github.actor == 'renovate[bot]'
      with:
        github-token: "${{ secrets.GITHUB_TOKEN }}"
```
