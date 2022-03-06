import React from "react";
import { Link } from "gatsby";

import * as BlogPostStyles from "./BlogPost.module.css";
import makeTagLinks from "../helpers/makeTagLinks.js";
import makeSlug from "../helpers/makeSlug.js";
import Author from "./Author.js";

export default function BlogPost({ post, author, fullText = true, showMeta = true, type = 'post', empressPath = "" }) {
  const titleLink = type === 'post' ? `${empressPath}/post/${makeSlug(post.frontmatter.slug)}` : `${empressPath}/${makeSlug(post.frontmatter.slug)}`;
  return (
    <div className={BlogPostStyles.blogPostContainer}>
      <h2>
        <Link to={titleLink}>{post.frontmatter.title}</Link>
        {post.frontmatter.pinned && <Link to={`${empressPath}/tag/pinned`} className={['tag', BlogPostStyles.pinned].join(' ')}>pinned</Link>}
      </h2>
      {showMeta && 
        <div className={BlogPostStyles.metaContainer}>
          <div>
          {post.frontmatter.date},
          &nbsp;<Link to={`${empressPath}/author/${makeSlug(post.frontmatter.author)}`}>{post.frontmatter.author}</Link>
          </div>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 &&
            <div>
              {makeTagLinks({ tags: post.frontmatter.tags, empressPath })}
            </div>
          }
        </div>     
      }
      {(!fullText || !post.html) && 
        <p>{post.excerpt}</p>
      }
      {fullText && post.html && 
        <>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          {author && <Author author={author} empressPath={empressPath} />}
        </>
      }
      {(!fullText || !post.html) && 
        <p>
          <Link to={`${empressPath}/post/${makeSlug(post.frontmatter.slug)}`}>Read full article</Link>
        </p>
      }
    </div>
  );
}
