import React from "react";
import { StaticQuery, graphql } from "gatsby";

import makeMenuItems from "../helpers/makeMenuItems.js";

/**
 * See reference by Emma Bostian at 
 * https://itnext.io/reading-data-from-a-json-file-with-gatsby-graphql-572b18ab98a
 */
export default function PageHeaderMenu({ styles }) {
  return (
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
          <ul className={styles.navigationLinks}>
            {makeMenuItems({ menuItemsJson: data.allHeaderMenuItemsJson, className: styles.navigationLink })}
          </ul>
        )} 
      />
    </div>
  );
}