import React from "react";
import Title from "../components/Title";
import { Link } from "gatsby";
import PageLayout from "../components/PageLayout";

export default function About() {
  return (
    <PageLayout>
      <Title title='About eMPress' />
      <p>
        It's a FOSS blog platform based on Gatsby.
      </p>
      <p>
        Go <Link to="/">Home</Link>
      </p>
    </PageLayout>
  );
}