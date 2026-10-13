import { useState } from 'react'

function SearchForm({ onSearch, isLoading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        id="search-bar"
        type="text"
        aria-label="Actor name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button id="search-button" type="submit" disabled={isLoading}>
        Search
      </button>
    </form>
  )
}

export default SearchForm
