# IFPRI Yemen Data Entry

Data Entry form for IFPRI backend.  Authentication handled with Auth0.

## Development environment
To set up the development environment for this website, you'll need to install the following on your system:

- Node (v6.x.x), Npm ([nvm](https://github.com/creationix/nvm) usage is advised), and [Yarn](https://yarnpkg.com/)

> The versions mentioned are the ones used during development. It could work with newer ones.

After these basic requirements are met, run the following commands in the website's folder:
```
$ yarn install
```

### Getting started

```
$ npm run serve
```
or
```
$ gulp serve
```
Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:3000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.

### Other commands
Compile the sass files, javascript... Use this instead of ```gulp serve``` if you don't want to watch.
```
$ npm run build
```
or
```
$ gulp
```
