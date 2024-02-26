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
    <div id="paintingCarousel" className="painting-carousel carousel carousel-dark slide carousel-fade mx-auto w-100" data-bs-ride="carousel">
      <div title="View all art" className="painting-carousel-inner carousel-inner" onClick={onClickMethod}>
        <div className="carousel-item active">
          <img className="painting-carousel-img d-block img-fluid mx-auto" key="a" src={imageList[0]} alt="image-a" />
        </div>
        {imageList.slice(1).map((image, index) => (
          <div className="carousel-item">
            <img className="painting-carousel-img d-block img-fluid mx-auto" key={index} src={image} alt={`image-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaintingGallery;
