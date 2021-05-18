import React from "react";
import { Link } from "gatsby";

export default function makeTagLinks({ tags, className }) {
  const tagLinks = [];
  tags.forEach((item, index) =>
    tagLinks.push(<span className={className} key={item}>
      <Link to={`/tag/${item}`}>{item}</Link>{(index < tags.length - 1) && <span>, </span>}
    </span>)
  );
  return tagLinks;
}