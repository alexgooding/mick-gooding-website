const SearchBar = () => (
    <div className="input-group">
      <div className="form-outline" data-mdb-input-init>
        <form action="/" method="get">
          <input
            type="text"
            id="header-search"
            placeholder="Search all items"
            name="name"
          />
          <button type="submit" className="btn btn-primary" data-mdb-ripple-init>
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
  
  export default SearchBar;
  