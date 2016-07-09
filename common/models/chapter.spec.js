'use strict';

const should = require('chai').should(); // eslint-disable-line no-unused-vars
const app = require('../../server/server.js');
//const logger = require('winston');

describe('Chapter', () => {

  let chapter1 = {
    bid: '123ABC456',
    cid: 1,
    title: 'Test Chapter',
    content: 'This is a long paragraph',
    status: true
  };

  let chapter2 = {
    bid: '123ABC456',
    cid: 1,
    title: 'Test Chapter 2',
    content: 'This is a long paragraph 2',
    status: false
  };

  let status, chapters;

  before((done) => {
    app.models.Chapter.saveChapter(chapter1, (err, res) => {
      if(err)
        done(err);

      status = res;
      done();
    });
  });

  describe('#saveChapter()', () => {
    it('should add a chapter to database', (done) => {
      status.should.equal('ok');
      done();
    });
  });

  describe('#getOne()', () => {
    it('should return a chapter', (done) => {
      app.models.Chapter.getOne('123ABC456', 1, (err, res) => {
        should.not.exist(err);

        let chapter = res;

        chapter.bid.should.equal('123ABC456');
        chapter.cid.should.equal(1);
        chapter.title.should.equal('Test Chapter');
        chapter.content.should.equal('This is a long paragraph');
        chapter.status.should.equal(true);

        done();
      });
    });
  });

  describe('#getTocByBid()', () => {
    before((done) => {
      app.models.Chapter.getTocByBid('123ABC456', (err, res) => {
        should.not.exist(err);

        chapters = res;
        done();
      });
    });

    it('should get all chapters', (done) => {
      chapters.length.should.be.above(0);
      done();
    });

    it('should get chapters with title only', (done) => {
      let chapter = chapters[0];

      chapter.cid.should.equal(1);
      chapter.title.should.equal('Test Chapter');
      should.not.exist(chapter.content);

      done();
    });
  });

  describe('#updateChapter()', () => {

    it('should update a chapter in database', (done) => {
      app.models.Chapter.updateChapter(chapter2, (err, res) => {
        should.not.exist(err);
        res.should.equal('ok');
        done();
      });

    });

    after((done) => {
      app.models.Chapter.getOne('123ABC456', 1, (err, res) => {
        should.not.exist(err);

        let chapter = res;

        chapter.title.should.equal('Test Chapter 2');
        chapter.content.should.equal('This is a long paragraph 2');
        chapter.status.should.equal(false);

        done();
      });
    });

  });

  after((done) => {
    app.models.Chapter.removeChapter('123ABC456', (err, res) => {
      should.not.exist(err);
      res.should.equal('ok');
      done();
    });
  });

});
