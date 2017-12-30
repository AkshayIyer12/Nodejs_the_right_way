'use strict';
const cheerio = require('cheerio');
module.exports = rdf => {
  const $ = cheerio.load(rdf);
  // const book = {};
  // book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '');
  // book.title = $('dcterms\\:title').text();
  // book.authors = $('pgterms\\:agent pgterms\\:name')
  //   .toArray().map(elem => $(elem).text());
  // book.subjects = $('[rdf\\:resource$="/LCSH"]')
  // .parent().find('rdf\\:value')
  //                 .toArray().map(elem => {
  //                   console.log('YOOOOOOO ', $(elem).text())
  //                   return $(elem).text()
  //                 });

  // book.subjects = $('[rdf\\:resource$="/LCC"]')
  //                 .parent().find('rdf\\:value')
  //                 .toArray().map(elem => {
  //                   return $(elem).text()
  //                 })[0];

  let arr = $('pgterms\\:file').toArray().map(elem => {
    return elem.attribs['rdf:about']
  })

  let books = arr.reduce((a, v) => {
    let val = v.split('/')
    let attr = val[val.length - 1].split('.').map((elem, i) => {
      if (i === 0) return elem
      elem = elem.split('')
      elem[0] = elem[0].toUpperCase()
      elem = elem.join('')
      return elem
    }).join('')
    a[attr] = v
    return a
  }, {})
  return books;
};
