import React from "react";
import BlogPost from "../components/BlogPost";

export default function PostList({ posts, fullText = true, empressPath = "" }) {
  return (
    <div>
      {posts.edges.map(({ node }) => (
        <div key={node.id}>
          <BlogPost post={node} fullText={fullText} empressPath={empressPath} />
        </div>
      ))}
    </div>
  );
}