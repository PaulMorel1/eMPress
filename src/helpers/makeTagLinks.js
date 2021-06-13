import React from "react";
import { Link } from "gatsby";
import makeSlug from "./makeSlug";

export default function makeTagLinks({ tags, className, empressPath = "" }) {
  const tagLinks = [];
  tags.forEach((item, index) =>
    tagLinks.push(<span className={className} key={item}>
      <Link to={`${empressPath}/tag/${makeSlug(item)}`} className='tag'>{item}</Link>{(index < tags.length - 1) && <span>, </span>}
    </span>)
  );
  return tagLinks;
}