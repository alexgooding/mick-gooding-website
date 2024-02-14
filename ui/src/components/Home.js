import { useNavigate } from "react-router-dom";

import PaintingGallery from "./PaintingGallery";
import "../styles/Home.css";


const Home = () => {
  const headerLogo = `${process.env.PUBLIC_URL}/images/logos/mick_gooding_art_1_stretched.png`;
  const navigate = useNavigate();
  
  const enterWebsite = () => {
    navigate("/s");
  };

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-center my-3">
        <img src={headerLogo} alt="Mick Gooding Art Logo" className="header-logo img-fluid" />
      </div>
      <div className="my-3">
        <PaintingGallery onClickMethod={enterWebsite} />
      </div>
    </div>
  ); 
};

export default Home;
