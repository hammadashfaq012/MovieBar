// Reusable search input with a submit button.
// Controlled component — receives query state and callbacks from the parent page.
// Used on both the Home page (navigates to Explore) and the Explore page (runs search directly).

import './SearchBar.css'

function SearchBar({ query, onQueryChange, onSearch }) {
  // Prevent default form submission (page reload) and trigger parent search handler
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
