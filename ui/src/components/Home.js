import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import PaintingGallery from "./PaintingGallery";
import "../styles/Home.css";


const Home = () => {
  const headerLogo = `${process.env.PUBLIC_URL}/images/logos/mick_gooding_art.png`;
  const navigate = useNavigate();
  
  const enterWebsite = () => {
    navigate("/s");
  };

  return (
    <div>
      <Helmet>
        <title>Mick Gooding Art</title>
        <meta
          name="description"
          content="View and purchase Mick Gooding's original artwork."
        />
      </Helmet>
      <div className="container-fluid p-3">
        <div className="d-flex justify-content-center mb-3">
          <img src={headerLogo} alt="Mick Gooding Art Logo" className="header-logo img-fluid" />
        </div>
        <div className="mb-3">
          <PaintingGallery onClickMethod={enterWebsite} />
        </div>
      </div>
    </div>
  ); 
};

export default Home;
