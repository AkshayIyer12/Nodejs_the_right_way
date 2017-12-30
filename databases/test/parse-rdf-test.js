'use strict';
const fs = require('fs');
const expect = require('chai').expect;
const parseRDF = require('../lib/parse-rdf');

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);
describe(`parseRDF`, () => {
  it(`should be a function`, () => {
    expect(parseRDF).to.be.a('function')
  });

  // it('should parse RDF content', () => {
  //   const book = parseRDF(rdf);
  //   expect(book).to.have.property('subjects')
  //   .that.is.an('string')
  //   .with.lengthOf(1)
  //   .to.not.include('I', 'O', 'W', 'X', 'Y')
  //   .to.be.uppercase;
  // });

  // it('should parse RDF content', () => {
  //   const book = parseRDF(rdf);
  //   expect(book).to.be.an('object');
  //   expect(book).to.have.a.property('id', 132);
  //   expect(book).to.have.a.property('title', 'The Art of War');
  //   expect(book).to.have.a.property('authors')
  //   .that.is.an('array').with.lengthOf(2)
  //   .and.contains('Sunzi, active 6th century B.C.')
  //   .and.contains('Giles, Lionel');
  //   expect(book).to.have.property('subjects')
  //   .that.is.an('array').with.lengthOf(2)
  //   .and.contains('Military art and science -- Early works to 1800')
  //   .and.contains('War -- Early works to 1800');
  // });

  it('should parse RDF content', () => {
    const book = parseRDF(rdf);
    expect(book).to.be.an('object');
    expect(book).to.have.a.property('132EpubImages', 'http://www.gutenberg.org/ebooks/132.epub.images')
    expect(book).to.have.a.property('132TxtUtf-8', 'http://www.gutenberg.org/ebooks/132.txt.utf-8')
    expect(book).to.have.a.property('132KindleNoimages', 'http://www.gutenberg.org/ebooks/132.kindle.noimages')
    expect(book).to.have.a.property('132EpubNoimages', 'http://www.gutenberg.org/ebooks/132.epub.noimages')
    expect(book).to.have.a.property('132KindleImages', 'http://www.gutenberg.org/ebooks/132.kindle.images')
    expect(book).to.have.a.property('132Txt', 'http://www.gutenberg.org/files/132/132.txt')
    expect(book).to.have.a.property('132Rdf', 'http://www.gutenberg.org/ebooks/132.rdf')
    expect(book).to.have.a.property('132Zip', 'http://www.gutenberg.org/files/132/132.zip')
    expect(book).to.have.a.property('132HtmlNoimages', 'http://www.gutenberg.org/ebooks/132.html.noimages')
    expect(book).to.have.a.property('132HtmlImages', 'http://www.gutenberg.org/ebooks/132.html.images')
  });
});