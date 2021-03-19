/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const dbUtils = require('../db/dbUtils');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      dbUtils.getBooks({}, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      })
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      dbUtils.createBook(title, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      dbUtils.deleteBooks({}, (err, data) => {
        if (err) return res.send(err);
        return res.send("complete delete successful");
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      dbUtils.getBookById(bookid, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) return res.send("missing required field comment");
      dbUtils.addCommentById(bookid, comment, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      dbUtils.deleteBookById(bookid, (err, data) => {
        if (err) return res.send(err);
        return res.send("delete successful");
      });
    });
  
};
