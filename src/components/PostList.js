import React from "react";
import BlogPost from "../components/BlogPost";

export default function PostList({ posts, fullText = true }) {
  return (
    <div>
      {posts.edges.map(({ node }) => (
        <div key={node.id}>
          <BlogPost post={node} fullText={fullText} />
        </div>
      ))}
    </div>
  );
}