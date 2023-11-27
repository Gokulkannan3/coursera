const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory data structure
const books = [
    { title: 'Book 1', author: 'Author 1', isbn: '1234567890', reviews: [] },
    { title: 'Book 2', author: 'Author 2', isbn: '0987654321', reviews: [] },
    { title: 'Book 3', author: 'Author 1', isbn: '9876543210', reviews: [] },
    { title: 'Book 4', author: 'Author 3', isbn: '1357924680', reviews: [] },
  ];
  
  const users = [
    { username: 'User1', password: 'password123' },
    { username: 'User2', password: 'password456' },
  ];
  
// Task 1: Get the book list available in the shop
app.get('/books', (req, res) => {
  res.json(books);
});

// Task 2: Get the books based on ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  res.json(book);
});

// Task 3: Get all books by Author
app.get('/books/author/:author', (req, res) => {
  const booksByAuthor = books.filter((b) => b.author === req.params.author);
  res.json(booksByAuthor);
});

// Task 4: Get all books based on Title
app.get('/books/title/:title', (req, res) => {
  const booksByTitle = books.filter((b) => b.title === req.params.title);
  res.json(booksByTitle);
});

// Task 5: Get book Review
app.get('/books/review/:isbn', (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  res.json(book ? book.reviews : []);
});

// Task 6: Register New User
app.post('/users/register', (req, res) => {
  // Implement user registration logic here
  res.json({ message: 'Registration successful!' });
});

// Task 7: Login as a Registered User
app.post('/users/login', (req, res) => {
  // Implement user login logic here
  res.json({ message: 'Login successful!' });
});

// Task 8: Add/Modify a book review
app.post('/books/review/:isbn', (req, res) => {
  const { user, comment } = req.body;
  const book = books.find((b) => b.isbn === req.params.isbn);

  if (book) {
    book.reviews.push({ user, comment });
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Task 9: Delete book review added by that particular user
app.delete('/books/review/:isbn/:user', (req, res) => {
  const { isbn, user } = req.params;
  const book = books.find((b) => b.isbn === isbn);

  if (book) {
    book.reviews = book.reviews.filter((review) => review.user !== user);
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Task 10: Get all books - Using async callback function
app.get('/books/async', (req, res) => {
  // Implement async callback function logic here
  res.json(books);
});

// Task 11: Search by ISBN - Using Promises
app.get('/books/promise/isbn/:isbn', (req, res) => {
  const bookPromise = new Promise((resolve, reject) => {
    const book = books.find((b) => b.isbn === req.params.isbn);
    if (book) {
      resolve(book);
    } else {
      reject({ error: 'Book not found' });
    }
  });

  bookPromise.then((result) => res.json(result)).catch((error) => res.status(404).json(error));
});

// Task 12: Search by Author
app.get('/books/author/promise/:author', (req, res) => {
  const authorPromise = new Promise((resolve) => {
    const booksByAuthor = books.filter((b) => b.author === req.params.author);
    resolve(booksByAuthor);
  });

  authorPromise.then((result) => res.json(result));
});

// Task 13: Search by Title
app.get('/books/title/promise/:title', (req, res) => {
  const titlePromise = new Promise((resolve) => {
    const booksByTitle = books.filter((b) => b.title === req.params.title);
    resolve(booksByTitle);
  });

  titlePromise.then((result) => res.json(result));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
