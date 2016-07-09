'use strict';

// const logger = require('winston');

module.exports = function(Book) {

  Book.saveBook = (book, next) => {
    Book.create(book, (err) => {
      next(err, 'ok');
    });
  };

  Book.updateBook = (book, next) => {
    Book.updateAll({bid: book.bid}, book, (err) => {
      next(err, 'ok');
    });
  };

  Book.getOne = (bid, next) => {
    Book.findOne({where: {bid: bid}}, (err, book) => {
      next(err, book);
    });
  };

  Book.getAll = (next) => {
    Book.find((err, books) => {
      next(err, books);
    });
  };

  Book.removeBook = (bid, next) => {
    Book.destroyAll({bid: bid}, (err) => {
      next(err, 'ok');
    });
  };
}
