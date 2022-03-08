import React from "react";
import { Link } from "gatsby";
import ProgressiveImage from 'react-progressive-image';

import * as AuthorStyles from "./Author.module.css";
import makeSlug from "../helpers/makeSlug.js";

export default function Author({ author, empressPath = "" }) {
  const titleLink = `${empressPath}/author/${makeSlug(author.frontmatter.slug)}`;

  return (
    <div className={AuthorStyles.authorContainer}>
      {author.frontmatter.featuredImage &&
        <div className={AuthorStyles.avatarContainer}>

          <ProgressiveImage 
            src={`/images/${author.frontmatter.featuredImage}`}
            placeholder={`/images/placeholder.webp`}
            >
            {src => <img src={src} alt={`Avatar for ${author.frontmatter.title}`} />}
          </ProgressiveImage>
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
