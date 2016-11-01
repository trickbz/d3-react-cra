import React, { Component } from 'react';
import './App.css';
import BarChart from './BarChart';

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
    xKey: 'title',
    xAxisLabel: 'Book Name',
    yKey: 'orders',
    yAxisLabel: 'Orders Count',
    data: books
};

const configAuthors = {
    xKey: 'author',
    xAxisLabel: 'Author',
    yKey: 'books',
    yAxisLabel: 'Books Count',
    data: authors
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <BarChart
            width={400}
            height={300}
            config={configAuthors} />
      </div>
    );
  }
}

export default App;
