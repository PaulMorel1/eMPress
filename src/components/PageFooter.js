import React from "react";
import { StaticQuery, graphql } from "gatsby";

import * as PageFooterStyles from "./PageFooter.module.css";
import makeMenuItems from "../helpers/makeMenuItems.js";

/**
 * See reference by Emma Bostian at 
 * https://itnext.io/reading-data-from-a-json-file-with-gatsby-graphql-572b18ab98a
 */
export default function PageHeader() {
  return (
    <footer className={[PageFooterStyles.container, 'contentContainer'].join(' ')}>
      <StaticQuery
        query={graphql`
          query FooterMenuItemsQuery {
            allFooterMenuItemsJson {
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
          <ul className={PageFooterStyles.navigationLinks}>
            {makeMenuItems({ menuItemsJson: data.allFooterMenuItemsJson, className: PageFooterStyles.navigationLink })}
          </ul>
        )} />
    </footer>
  );
}
