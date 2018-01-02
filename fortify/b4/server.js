'use strict';
const pkg = require('./package.json');
const {URL} = require('url');
const path = require('path');

const nconf = require('nconf');
nconf
  .argv()
  .env('__')
  .defaults({'NODE_ENV': 'development'});

const NODE_ENV = nconf.get('NODE_ENV');
const isDev = NODE_ENV === 'development';
nconf
  .defaults({'conf': path.join(__dirname, `${NODE_ENV}.config.json`)})
  .file(nconf.get('conf'));

const serviceUrl = new URL(nconf.get('serviceUrl'));
const servicePort =
    serviceUrl.port || (serviceUrl.protocol === 'https:' ? 443 : 80);

const express = require('express');
const morgan = require('morgan');

const app = express();
const expressSession = require('express-session');
if (isDev) {
  const FileStore = require('session-file-store')(expressSession);
  app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: 'unguessable',
    store: new FileStore()
  }));
} else {
  // Use Redis in production mode
}

app.use(morgan('dev'));

app.get('/api/version', (req, res) => res.status(200).json(pkg.version));

if (isDev) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: '/',
    stats: {colors: true}
  }));
} else {
  app.use(express.static('dist'));
}

app.listen(servicePort, () => console.log('Ready.'));
