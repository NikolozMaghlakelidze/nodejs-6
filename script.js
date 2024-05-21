function updateBook(req, res) {
    let bookId = req.params.bookId;
    bookId = parseInt(bookId);
    let bookIndex = -1;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
            bookIndex = i;
            break;
        }
    }

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Error, Book not found"
        });
    }

    let requestBody = req.body;
    books[bookIndex] = requestBody;

    fs.writeFileSync('books.json', JSON.stringify(books));

    return res.json({
        success: true,
        message: "Book updated successfully"
    });
}

function deleteBook(req, res) {
    let bookId = req.params.bookId;
    bookId = parseInt(bookId);
    let bookIndex = -1;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
            bookIndex = i;
            break;
        }
    }

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Error, Book not found"
        });
    }

    books.splice(bookIndex, 1);

    fs.writeFileSync('books.json', JSON.stringify(books));

    return res.json({
        success: true,
        message: "Book deleted successfully"
    });
}

function createBook(req, res) {
    let usedIds = [];

    for (let book of books) {
        usedIds.push(book.id)
    }

    let maxNumber = Math.max(...usedIds);

    let newId = maxNumber + 1;

    let requestBody = req.body;
    requestBody.id = newId;
    books.push(requestBody);
    fs.writeFileSync('books.json', JSON.stringify(books));

    return res.json({
        success: true,
        message: "New Data added"
    })
}

module.exports = {
    getAllBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteBook
};