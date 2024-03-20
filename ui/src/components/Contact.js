import { Helmet } from "react-helmet";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


const Contact = () => {

  return (
    <div>
      <Helmet>
        <title>Contact</title>
        <meta
          name="description"
          content="Contains information about the prints sold, Instagram, Facebook and email contact links."
        />
      </Helmet>
      <div className="container p-3 mb-3" style={{ "max-width": "960px" }}>
        <div className="row">
          <div className="col col-12 p-3">
            <h2>Choose your print</h2>
          </div>
        </div>
        <div className="row">
          <div className="col p-3">
            <p>
              Canvas prints are produced from original watercolour or acrylic paintings done by the artist, Mick Gooding. 
              The canvas is stretched over 18 mm pine bars, varnished and ready to hang.
              Prices include free P&P in the UK only.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 p-3">
            <h2>Get in touch</h2>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 p-3">
            <p>
              For all enquiries reach out by email.
            </p>
          </div>
        </div>
        <div className="row">
          <a className="col col-auto px-3 icon-link social-handle" href="mailto:contact@mickgooding.co.uk" target="_blank" rel="noreferrer">
            <MdOutlineEmail />
            contact@mickgooding.co.uk
          </a>
        </div>
        <div className="row">
          <a className="col col-auto px-3 icon-link social-handle" href="https://www.instagram.com/micksbestart" target="_blank" rel="noreferrer">
            <FaInstagram />
            micksbestart
          </a>
        </div>
        <div className="row">
          <a className="col col-auto px-3 icon-link social-handle" href="https://facebook.com/micksart" target="_blank" rel="noreferrer">
            <FaFacebook />
            micksart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
