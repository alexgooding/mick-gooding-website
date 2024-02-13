import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


const Contact = () => {

  return (
    <div className="container my-2" style={{ "max-width": "960px" }}>
      <div className="row">
        <div className="col col-12 p-3">
          <h2>Choose your print</h2>
        </div>
      </div>
      <div className="row">
        <div className="col p-3">
          <p>
            Ready to hang canvas prints of rock musicians produced from original watercolour or acrylic paintings. 
            The canvas is stretched over 18 mm or 25 mm pine bars. 
            Greeting cards are blank inside and are supplied with an envelope. Prices include P&P in the UK only. 
            Delivery is normally within 28 days. 
            If you like my style but there isn't a print of your favourite musician then get in touch & I'll see if I can create one to order.
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
        <a className="col col-auto icon-link social-handle" href="mailto:contact@mickgooding.co.uk" target="_blank" rel="noreferrer">
          <MdOutlineEmail />
          contact@mickgooding.co.uk
        </a>
      </div>
      <div className="row">
        <a className="col col-auto icon-link social-handle" href="https://www.instagram.com/micksbestart" target="_blank" rel="noreferrer">
          <FaInstagram />
          micksbestart
        </a>
      </div>
      <div className="row">
        <a className="col col-auto icon-link social-handle" href="https://facebook.com/micksart" target="_blank" rel="noreferrer">
          <FaFacebook />
          micksart
        </a>
      </div>
    </div>
  );
};

export default Contact;
