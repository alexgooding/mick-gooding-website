import React from "react";
import { Carousel } from "react-bootstrap";
import "../styles/PaintingGallery.css";

const PaintingGallery = ({ onClickMethod }) => {
  const imagesLandscape = require.context(
    "../../public/images/carousel/landscape/",
    true
  );
  const imagesPortrait = require.context(
    "../../public/images/carousel/portrait/",
    true
  );
  let imageList = null;

  if (window.innerWidth < 992) {
    imageList = imagesPortrait.keys().map((image) => imagesPortrait(image));
  } else {
    imageList = imagesLandscape.keys().map((image) => imagesLandscape(image));
  }

  return (
    <Carousel
      id="paintingCarousel"
      className="painting-carousel carousel-fade mx-auto w-100"
      data-bs-ride="carousel"
      controls={false}
      indicators={false}
    >
      <Carousel.Item>
        <div title="View all art" onClick={onClickMethod} style={{ cursor: "pointer" }}>
          <img
            className="painting-carousel-img d-block img-fluid mx-auto"
            key="a"
            src={imageList[0]}
            alt="image-a"
          />
        </div>
      </Carousel.Item>
      {imageList.slice(1).map((image, index) => (
        <Carousel.Item key={index}>
          <div title="View all art" onClick={onClickMethod} style={{ cursor: "pointer" }}>
            <img
              className="painting-carousel-img d-block img-fluid mx-auto"
              src={image}
              alt={`image-${index}`}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PaintingGallery;
