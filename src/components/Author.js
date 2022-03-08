import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import * as AuthorStyles from "./Author.module.css";
import makeSlug from "../helpers/makeSlug.js";

export default function Author({ author, empressPath = "" }) {
  const titleLink = `${empressPath}/author/${makeSlug(author.frontmatter.slug)}`;
  const image = getImage(author.frontmatter.featuredImage);

  return (
    <div className={AuthorStyles.authorContainer}>
      {author.frontmatter.featuredImage &&
        <div className={AuthorStyles.avatarContainer}>
          <GatsbyImage 
            image={image}
            className={AuthorStyles.avatar}
            alt={`Avatar for ${author.frontmatter.title}`}
          />
        </div>
      }
      <div className={AuthorStyles.authorDetails}>
        <h4>
          <Link to={titleLink}>{author.frontmatter.title}</Link>
        </h4>
        <div dangerouslySetInnerHTML={{ __html: author.html }} />
      </div>
    </div>
  );
}
