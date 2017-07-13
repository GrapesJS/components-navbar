# GrapesJS Navbar


## Summary

* Plugin
  * Name: `gjs-plugin`
  * Options:
      * `yourOption` Your options


## Download

* `npm i grapesjs-plugin` or `yarn add grapesjs-plugin`



## Usage

```html
<link href="path/to/grapes.min.css" rel="stylesheet"/>
<script src="path/to/grapes.min.js"></script>
<script src="path/to/grapesjs-plugin.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      plugins: ['gjs-plugin'],
      pluginsOpts: {
        'gjs-plugin': {/* ...options */}
      }
  });
</script>
```



## Development

Clone the repository

```sh
$ git clone https://github.com/artf/grapesjs-plugin.git
$ cd grapesjs-plugin
```

Install it

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build before the commit. This will also increase the patch level version of the package

```sh
$ npm run build
```



## License

BSD 3-Clause
