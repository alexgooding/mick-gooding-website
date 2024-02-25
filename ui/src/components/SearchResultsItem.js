import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/SearchResultsItem.css";

const SearchResultsItem = ({ painting }) => {
  const lowResImagePath = `${process.env.PUBLIC_URL}/images/low_res/${painting.painting_id}.jpg`;
  const defaultImagePath = `${process.env.PUBLIC_URL}/images/default.jpg`
  const navigate = useNavigate(); 

  const navigateToPainting = () => {
    navigate(`/s/${painting.painting_id}`);
  }

  return (
    <div className="search-item d-flex flex-column h-100 text-center p-4" onClick={navigateToPainting}>
      <div className="mt-auto">
        <img
          src={lowResImagePath}
          alt={`Painting: ${painting.name}`}
          className="search-item-image"
          onError={(e) => { e.target.src = defaultImagePath; }}
        />
      </div>
      <div>
        <h5 className="painting-name mt-3">{painting.name}</h5>
      </div>
    </div>
  );
};

export default SearchResultsItem;