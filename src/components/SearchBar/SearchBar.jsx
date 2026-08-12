import './SearchBar.css'

function SearchBar({ query, onQueryChange, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search for a show..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <button className="search-bar-button" type="submit">
        Search
      </button>
    </form>
  )
}

export default SearchBar
