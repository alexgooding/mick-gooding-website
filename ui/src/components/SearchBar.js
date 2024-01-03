import { IoIosSearch } from "react-icons/io";


const SearchBar = () => (
      <div className="form-inline" data-mdb-input-init>
        <form action="/" method="get">
          <div className="input-group">
            <input
              type="text"
              id="header-search"
              placeholder="Search all items"
              name="name"
              className="form-control"
            />
            <button type="submit" className="input-group-append btn btn-primary" data-mdb-ripple-init>
              <IoIosSearch />
            </button>
          </div>
        </form>
      </div>
  );
  
  export default SearchBar;
  