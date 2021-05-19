import React from "react";
import { Link } from "gatsby";
import * as PostListStyles from "./PostList.module.css";

export default function PostList(props) {
  return (
    <div>
      {props.posts.edges.map(({ node }) => (
        <div key={node.id}>
          <h3><Link to={`/post/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link></h3>
          <p>{node.frontmatter.date} - <Link to={`/author/${encodeURI(node.frontmatter.author)}`}>{node.frontmatter.author}</Link></p>
          {(!props.fullText || !node.html) && 
            <p>{node.excerpt}</p>
          }
          {props.fullText && node.html && 
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
          }
          {(!props.fullText || !node.html) && 
            <p>
              <Link to={`/post/${node.frontmatter.slug}`}>Read full article</Link>
            </p>
          }
        </div>
      ))}
    </div>
  );
}