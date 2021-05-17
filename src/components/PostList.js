import React from "react";
import { Link } from "gatsby";
import * as PostListStyles from "./PostList.module.css";

export default function PostList(props) {
  return (
    <div>
      {props.posts.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>{node.frontmatter.title}</h3>
          <p>{node.frontmatter.date} - {node.frontmatter.author}</p>
          <p>{node.excerpt}</p>
          <p><Link to={`/post/${node.frontmatter.slug}`}>Read full article</Link></p>
        </div>
      ))}
    </div>
  );
}