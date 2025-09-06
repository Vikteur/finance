interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 3 || value.length === 0) {
      onSearch(value);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search transactions..."
      onChange={handleChange}
      className="search-input"
    />
  );
}

export default SearchBar;
