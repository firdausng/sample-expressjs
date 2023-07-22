const express = require('express');
const bookController = require("../controllers/bookController");


function routes(Book){
    const bookRouter = express.Router();
    const controller = bookController(Book);
    bookRouter.route('/')
        .post(controller.post)
        // .get(controller.get);
        .get(controller.get);

    bookRouter.use('/:bookId', async (req, res, next) =>{
        try{
            const book = await Book.findById(req.params.bookId, {})
            if(book === null){
                res.sendStatus(404);
            }
            req.book = book;
            return next();
        }catch (err) {
            res.send(err)
        }
    })
    bookRouter.route('/:bookId')
        .put( (req, res) =>{
            try {
                req.book.title = req.body.title;
                req.book.author = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read;
                req.book.save()
                res.json(req.book)
            }catch (err) {
                res.send(err)
            }
        })
        .patch( (req, res) =>{
            try {
                const {book} = req;
                if(req.body._id){
                    res.status(400);
                    return res.send({
                        error: "cannot update _id"
                    });
                }
                Object.entries(req.body).forEach(item =>{
                    const key = item[0];
                    const value = item[1];
                    book[key] = value;
                })
                req.book.save()
                res.json(req.book)
            }catch (err) {
                res.send(err)
            }
        })
        .delete((req, res)=>{
            try{
                Book.deleteOne(req.book)
                // req.book.remove()
                return res.sendStatus(204);
            }catch (err) {
                res.status(500)
                return res.send(err)
            }
        })
        .get(async (req, res) =>{
            res.json(req.book)
        });

    return bookRouter;
}

module.exports = routes;