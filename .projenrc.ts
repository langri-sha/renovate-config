import { Project } from '@langri-sha/projen-project'

const project = new Project({
  name: 'renovate-config',
  package: {
    authorEmail: 'filip.dupanovic@gmail.com',
    authorName: 'Filip Dupanović',
    authorOrganization: false,
    bugsUrl: 'https://github.com/langri-sha/renovate-config/issues',
    description: 'Shared Renovate preset for the langri-sha repositories',
    entrypoint: '',
    homepage: 'https://github.com/langri-sha/renovate-config/#readme',
    licensed: false,
    minNodeVersion: '20.0.0',
    repository: 'langri-sha/renovate-config',

    type: 'module',
  },
  lintSynthesized: {},
  pnpmWorkspace: {},
})

project.package?.addEngine('pnpm', '>= 11.0.0')
project.package?.addField('packageManager', 'pnpm@12.11.2')
project.package?.addField('private', true)

project.synth()
