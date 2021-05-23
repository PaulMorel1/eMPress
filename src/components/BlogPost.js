import React from "react";
import { Link } from "gatsby";

import "../styles/Global.css";
import * as BlogPostStyles from "./BlogPost.module.css";
import makeTagLinks from "../helpers/makeTagLinks.js";

export default function BlogPost({ post, fullText = true, showMeta = true }) {
  return (
    <div className={BlogPostStyles.blogPostContainer}>
      <h3><Link to={`/post/${post.frontmatter.slug}`}>{post.frontmatter.title}</Link></h3>
      {showMeta && 
        <div className={BlogPostStyles.metaContainer}>
          <div>
            {post.frontmatter.date}, <Link to={`/author/${encodeURI(post.frontmatter.author)}`}>{post.frontmatter.author}</Link>
          </div>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 &&
            <div>
              {makeTagLinks({ tags: post.frontmatter.tags })}
            </div>
          }
        </div>     
      }
      {(!fullText || !post.html) && 
        <p>{post.excerpt}</p>
      }
      {fullText && post.html && 
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      }
      {(!fullText || !post.html) && 
        <p>
          <Link to={`/post/${post.frontmatter.slug}`}>Read full article</Link>
        </p>
      }
    </div>
  );
}
