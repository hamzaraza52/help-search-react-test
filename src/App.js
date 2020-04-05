import React, { useState, useEffect } from 'react';
import './App.css';

const APIURL = "https://help-search-api-prod.herokuapp.com/search?query="

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')
  const searchURL = `${APIURL}+${search}`

  useEffect(() => {
    async function fetchData() {
      return await fetch(searchURL)
        .then(res => res.json())
        .then(res => {
          const data = res.results
          // TODO: return multiple pages
          return setResults(data.slice(0, 10))
        })

    }
    fetchData();
  }, [searchURL]);
  return (
    <div className="App">
      <h1>How can we help?</h1>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        type="text" className="c-input" placeholder="Search..." />
      <button
        // TODO: return results on enter as well as on click
        className="c-button" onClick={() => setSearch(searchTerm)}   >Search</button>
      {results ? (
        <ul className="c-list">
          {results.map(item => (
            <li
              className="c-list"
              key={item.objectID}>
              <a className="c-link"
                href={item.url}>{item.title}</a>
              <p className="c-description">{item.description}</p>
            </li>
          ))}
        </ul>) : null
      }
    </div>
  );
}

export default App;
