# WP Starter

A WordPress theme starter powered by [Timber](https://upstatement.com/timber/), [Tailwind](https://tailwindcss.com/), [esbuild](https://esbuild.github.io/), and [rollup.js](https://rollupjs.org/guide/en/).

## Development

### Requirements

You'll need to install the following on your machine before getting started

- [Local by Flywheel](https://localwp.com/)
- [Node](https://nodejs.org/en/) (v16.3.0)
- [pnpm](https://pnpm.io/)

### Getting Started

First, create a fresh WP instance with Flywheel.

Next, clone this repo. Create a `.env` file with the following variables based on the WP instance you just created. Make sure `WP_PATH` is an **absolute path** to the root of the WordPress install.

```
WP_SERVER=wpstarter.local
WP_PATH=/Users/mikewagz/Local Sites/wpstarter/app/public
WP_THEME=wp-starter-theme
```

From the project root, install project dependencies using pnpm:

```
pnpm i
```

Now you can run the development server at http://localhost:3000

```
pnpm dev
```

Or build for production

```
pnpm build
```
