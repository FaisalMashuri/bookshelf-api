import {
  addBook,
  getAllBooks,
  getDetailBook,
  editBook,
  deleteBook,
} from "./handler.js";

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getDetailBook,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBook,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBook,
  },
];

export {routes}