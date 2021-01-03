import React from 'react';
import './App.css';

export default class App extends React.Component {
  state = {
    books: [],
    query: 'shining',
    printType: 'all',
    filter: ""
  };
  
  // defining this as arrow functions removes need for this bind() in class component
  searchBooks = () => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&printType=${this.state.printType}`

    if(this.state.filter !== "") {
      url += `&filter=${this.state.filter}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ books: response.items ? response.items : [] })); 
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.searchBooks();     
  }

  componentDidMount() {
    this.searchBooks();
  }

  render() {
    return (
      <div className="App">
          <h1>Google Book Search</h1>
            <form onSubmit={this.handleSubmit}>
              <p><input 
                type="text" 
                value={this.state.query} 
                placeholder="book search" 
                aria-label="book search query"
                onChange={(e) => this.handleChange( 'query', 
                e.target.value)}
              />
              </p>

              <p>
                <label htmlFor="printType">Filter by Type:</label>
                <select 
                  id="printType" 
                  value={this.state.printType} 
                  onChange={(e) => this.handleChange('printType',
                  e.target.value )}
                >
                  <option value="all">All</option>
                  <option value="books">Books</option>
                  <option value="magazines">Magazines</option>
                </select>
              </p>

              <p>
                <label htmlFor="filter">Filter by Type:</label>
                <select 
                  id="printType" 
                  value={this.state.filter} 
                  onChange={(e) => this.handleChange('filter',
                  e.target.value )}
                >
                  <option value="">None</option>
                  <option value="ebooks">Ebooks</option>
                  <option value="full">Free eBooks</option>
                  <option value="paid-ebooks">Paid eBooks</option>
                  <option value="partial">Partial</option>
                </select>
              </p>
              <p><input type="submit" value="Go" /></p>
            </form>
          <p>Your searched for &quot;{this.state.query}&quot;</p>
          <p>We found {this.state.books.length} results</p>
            <ul>
              {this.state.books.map(book => <li>{book.volumeInfo.title}</li>)}
            </ul>
      </div>
    );
  }
}
