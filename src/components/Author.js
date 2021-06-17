import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import * as AuthorStyles from "./Author.module.css";
import makeSlug from "../helpers/makeSlug.js";

export default function Author({ author, empressPath = "" }) {
  const titleLink = `${empressPath}/author/${makeSlug(author.frontmatter.slug)}`;

  return (
    <div>
      <h4>
        <Link to={titleLink}>{author.frontmatter.title}</Link>
      </h4>
      <div dangerouslySetInnerHTML={{ __html: author.html }} />
    </div>
  );
}
