const { Book } = require('./models');

function createBook(title, done) {
  const newBook = new Book({ "title": title });

  newBook.save((err, data) => {
    if (err) return done(err, null);
    done(null, data);
  });
}

function getBooks(filters, done) {
  Book.find(filters, (err, data) => {
    if (err) return done(err, null);
    done(null, data);
  });
}

function getBookById(id, done) {
  getBooks({_id: id}, (err, data) => {
    if (err) return done(err, null);
    done(null, data[0]);
  });
}

function addCommentById(id, comment, done) {
  Book.findByIdAndUpdate(id, {"$push": {"comments": [comment]}}, (err, data) => {
    if (err) return done(err, null);
    done(null, data);
  });
}

module.exports.createBook = createBook;
module.exports.getBooks = getBooks;
module.exports.getBookById = getBookById;
module.exports.addCommentById = addCommentById;
