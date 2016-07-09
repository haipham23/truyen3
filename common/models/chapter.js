'use strict';

const ErrorHandler = require('../utils/errors.js');

module.exports = function(Chapter) {

  Chapter.saveChapter = (chapter, next) => {
    Chapter.create(chapter, (err) => {
      if(err)
        next(ErrorHandler.create('CHAPTER_SAVE'));

      next(null, 'ok');
    });
  };

  Chapter.updateChapter = (chapter, next) => {
    Chapter.updateAll({cid: chapter.cid, bid: chapter.bid}, chapter, (err, m) => {
      // m.count
      if(err || m.count === 0) {
        next(ErrorHandler.create('CHAPTER_UPDATE'));
      }

      next(null, 'ok');
    });
  };

  Chapter.getOne = (bid, cid, next) => {
    Chapter.findOne({where: {bid: bid, cid: cid}}, (err, chapter) => {
      if(err)
        next(ErrorHandler.create('CHAPTER_GETONE'));

      next(null, chapter);
    });
  };

  Chapter.getTocByBid = (bid, next) => {
    Chapter.find({where: {bid: bid}, fields: ['bid', 'title', 'cid']}, (err, toc) => {
      if(err)
        next(ErrorHandler.create('CHAPTER_TOC'));

      next(null, toc);
    });
  };

  Chapter.removeChapter = (bid, next) => {
    Chapter.destroyAll({bid: bid}, (err) => {
      if(err)
        next(ErrorHandler.create('CHAPTER_REMOVE'));

      next(null, 'ok');
    });
  };
}
