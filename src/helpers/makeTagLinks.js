import React from "react";
import { Link } from "gatsby";
import makeSlug from "./makeSlug";

export default function makeTagLinks({ tags, className, empressPath = "" }) {
  const tagLinks = [];
  tags.forEach((item, index) => {
    const itemSlug = makeSlug(item);
    tagLinks.push(<span className={className} key={itemSlug}>
      <Link to={`${empressPath}/tag/${makeSlug(itemSlug)}`} className='tag'>{itemSlug}</Link>{(index < tags.length - 1) && <span>, </span>}
    </span>)
  });
  return tagLinks;
}