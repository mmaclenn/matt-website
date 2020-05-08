import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Layout from "../components/layout";

import { graphql } from "gatsby";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faGithub, faLinkedin);

const HomeHeading = styled.svg`
  margin: 0;
  color: rgba(255, 255, 255, 1);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  perspective: 1000;

  rect {
    -webkit-mask: url(#mask);
    mask: url(#mask);
    fill: #f00;
  }

  defs {
    mask {
      rect {
        fill: white;
      }
      text {
        font-size: 8vw;
      }
    }
  }

  transform: scale(
    ${props =>
      props.scrollPosition / 10 < 1 ? 1 : props.scrollPosition / props.scale}
  );
  transform-origin: 42% 56%;
  display: ${props => (props.scrollPosition > 1150 ? "none" : "block")};

  #editText {
    @media screen and (max-width: 480px) {
      transform: translateY(-10%);
    }
  }

  @media screen and (max-width: 480px) {
    transform-origin: 57% 49% !important;
  }
`;
const HomeSubHomeSectionHeading = styled.section`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #1ecbe1;
  position: fixed !important;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ColorChanger = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  top: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(
    255,
    255,
    255,
    ${props => 3000 / props.scrollPosition / 20}
  );
  display: ${props => (props.scrollPosition > 1150 ? "none" : "block")};
`;

const ImageStamp = styled.div`
  width: 280px;
  height: auto;
  display: inline-block;
  padding: 10px;
  background: white;
  position: relative;
  -webkit-filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  background: radial-gradient(
    transparent 0px,
    transparent 4px,
    white 4px,
    white
  );
  background-size: 20px 20px;
  background-position: -10px -10px;

  &:after {
    content: "";
    position: absolute;
    left: 5px;
    top: 5px;
    right: 5px;
    bottom: 5px;
    z-index: -1;
  }
`;

const MeSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const MePhoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 33.333%;
`;

const MeBio = styled.div`
  flex: 1 0 66.666%;
  color: #ffffff;
`;

const MeSocials = styled.div`
  svg {
    margin: 0 10px;
  }
`;

const SocialLink = styled.a`
  color: #fff;
  &:hover {
    color: #f1f1f1;
  }
`;

const IndexPage = props => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    setScale(document && document.width > 500 ? 20 : 5);
    window.addEventListener("scroll", handleScroll, { passive: true });
  });

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  return (
    <Layout>
      <HomeSubHomeSectionHeading>
        <ColorChanger scrollPosition={scrollPosition}></ColorChanger>
        <MeSection>
          <div className="container">
            <MePhoto>
              <ImageStamp>
                <Img fluid={props.data.mattImage.childImageSharp.fluid} />
              </ImageStamp>
            </MePhoto>
            <MeBio>
              <h3>Hi, I'm Matt!</h3>
              <hr />
              <p>
                I'm a Lead Frontend Developer currently based at Oliver Wyman
                Digital. I have experience in a range of frontend technologies
                and practices; more recently dabbling with AB testing, VueCLI
                and Typescript.
              </p>
              <p>
                Outside of the web world, I like to run, travel and like to
                watch movies. Apart from Toy Story 1, I cried when I found out
                Buzz Lightyear couldn't fly.
              </p>
              <h4>Find out more</h4>
              <hr />
              <MeSocials>
                <SocialLink
                  href="https://uk.linkedin.com/in/mattmaclennan"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </SocialLink>
                <SocialLink href="https://github.com/mmaclenn" target="_blank">
                  <FontAwesomeIcon icon={faGithub} />
                </SocialLink>
              </MeSocials>
            </MeBio>
          </div>
        </MeSection>
      </HomeSubHomeSectionHeading>
      <HomeHeading
        preserveAspectRatio="xMinYMin meet"
        scale={scale}
        scrollPosition={scrollPosition}
      >
        <defs>
          <mask id="mask" x="0" y="0" width="100%" height="100%">
            <rect x="0" y="0" width="100%" height="100%" fill="#fff"></rect>
            <text x="50%" y="50%" textAnchor="middle">
              Matt Maclennan
            </text>
            <text id="editText" x="50%" y="65%" textAnchor="middle">
              Web Developer
            </text>
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#E1341E"
          id="mask"
        ></rect>
      </HomeHeading>
    </Layout>
  );
};

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const pageQuery = graphql`
  query {
    mattImage: file(relativePath: { eq: "me.jpg" }) {
      ...fluidImage
    }
  }
`;

export default IndexPage;
