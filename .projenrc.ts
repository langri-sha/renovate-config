import { Project } from '@langri-sha/projen-project'

const project = new Project({
  name: 'renovate-config',
  package: {
    authorEmail: 'filip.dupanovic@gmail.com',
    authorName: 'Filip Dupanović',
    authorOrganization: false,
    bugsUrl: 'https://github.com/langri-sha/renovate-config/issues',
    copyrightYear: '2026',
    description: 'Shared Renovate preset for the langri-sha repositories',
    entrypoint: '',
    homepage: 'https://github.com/langri-sha/renovate-config/#readme',
    license: 'MIT',
    licensed: true,
    minNodeVersion: '24.22.1',
    repository: 'langri-sha/renovate-config',

    type: 'module',
    devDeps: ['renovate@44.188.1'],
  },
  claude: {
    settings: {
      attribution: { commit: '', pr: '', sessionUrl: false },
    },
  },
  codeowners: {
    '*': '@langri-sha',
  },
  dagger: {},
  editorConfig: {},
  githubTemplates: {},
  husky: {
    'pre-commit': 'pnpm --silent lint-staged',
  },
  lintStaged: {},
  lintSynthesized: {},
  pnpmWorkspace: {
    allowBuilds: {
      'core-js-pure': false,
      'dtrace-provider': false,
      protobufjs: false,
      re2: false,
    },
    minimumReleaseAgeExclude: ['@langri-sha/*', ...Project.presetPackages],
  },
  prettier: {},
  renovate: {
    packageRules: [
      {
        description: 'Update our own packages together',
        groupName: 'langri-sha projen toolchain',
        groupSlug: 'langri-sha-projen',
        matchPackageNames: ['@langri-sha/**'],
      },
      {
        description: 'Install our own packages without waiting them out',
        matchPackageNames: ['@langri-sha/**'],
        minimumReleaseAge: null,
      },
      {
        description:
          'Install our own GitHub Actions and Terraform modules without waiting them out',
        matchPackageNames: ['langri-sha/**'],
        minimumReleaseAge: null,
      },
      {
        description:
          'Skills are pinned to release tags. Leave digest updates to the tag bumps, so a merge to langri-sha/skills opens no pull request',
        matchDepNames: ['langri-sha/skills'],
        matchUpdateTypes: ['digest'],
        enabled: false,
      },
      {
        description:
          'Merge langri-sha/skills release tag bumps once checks pass',
        matchDepNames: ['langri-sha/skills'],
        matchDatasources: ['github-tags'],
        automerge: true,
        automergeType: 'pr',
        automergeStrategy: 'rebase',
      },
    ],
  },
  typeScriptConfig: {},
  worktrunk: {},
  skills: {
    ignore: false,
    skills: [
      {
        source: 'langri-sha/skills',
        ref: 'v1.0.0',
        skills: ['create-commit', 'create-pr'],
      },
    ],
  },
})

project.package?.addEngine('pnpm', '>= 11.0.0')
project.package?.addField('packageManager', 'pnpm@12.16.0')
project.package?.addField('private', true)

project.synth()
