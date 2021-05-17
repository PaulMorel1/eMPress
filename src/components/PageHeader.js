import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import "../styles/Global.css";
import * as PageHeaderStyles from "./PageHeader.module.css";
import makeMenuItems from "../helpers/makeMenuItems.js";

/**
 * See reference by Emma Bostian at 
 * https://itnext.io/reading-data-from-a-json-file-with-gatsby-graphql-572b18ab98a
 */
export default function PageHeader(props) {
  return (
    <header className={['containerPadded', PageHeaderStyles.container].join(' ')}>
      <div>
        <Link to="/">
          <h3>{props.title}</h3>
        </Link>
      </div>
      <div>
      <StaticQuery
        query={graphql`
          query HeaderMenuItemsQuery {
            allHeaderMenuItemsJson {
              edges {
                node {
                  label
                  path
                }
              }
            }
          }
        `}
        render={data => (
          <ul className={PageHeaderStyles.navigationLinks}>
            {makeMenuItems({ menuItemsJson: data.allHeaderMenuItemsJson, className: PageHeaderStyles.navigationLink })}
          </ul>
        )} />
      </div>
    </header>
  );
}