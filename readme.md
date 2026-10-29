# renovate-config

The shared Renovate preset for the langri-sha repositories. It holds the rules
that treat our own packages alike everywhere, and leaves each repository's
baseline configuration and exceptions to the repository.

[`default.json`](default.json) does three things:

- Groups updates to `@langri-sha/**` packages under **langri-sha projen
  toolchain**, so they arrive as one pull request.
- Skips Renovate's release-age wait for `@langri-sha/**` packages and for
  anything matching `langri-sha/**`, such as our GitHub Actions and Terraform
  modules.
- Tracks versions pinned in a Dockerfile `ARG` that follows a
  `# renovate: datasource=… depName=…` comment, through Renovate's
  `customManagers:dockerfileVersions` preset.

It does not enable automerge, and it does not extend `config:recommended`.

## Usage

Extend it next to the baseline in the repository's Renovate configuration:

```json
{
  "extends": ["config:recommended", "github>langri-sha/renovate-config"]
}
```

In a projen-managed repository `renovate.json5` is generated, so the line goes
in `.projenrc.ts` instead. `@langri-sha/projen-project` already supplies
`config:recommended`:

```ts
renovate: {
  extends: ['github>langri-sha/renovate-config'],
},
```

The reference is not pinned. Renovate loads `default.json` from this
repository's default branch, so a change reaches every repository that extends
it on its next Renovate run, subject to caching and to the repository's own
rules. There is no release to publish and nothing to bump.

The preset only reaches Renovate. pnpm applies its own `minimumReleaseAge` when
installing, so a repository that uses it also lists `@langri-sha/*` in
`minimumReleaseAgeExclude` in `pnpm-workspace.yaml`.

## Contributing

Keep policy that every repository shares here, and behaviour specific to one
repository in that repository. Say which dependencies a change touches in the
pull request.

CI validates the preset with:

```sh
pnpm exec renovate-config-validator --strict default.json
```

That check, `Renovate preset`, is not a required status check yet. For a policy
change, also run a Renovate dry run against a repository that extends the
preset.
