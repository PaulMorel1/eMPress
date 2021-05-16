import React from "react";
import Title from "../components/Title";
import { Link } from "gatsby";
import { graphql } from "gatsby";

import PageLayout from "../components/PageLayout";


export default function About({ data }) {
  return (
    <PageLayout title={data.site.siteMetadata.title}>
      <Title title="Here's a post title" />
      <p>
        It's a FOSS blog platform based on Gatsby.
      </p>
      <p>
        Go <Link to="/">Home</Link>
      </p>
    </PageLayout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;