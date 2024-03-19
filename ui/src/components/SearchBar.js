import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";


const SearchBar = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialName = queryParams.get("name");
  const [name, setName] = useState(initialName);

  // Update the name when the query parameter changes
  useEffect(() => {
    setName(queryParams.get("name"));
  }, [location.search]);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="form-inline h-100" data-mdb-input-init>
      <form className="h-100" action="/s" method="get">
        <div className="input-group h-100">
          <input
            type="text"
            id="header-search"
            placeholder="Search all items"
            name="name"
            autoComplete="on"
            className="form-control"
            defaultValue={name}
            onChange={handleInputChange}
          />
          <button type="submit" className="input-group-append btn btn-outline-dark border" data-mdb-ripple-init>
            <IoIosSearch />
          </button>
        </div>
      </form>
    </div>
  );
};
  
export default SearchBar;
  