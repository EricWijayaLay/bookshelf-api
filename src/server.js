const Hapi = require('@hapi/hapi');
const { nanoid } = require('nanoid');
const books = require('./books');

const server = Hapi.server({
    port: 9000,
    host: 'localhost'
});

server.route([
  {
    method: 'POST',
    path: '/books',
    handler: (request, h) => {
      const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

      if (!name) {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku'
        }).code(400);
      }

      if (readPage > pageCount) {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);
      }

      const book = {
        id: nanoid(),
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      books.push(book);

      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: book.id
        }
      }).code(201);
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: (request, h) => {
      let result = books;
  
      if (request.query.name) {
        result = result.filter(book => book.name.toLowerCase().includes(request.query.name.toLowerCase()));
      }
  
      if (request.query.reading) {
        result = result.filter(book => book.reading === (request.query.reading === '1'));
      }
  
      if (request.query.finished) {
        result = result.filter(book => book.finished === (request.query.finished === '1'));
      }
  
      result = result.slice(0, 2);
  
      result = result.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }));
  
      return h.response({
        status: 'success',
        data: { books: result }
      }).code(200);
    }
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: (request, h) => {
      const book = books.find(b => b.id === request.params.bookId);
      if (!book) {
        return h.response({
          status: 'fail',
          message: 'Buku tidak ditemukan'
        }).code(404);
      }

      return h.response({
        status: 'success',
        data: { book }
      }).code(200);
    }
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: (request, h) => {
      const book = books.find(b => b.id === request.params.bookId);
      if (!book) {
        return h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }).code(404);
      }

      const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

      if (!name) {
        return h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku'
        }).code(400);
      }

      if (readPage > pageCount) {
        return h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);
      }

      book.name = name;
      book.year = year;
      book.author = author;
      book.summary = summary;
      book.publisher = publisher;
      book.pageCount = pageCount;
      book.readPage = readPage;
      book.reading = reading;
      book.finished = pageCount === readPage;
      book.updatedAt = new Date().toISOString();

      return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      }).code(200);
    }
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: (request, h) => {
      const index = books.findIndex(b => b.id === request.params.bookId);
      if (index === -1) {
        return h.response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan'
        }).code(404);
      }

      books.splice(index, 1);
      return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
      }).code(200);
    }
  }
]);

const init = async () => {
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
