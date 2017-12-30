#!usr/bin/env node
const fs = require('fs');
const parseRDF = require('./parse-rdf.js');
const rdf = fs.readFileSync(process.argv[2]);
const book = parseRDF(rdf);
console.log(JSON.stringify(book, null, ' '));