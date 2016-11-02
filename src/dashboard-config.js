const books = [
    {title: 'Book 1', orders: 12},
    {title: 'Book 2', orders: 5},
    {title: 'Book 3', orders: 21},
    {title: 'Book 4', orders: 61},
    {title: 'Book 5', orders: 30},
];

const authors = [
    {author: 'Author 1', books: 11},
    {author: 'Author 2', books: 5},
    {author: 'Author 3', books: 21},
    {author: 'Author 4', books: 7},
    {author: 'Author 5', books: 3},
    {author: 'Author 5', books: 3},
];

const configBooks = {
    name: 'MOST_POPULAR_BOOKS',
    xKey: 'title',
    xAxisLabel: 'Book Name',
    yKey: 'orders',
    yAxisLabel: 'Orders Count',
    data: books
};

const configAuthors = {
    name: 'MOST_POPULAR_AUTHORS',
    xKey: 'author',
    xAxisLabel: 'Author',
    yKey: 'books',
    yAxisLabel: 'Books Count',
    data: authors
};

export default [
  configAuthors,
  configBooks
];