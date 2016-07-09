'use strict';

const should = require('chai').should(); // eslint-disable-line no-unused-vars
const app = require('../../server/server.js');
// const logger = require('winston');

describe('Book', () => {

  let book = {
    bid: '123ABC456',
    title: 'Test Book',
    author: 'Test Author',
    tags: ['tag1', 'tag2', 'tag3'],
    intro: 'This is a long paragraph',
    status: true,
    count: 100
  };

  let book2 = {
    bid: '123ABC456',
    title: 'Test Book 2',
    author: 'Test Author 2',
    tags: ['tag1', 'tag2', 'tag3', 'tag4'],
    intro: 'This is a long paragraph',
    status: true,
    count: 100
  };

  let status, books;

  before((done) => {
    app.models.Book.saveBook(book, (err, res) => {
      if(err)
        done(err);

      status = res;
      done();
    });
  });

  describe('#saveBook()', () => {
    it('should add a book to database', (done) => {
      status.should.equal('ok');
      done();
    });
  });

  describe('#getAll()', () => {
    before((done) => {
      app.models.Book.getAll((err, res) => {
        if(err)
          done(err);

        books = res;
        done();
      });
    });

    it('should get all books in database', (done) => {
      books.length.should.be.above(0);
      done();
    });

    it('should return book with data', (done) => {
      let book = books[0];

      book.bid.should.equal('123ABC456');
      book.title.should.equal('Test Book');
      book.author.should.equal('Test Author');
      book.tags.should.deep.equal(['tag1', 'tag2', 'tag3']);
      book.intro.should.equal('This is a long paragraph');
      book.status.should.equal(true);
      book.count.should.equal(100);

      done();
    });
  });

  describe('#getOne()', () => {
    it('should return a book with bId', (done) => {
      app.models.Book.getOne('123ABC456', (err, res) => {
        should.not.exist(err);

        let book = res;

        book.bid.should.equal('123ABC456');
        book.title.should.equal('Test Book');
        book.author.should.equal('Test Author');
        book.tags.should.deep.equal(['tag1', 'tag2', 'tag3']);
        book.intro.should.equal('This is a long paragraph');
        book.status.should.equal(true);
        book.count.should.equal(100);

        done();
      });
    });
  });

  describe('#updateBook()', () => {

    it('should update a book in database', (done) => {

      app.models.Book.updateBook(book2, (err, res) => {
        if(err)
          done(err);

        res.should.equal('ok');
        done();
      });

    });

    after((done) => {
      app.models.Book.getOne('123ABC456', (err, res) => {
        should.not.exist(err);

        let book = res;

        book.bid.should.equal('123ABC456');
        book.title.should.equal('Test Book 2');
        book.author.should.equal('Test Author 2');
        book.tags.should.deep.equal(['tag1', 'tag2', 'tag3', 'tag4']);

        done();
      });
    });

  });

  after((done) => {
    app.models.Book.removeBook('123ABC456', (err, res) => {
      if(err)
        done(err);

      res.should.equal('ok');
      done();
    });
  });

});
