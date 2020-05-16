import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
const MattLogo = ({ data }) => {
  return (
    <Layout>
      <Img fixed={data.file.childImageSharp.fixed} alt="" />
    </Layout>
  );
};
export const query = graphql`
  query {
    file(relativePath: { eq: "mattLogo.svg" }) {
      childImageSharp {
        fixed(width: 253, height: 77) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
export default MattLogo;
