import React from "react";
const SearchBar = ({ onChange, searchText }) => {
  return (
    <div className="mb-4">
      <input
        value={searchText}
        onChange={e => onChange(e.currentTarget.value)}
        className="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
    </div>
  );
};

export default SearchBar;
