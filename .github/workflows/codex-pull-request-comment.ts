import type * as Core from '@actions/core';
import { type context, type getOctokit } from '@actions/github';

type Context = typeof context;

interface Options {
  readonly context: Context;
  readonly core: typeof Core;
  readonly github: ReturnType<typeof getOctokit>;
  readonly pullNumber: number;
}

export default async function getRef({
  context: {
    repo: { owner, repo },
  },
  core,
  github,
  pullNumber,
}: Options): Promise<string> {
  const {
    data: {
      base: { sha: baseSha },
      head: {
        ref,
        repo: { full_name: fullName },
        sha: headSha,
      },
      title,
    },
  } = await github.rest.pulls.get({
    owner,
    pull_number: pullNumber,
    repo,
  });

  if (fullName !== `${owner}/${repo}`) {
    throw new Error('The Codex action does not support forks.', {
      cause: fullName,
    });
  }

  core.setOutput('baseSha', baseSha);
  core.setOutput('headSha', headSha);
  core.setOutput('ref', ref);
  core.setOutput('title', title);
  return ref;
}
