import React, { useEffect } from 'react';

const baseUrl = 'https://openlibrary.org';

export function searchBooks(query) {
    const url = new URL(baseUrl + '/search.json');
    url.searchParams.append('title', query);

    return fetch(url).then(response => response.json());
}

export function Search() {

    const [results, setResults] = React.useState(0);
    const [value, setValue] = React.useState()

const handleSearch = (event) => {
  searchBooks(event.target.value).then(response => {
    setResults(response.docs);
  });
};

useEffect(() => {
    searchBooks(value).then(response => {
        setResults(response.docs);
      });
}, [])

const resultList = (results || []).map((book) =>
  <tr key={book.key}>
    <td>{book.title}</td>
    <td>{book.author_name && book.author_name.join(', ')}</td>
    <td>{book.first_publish_year}</td>
  </tr>
);
  return (
    <div>
      <div className="search-input">
<input  type="text"  placeholder="Type Something"/>
      </div>
      <h1 className="h1">Search Results</h1>
      <div className="books">
        <table>
          <thead>
            <tr>
              <th className="title-col">Title</th>
              <th className="author-col">Author</th>
              <th className="year-col">Pub Year</th>
            </tr>
          </thead>
          <tbody>{resultList}</tbody>
        </table>
      </div>
    </div>
  );
}