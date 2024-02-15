import React from "react";

import "../styles/PaintingGallery.css";


const PaintingGallery = ({ onClickMethod }) => {
  const imagesLandscape = require.context("../../public/images/carousel/landscape/", true);
  const imagesPortrait = require.context("../../public/images/carousel/portrait/", true);
  let imageList = null;
  if (window.innerWidth < 992) {
    imageList = imagesPortrait.keys().map(image => imagesPortrait(image));
  } else {
    imageList = imagesLandscape.keys().map(image => imagesLandscape(image));
  }

  return (
    <div id="paintingCarousel" className="carousel carousel-dark slide carousel-fade mx-auto w-100" data-bs-ride="carousel">
      <div title="View all art" className="carousel-inner" onClick={onClickMethod}>
        <div className="carousel-item active">
          <img key="a" src={imageList[0]} alt="image-a" className="d-block img-fluid mx-auto" />
        </div>
        {imageList.slice(1).map((image, index) => (
          <div className="carousel-item">
            <img key={index} src={image} alt={`image-${index}`} className="d-block img-fluid mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaintingGallery;
