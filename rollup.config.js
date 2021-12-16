import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import glslify from 'rollup-plugin-glslify'
import esbuild from 'rollup-plugin-esbuild'
import styles from 'rollup-plugin-styles'
import manifest from 'rollup-plugin-output-manifest'
import copy from 'rollup-plugin-copy-watch'
import browsersync from 'rollup-plugin-browsersync'

const prod = process.env.NODE_ENV === 'production'
const proxy = process.env.WP_SERVER

export default {
  input: 'src/scripts/main.js',
  output: {
    dir: 'build',
    entryFileNames: prod ? '[name].[hash].js' : '[name].js',
    chunkFileNames: prod ? '[name].[hash].js' : '[name].js',
    assetFileNames: prod ? '[name].[hash].[ext]' : '[name].[ext]',
    format: 'iife',
    sourcemap: !prod,
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    resolve(),
    commonjs(),
    glslify(),
    esbuild({
      minify: prod,
      jsxFactory: 'h',
    }),
    styles({ mode: 'extract', url: false }),
    manifest({
      keyValueDecorator: (k, v) => ({
        [k.split('.').length === 1 ? [k, v.split('.').pop()].join('.') : k]: v,
      }),
    }),
    copy({
      watch: !prod && ['src/public', 'src/templates', 'src/*.php'],
      targets: [
        { src: 'src/public/*', dest: 'build' },
        { src: 'src/templates', dest: 'build' },
        { src: 'src/*.php', dest: 'build' },
      ],
    }),
    !prod &&
      browsersync({
        files: 'build',
        proxy,
        notify: false,
        ghostMode: false,
        open: true,
      }),
  ],
}
