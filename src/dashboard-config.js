const books = [
    {title: 'This is very long book name', orders: 12},
    {title: 'Book 2', orders: 5},
    {title: 'Book 3', orders: 21},
    {title: 'Don\'t be so long, dear book name. I have you!', orders: 61},
    {title: 'Book 5', orders: 30}
];

const authors = [
    {author: 'Author 1', books: 11},
    {author: 'This time the name become XXX chars length. Good or not? Good!', books: 5},
    {author: 'Author 3', books: 21},
    {author: 'Author 4', books: 7},
    {author: 'Author 5', books: 3},
    {author: 'The most FAT programmer in the world! ', books: 4},
    {author: 'Author 7', books: 31},
    {author: 'Mama mila ramu i papu', books: 20}
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