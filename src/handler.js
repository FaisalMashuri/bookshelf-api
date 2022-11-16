// const books = require("./book");
import {books} from "./book.js"
import {nanoid} from 'nanoid'

export const addBook = (req, h) => {
  try {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    if (!name) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);
      return response;
    }

    const id = nanoid(16);
    const finished = pageCount == readPage ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    books.push(newBook);
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
  }
};

export const getAllBooks = (req, h) => {
  try {
    const { name, reading, finished } = req.query;

    if (books.length > 0) {
      let booksWithFilter = books;

      if (name) {
        booksWithFilter = booksWithFilter.filter((book) =>
          book.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      if (reading) {
        booksWithFilter = booksWithFilter.filter(
          (book) => book.reading == Number(reading)
        );
      }

      if (finished) {
        booksWithFilter = booksWithFilter.filter(
          (book) => book.finished == Number(finished)
        );
      }

      const response = h.response({
        status: "success",
        data: {
          books: booksWithFilter.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        status: "success",
        data: {
          books: [],
        },
      });
      response.code(404);
      return response;
    }
  } catch (error) {
    const response = h.response({
      status: "Error",
      message: "Internal server error",
    });
    response.code(500);
    return response;
  }
};

export const getDetailBook = (req, h) => {
  try {
    const { id } = req.params;
    console.log(books);
    const book = books.filter((book) => book.id === id)[0];

    if (book) {
      const response = h.response({
        status: "success",
        data: {
          book,
        },
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Internal server error",
    });
    response.code(500);
    return response;
  }
};

export const editBook = (req, h) => {
  try {
    const { id } = req.params;

    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      if (!name) {
        const response = h.response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
      }

      if (readPage > pageCount) {
        const response = h.response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
      }

      const finished = pageCount == readPage ? true : false;
      const updatedAt = new Date().toISOString();
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updatedAt,
      };
      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });

    response.code(404);
    return response;
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Internal server error",
    });

    response.code(500);
    return response;
  }
};

export const deleteBook = (req, h) => {
  try {
    const { id } = req.params;

    const index = books.findIndex((book) => book.id === id);
    if (index > -1) {
      books.splice(index, 1);
      const response = h.response({
        status: "success",
        message: "Buku berhasil dihapus",
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  } catch (error) {
    const response = h.response({
        status: "error",
        message: "Internal server error",
      });
      response.code(500);
      return response;
  }
};

// module.exports = {
//     addBook,
//     getAllBooks,
//     getDetailBook,
//     editBook,
//     deleteBook
// }

