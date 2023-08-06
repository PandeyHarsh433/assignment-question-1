const Search = ({ searchText, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchText}
      onChange={onChange}
    />
  );
};

export default Search;
