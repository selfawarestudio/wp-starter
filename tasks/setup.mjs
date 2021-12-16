import dotenv from 'dotenv'
import { join } from 'path'
import { promisify } from 'util'
import rimraf from 'rimraf'
import { execa } from 'execa'
import symlinkDir from 'symlink-dir'

dotenv.config()

export let rm = promisify(rimraf)

export let ln = symlinkDir

export let ex = (f, a) => execa(f, a, { preferLocal: true, stdio: 'inherit' })

export let path = join(
  process.env.WP_PATH,
  'wp-content',
  'themes',
  process.env.WP_THEME,
)
