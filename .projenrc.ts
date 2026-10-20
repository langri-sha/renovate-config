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
    minNodeVersion: '24.16.0',
    repository: 'langri-sha/renovate-config',

    type: 'module',
    devDeps: [
      '@langri-sha/lint-staged@0.9.11',
      '@langri-sha/prettier@0.4.11',
      'renovate@44.166.0',
    ],
  },
  codeowners: {
    '*': '@langri-sha',
  },
  dagger: {},
  editorConfig: {},
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
    ],
  },
  typeScriptConfig: {},
  worktrunk: {},
})

project.package?.addEngine('pnpm', '>= 11.0.0')
project.package?.addField('packageManager', 'pnpm@12.14.0')
project.package?.addField('private', true)

project.synth()
