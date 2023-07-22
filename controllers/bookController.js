function BookController(Book){
    async function post(req, res){
        try {
            const book = new Book(req.body);
            console.log(book)
            book.save();
            res.json(book)
        }catch (err) {
            res.send(err)
        }
    }

    async function get(req, res){
        try {
            let query = {}
            if(req.query.title){
                query.title = req.query.title
            }
            const books = await Book.find(query, {})
            res.json(books)
        }catch (err) {
            res.send(err)
        }
    }

    return {
        post, get
    }
}

module.exports = BookController;