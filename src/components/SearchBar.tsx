interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search transactions..."
      onChange={(e) => onSearch(e.target.value)}
      className="search-input"
    />
  );
}

export default SearchBar;
