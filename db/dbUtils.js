const { Book } = require("./models");

const DEFAULT_ERROR = 'an error has occurred';
const NO_BOOK_ERROR = 'no book exists';
const MISSING_ID_ERROR = 'missing field _id';
const MISSING_TITLE_ERROR = 'missing required field title';

function createBook(title, done) {
  const newBook = new Book({ title: title, comments: [], commentcount: 0 });

  if (!title) return done(MISSING_TITLE_ERROR, null);

  newBook.save((err, data) => {
    if (err) return done(DEFAULT_ERROR, null);
    done(null, data);
  });
}

function getBooks(filters, done) {
  Book.find(filters, (err, data) => {
    if (err) return done(DEFAULT_ERROR, null);
    done(null, data);
  });
}

function getBookById(id, done) {
  if (!id) return done(MISSING_ID_ERROR, null);

  getBooks({ _id: id }, (err, data) => {
    if (!data) return done(NO_BOOK_ERROR, null);
    if (err) return done(DEFAULT_ERROR, null);
    done(null, data[0]);
  });
}

function addCommentById(id, comment, done) {
  if (!id) return done(MISSING_ID_ERROR, null);

  Book.findByIdAndUpdate(
    id,
    { $push: { comments: [comment] }, $inc: { commentcount: 1 } },
    {new: true},
    (err, data) => {
      if (!data) return done(NO_BOOK_ERROR, null);
      if (err) return done(DEFAULT_ERROR, null);
      return done(null, data);
    }
  );
}

function deleteBookById(id, done) {
  if (!id) return done(MISSING_ID_ERROR, null);

  Book.findByIdAndDelete(id, {"useFindAndModify": false}, (err, data) => {
    if (!data) return done(NO_BOOK_ERROR, null);
    if (err) return done(DEFAULT_ERROR, null);
    done(null, data);
  });
}

function deleteBooks(filters, done) {
  Book.deleteMany(filters, (err, data) => {
    if (!data) return done(NO_BOOK_ERROR, null);
    if (err) return done(DEFAULT_ERROR, null);
    done(null, data);
  });
}

module.exports.createBook = createBook;
module.exports.getBooks = getBooks;
module.exports.getBookById = getBookById;
module.exports.addCommentById = addCommentById;
module.exports.deleteBookById = deleteBookById;
module.exports.deleteBooks = deleteBooks;
