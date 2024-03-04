import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/SearchResultsItem.css";

const SearchResultsItem = ({ painting }) => {
  const lowResImagePath = `${process.env.PUBLIC_URL}/images/low_res/${painting.painting_id}.jpg`;
  const location = useLocation();
  const navigate = useNavigate(); 

  const navigateToPainting = () => {
    sessionStorage.setItem(`storeScrollPosition_${location.pathname}_${location.search}`, window.scrollY.toString());
    navigate(`/s/${painting.painting_id}`);
  }

  return (
    <div className="search-item d-flex flex-column h-100 text-center p-4" onClick={navigateToPainting}>
      <div className="mt-auto">
        <img
          src={lowResImagePath}
          alt={`Painting: ${painting.name}`}
          className="search-item-image"
        />
      </div>
      <div>
        <h5 className="painting-name mt-3">{painting.name}</h5>
      </div>
    </div>
  );
};

export default SearchResultsItem;
