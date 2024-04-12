import { Container, Row, Col, Carousel, Figure } from 'react-bootstrap';
import { Helmet } from "react-helmet";
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

import '../styles/About.css';
import '../styles/CommonLink.css';

const About = () => {
  const squareImg1 = `${process.env.PUBLIC_URL}/images/about/mick2_square.gif`;
  const squareImg2 = `${process.env.PUBLIC_URL}/images/about/5-IMG_4395_square.jpg`;
  const squareImg3 = `${process.env.PUBLIC_URL}/images/about/IMG_4259_square.jpg`;
  const squareImg4 = `${process.env.PUBLIC_URL}/images/about/mick1_square.gif`;
  const squareImg5 = `${process.env.PUBLIC_URL}/images/about/1-IMG_3457_square.jpg`;
  const squareImg6 = `${process.env.PUBLIC_URL}/images/about/4-IMG_3523_square.jpg`;
  const squareImg7 = `${process.env.PUBLIC_URL}/images/about/6-IMG_2305_square.jpg`;
  const squareImg8 = `${process.env.PUBLIC_URL}/images/about/8_square.jpg`;
  const squareImg9 = `${process.env.PUBLIC_URL}/images/about/9_square.jpg`;
  const squareImg10 = `${process.env.PUBLIC_URL}/images/about/10-SDC10345_square.jpg`;
  const squareImg11 = `${process.env.PUBLIC_URL}/images/about/13_square.jpg`;
  const squareImg12 = `${process.env.PUBLIC_URL}/images/about/15-DSCF3235_sqare.jpg`;
  const squareImg13 = `${process.env.PUBLIC_URL}/images/about/16-DSCF3236_sqare.jpg`;
  const squareImg14 = `${process.env.PUBLIC_URL}/images/about/17_square.jpg`;
  const squareImg15 = `${process.env.PUBLIC_URL}/images/about/22_square.jpg`;
  const squareImg16 = `${process.env.PUBLIC_URL}/images/about/22-DSCF4277_sqare.jpg`;

  return (
    <div>
      <Helmet>
        <title>About</title>
        <meta 
          name="description" 
          content="About the artist. Read about Mick Gooding's history and influences. View photos of him and notable artists he has met."
        />
      </Helmet>
      <Container className="p-3">
        <Row>
          <Col className="p-3">
            <h1>About</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="p-3">
            <p>
              I come from a family of artists. Whilst living in Boston, USA in the late 80's I was inspired to paint by the abundance of art galleries and art studios.
              It was in Boston that I studied art. On returning to England I was a finalist in the BBC TV's Art '90 Competition in Manchester.
              I have exhibited on London's Bayswater Road and been a regular at the Sunday Arts and Craft Market in Cambridge.
              In 2007 I was acknowledged in the Northampton Chronicle Echo for painting an ex-Celtic and Northampton town football player.
            </p>
            <p>
              I love to paint rock, metal, prog rock, indie, blues, jazz and pop stars in acrylic or watercolour. My inspiration comes from my love of music.
              In my youth, I was able to see many legendary figures in concert.
            </p>
            <p>
              In recent years, I have exhibited at festivals where I have met with some of the performing rock artists.
              It was great to get photos with Bernie Shaw of Uriah Heep, Mungo Jerry, Leon Hendrix (brother of Jimi Hendrix).
              I have had paintings signed by David Brock (Hawkwind), Larry Miller, Spike (The Quireboys), Olivia (Mostly Autumn), Ben Poole, Attica Rage, Pat McManus, and Bonafide.
            </p>
            <p>
              I’ve taken many photos over the years at festivals, and I like to post my photos and paintings regularly on Instagram,
              Facebook, and a selection of my paintings can also be seen on <a className="social-handle" href="https://www.etsy.com/shop/MickGoodingCanvasArt" target="_blank" rel="noreferrer">Etsy</a>.
            </p>
          </Col>
          <Col md={6} className="p-3" style={{ maxWidth: 615 }}>
            <Row>
              <Col className="ps-0 pt-0 pe-2 pb-2">
                <Carousel
                  role="region"
                  aria-label="Carousel" 
                  id="aboutCarousel1" 
                  className="slide carousel-fade mx-auto w-100" 
                  data-bs-ride="carousel"
                  controls={false}
                  indicators={false}
                >
                  <Carousel.Item>
                    <img key="1" src={squareImg3} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="2" src={squareImg1} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="3" src={squareImg6} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Dave Brock</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="4" src={squareImg11} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Larry Miller</span>
                    </Figure.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col className="ps-2 pt-0 pe-0 pb-2">
                <Carousel
                  role="region"
                  aria-label="Carousel"  
                  id="aboutCarousel2"
                  className="slide carousel-fade mx-auto w-100" 
                  data-bs-ride="carousel"
                  controls={false}
                  indicators={false}
                > 
                  <Carousel.Item>
                    <img key="1" src={squareImg2} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Mungo Jerry</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="2" src={squareImg15} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Leon Hendrix</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="3" src={squareImg9} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Doris Brendel</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="4" src={squareImg12} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Olivia Sparnenn</span>
                    </Figure.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col className="ps-0 pt-2 pe-2 pb-0">
                <Carousel
                  role="region"
                  aria-label="Carousel"  
                  id="aboutCarousel3"
                  className="slide carousel-fade mx-auto w-100" 
                  data-bs-ride="carousel"
                  controls={false}
                  indicators={false}
                >
                  <Carousel.Item>
                    <img key="1" src={squareImg5} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Arthur Brown</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="2" src={squareImg10} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Martin Barre</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="3" src={squareImg16} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Leon Hendrix</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="4" src={squareImg14} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Pat McManus</span>
                    </Figure.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col className="ps-2 pt-2 pe-0 pb-0">
                <Carousel
                  role="region"
                  aria-label="Carousel"  
                  id="aboutCarousel4"
                  className="slide carousel-fade mx-auto w-100" 
                  data-bs-ride="carousel"
                  controls={false}
                  indicators={false}
                >
                  <Carousel.Item>
                    <img key="1" src={squareImg7} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Bernie Shaw</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="2" src={squareImg8} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding with Louise Baker</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="3" src={squareImg4} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Mick Gooding</span>
                    </Figure.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img key="4" src={squareImg13} alt="..." className="d-block img-fluid mx-auto" />
                    <Figure.Caption className="about-carousel-caption carousel-caption">
                      <span>Olivia Sparnenn</span>
                    </Figure.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
            <Row className="mb-2">
              <Figure.Caption className="col col-auto px-1 fig-caption text-muted small">
                Photos: Clare Gooding
              </Figure.Caption>
            </Row>
            <Row>
              <a className="col col-auto px-1 icon-link social-handle" href="https://www.instagram.com/micksbestart" target="_blank" rel="noreferrer">
                <FaInstagram aria-label="Instagram icon" />
                micksbestart
              </a>
            </Row>
            <Row>
              <a className="col col-auto px-1 icon-link social-handle" href="https://facebook.com/micksart" target="_blank" rel="noreferrer">
                <FaFacebook aria-label="Facebook icon" />
                micksart
              </a>
            </Row>
            <Row>
              <a className="col col-auto px-1 icon-link social-handle" href="mailto:contact@mickgooding.co.uk" target="_blank" rel="noreferrer">
                <MdOutlineEmail aria-label="Mail icon" />
                contact@mickgooding.co.uk
              </a>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
