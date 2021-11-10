# WP Starter

A WordPress theme starter powered by [Timber](https://upstatement.com/timber/), [Tailwind](https://tailwindcss.com/), [esbuild](https://esbuild.github.io/), and [rollup.js](https://rollupjs.org/guide/en/).

## Development

### Requirements

You'll need to install the following on your machine before getting started

- [Local by Flywheel](https://localwp.com/)
- [Node](https://nodejs.org/en/) (v16.3.0)

### Getting Started

First, create a fresh WP instance with Flywheel. Update the `proxy` variable in [rollup config file](rollup.config.js) to match your local site domain.

Next, clone this repo. From the project root, install project dependencies using NPM:

```
npm i
```

Run the build command to generate the `build` directory, aka the bundled theme.

```
npm run build
```

Next, create a symlink from the `build` directory within the repo to the themes directory within your local WP instance (Your paths are probably different than the example below).

```
ln -s ~/Desktop/wp-starter/build ~/Local\ Sites/wpstarter/app/public/wp-content/themes/wp-starter-theme
```

Now you can run the development server at http://localhost:3000

```
npm run dev
```
