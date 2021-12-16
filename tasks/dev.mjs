import { rm, ln, ex, path } from './setup.mjs'

await rm(path)
await ln('build', path)
await rm('build')
await ex('rollup', ['-c', '-w', '--environment=NODE_ENV:development'])
