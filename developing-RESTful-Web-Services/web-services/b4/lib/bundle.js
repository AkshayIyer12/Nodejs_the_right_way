'use strict';
const rp = require('request-promise');
module.exports = (app, es) => {
  const url = `http://${es.host}:${es.port}/${es.bundles_index}/bundle`;
  app.post('/api/bundle', (req, res) => {
    const bundle = {
      name: req.query.name || '',
      books: []
    };
    rp.post({url, body: bundle, json: true})
    .then(esResBody => res.status(201).json(esResBody))
    .catch(({error}) => res.status(error.status(error.status || 502).json(error)));
  });
};