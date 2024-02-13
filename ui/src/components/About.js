import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import "../styles/CommonLink.css";


const About = () => {
  const squareImg1 = `${process.env.PUBLIC_URL}/images/about/mick2_square.gif`;
  const squareImg2 = `${process.env.PUBLIC_URL}/images/about/IMG_4395_square.jpg`;
  const squareImg3 = `${process.env.PUBLIC_URL}/images/about/IMG_4259_square.jpg`;
  const squareImg4 = `${process.env.PUBLIC_URL}/images/about/mick1_square.gif`;

  return (
    <div className="container my-2">
      <div className="row">
        <div className="col p-3">
          <h1>About</h1>
        </div>
      </div>
      <div className="row">
        <div className="col col-12 col-md-6 p-3">
            <p>
              I come from a family of artists. Whilst living in Boston, USA in the late 80's, I was inspired to paint by the abundance of art galleries and art studios. 
              It was in Boston that I studied art. On returning to England I was a finalist in the BBC TV's Art '90 Competition in Manchester. 
              I have exhibited on London's Bayswater Road and been a regular at the Sunday Arts and Craft Market in Cambridge. 
              In 2007 I was acknowledged in the Northampton Chronicle and Echo for painting an ex-Celtic and Northampton town player. 
              Today I trade at music festivals whenever I can. 
              I am a regular at the Cambridge Rock Festival and have had paintings signed by Larry Miller, Spike (The Quireboys), Olivia (Mostly Autumn), Ben Poole, Attica Rage, Pat McManus, Bonafide, Ali Clinton not to mention a few others.
            </p>
            <p>
              I paint jazz, blues, rock, indie, pop, film and sporting personalities in acrylic or watercolour. My inspiration comes from my love of music and sport. 
              In my youth I was able to see many legendary figures in concert. I do commissions for a wide range of people including well-known personalities and when possible get the paintings signed.
            </p>
          </div>
        {/* Limit width of col to handle low res image proportions */}
        <div className="col col-12 col-md-6 p-2" style={{"max-width": 615}}>
          <div className="row">
            <div className="col p-2">
              <img src={squareImg1} alt="Mick Gooding 1" className="img-fluid" />
            </div>
            <div className="col p-2">
              <img src={squareImg2} alt="Mick Gooding 2" className="img-fluid" />
            </div>
          </div>
          <div className="row">
            <div className="col p-2">
              <img src={squareImg3} alt="Mick Gooding 3" className="img-fluid" />
            </div>
            <div className="col p-2">
              <img src={squareImg4} alt="Mick Gooding 4" className="img-fluid" />
            </div>
          </div>
          <div className="row">
            <figcaption className="col col-auto fig-caption text-muted small">
              Photos: Clare Gooding
            </figcaption>
          </div>
          <div className="row mt-2">
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
          <div className="row">
            <a className="col col-auto icon-link social-handle" href="mailto:contact@mickgooding.co.uk" target="_blank" rel="noreferrer">
              <MdOutlineEmail />
              contact@mickgooding.co.uk
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
