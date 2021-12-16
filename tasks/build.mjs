import { rm, ex, path } from './setup.mjs'

await rm('build')
await ex('rollup', ['-c', '--environment=NODE_ENV:production'])
await rm(path)
await ex('ncp', ['build/.', path])
