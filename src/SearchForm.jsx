import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
// Grabbing setSearchTerm state update function from global context
  const { setSearchTerm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Targeting element directly
   const searchValue = (e.target.elements.search.value);
    if (!searchValue) return;
    // if searchValue is valid, set as new state with setSearchTerm function
    setSearchTerm(searchValue);
  };

  return (
    <section>
      <h1 className="title">Unsplash Images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="cat"
          className="form-input search-input"
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
