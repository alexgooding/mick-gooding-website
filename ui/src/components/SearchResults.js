import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import SearchResultsItem from "./SearchResultsItem";
import SearchBar from "./SearchBar";


const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const SearchResults = () => {
  const [paintings, setPaintings] = useState([]);
  const [resultsText, setResultsText] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  // Function to set initial state from cached data
  const setInitialStateFromCache = () => {
    const cacheKey = name ? `paintings_${name}` : "paintings";
    const cachedPaintings = localStorage.getItem(cacheKey);
    if (cachedPaintings) {
      setPaintings(JSON.parse(cachedPaintings));
    }
  };

  // Function to fetch paintings and update state
  const fetchPaintings = async (abortController) => {
    try {
      // Set results text to nothing until it is determined
      setResultsText("");

      // Retrieve paintings
      const url = name ? `/paintings?name=${name}&order_by=name` : "/paintings?order_by=name";
      let paintingsData = [];
      await client.get(url, { signal: abortController.signal })
        .then((response) => {
          paintingsData = response.data;
        })
        .catch((error) => {
          if (error.response.status !== 404) {
            throw new Error(error);
          }
        });

      const cacheKey = name ? `paintings_${name}` : "paintings";

      setPaintings(paintingsData);

      // Cache the paintings data in localStorage
      localStorage.setItem(cacheKey, JSON.stringify(paintingsData));

      // Call generateResultsText after paintings have been updated
      generateResultsText(paintingsData.length, name);
    } catch (error) {
      console.error(error);
    }
  };

  // Function for determining results header
  const generateResultsText = (resultsLength, searchText) => {
    let resultsText = "";

    if (resultsLength === 0) {
      resultsText = `No results found for '${searchText}'.`;
    }
    else if (searchText) {
      resultsText = `${resultsLength} results found for '${name}'...`;
    }

    setResultsText(resultsText);
  };

  // Effect for initial render and background data fetching
  useEffect(() => {
    const abortController = new AbortController();
    setInitialStateFromCache();
    fetchPaintings(abortController);

    const storedScrollPosition = sessionStorage.getItem(`storeScrollPosition_${location.pathname}_${location.search}`);

    if (storedScrollPosition !== null) {
      setTimeout(() => window.scrollTo(0, parseInt(storedScrollPosition, 10)));
    }

    return () => {
      abortController.abort();
    }
  }, [name]);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-center mb-3">
        <SearchBar />
      </div>
      <div className="d-flex justify-content-center mb-3">
        <span>
          {resultsText}
        </span>
      </div>
      <div className="row row-cols-auto">
        {paintings.map((painting) => (
          <div key={painting.painting_id} className="col m-auto">
            <SearchResultsItem painting={painting} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
