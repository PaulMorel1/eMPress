import React from "react";
import BlogPost from "../components/BlogPost";

export default function PostList(props) {
  return (
    <div>
      {props.posts.edges.map(({ node }) => (
        <div key={node.id}>
          <BlogPost post={node} fullText={false} />
        </div>
      ))}
    </div>
  );
}