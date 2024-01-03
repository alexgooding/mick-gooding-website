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
    <div className="form-inline" data-mdb-input-init>
      <form action="/" method="get">
        <div className="input-group">
          <input
            type="text"
            id="header-search"
            placeholder="Search all items"
            name="name"
            className="form-control"
            defaultValue={name}
            onChange={handleInputChange}
          />
          <button type="submit" className="input-group-append btn btn-primary" data-mdb-ripple-init>
            <IoIosSearch />
          </button>
        </div>
      </form>
    </div>
  );
};
  
export default SearchBar;
  