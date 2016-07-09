'use strict';

const ErrorHandler = require('../../common/utils/errors.js');

describe.only('ErrorHandler', () => {
  describe('#create()', () => {
    it('should create an error object', (done) => {
      let error = ErrorHandler.create('BOOK_SAVE');

      error.should.be.an('error');
      error.name.should.equal('BOOK_SAVE');
      error.code.should.equal('B001');
      error.message.should.equal('Failed to save a book');

      done();
    });
  });
});
