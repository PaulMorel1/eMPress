import React from "react";
import { Link } from "gatsby";
import makeSlug from "./makeSlug";

export default function makeMenuItems({ menuItemsJson, className }) {
  const footerMenuItems = [];
  menuItemsJson.edges.forEach(item =>
    footerMenuItems.push(<li className={className} key={item.node.label}>
      <Link to={`/${makeSlug(item.node.path)}`}>{item.node.label}</Link>
    </li>)
  );
  return footerMenuItems;
}