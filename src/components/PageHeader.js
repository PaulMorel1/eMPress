import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

import * as PageHeaderStyles from "./PageHeader.module.css";
import PageHeaderMenu from "./PageHeaderMenu.js";

/**
 * See reference by Emma Bostian at 
 * https://itnext.io/reading-data-from-a-json-file-with-gatsby-graphql-572b18ab98a
 */
export default function PageHeader() {
  return (
    <header className={[PageHeaderStyles.container, 'contentContainer'].join(' ')}>
      <div>
        <StaticQuery
          query={graphql`
            query {
              site {
                siteMetadata {
                  title
                  empressPath
                }
              }
            }
          `}
          render={data => (
            <Link to={data.site.siteMetadata.empressPath ? data.site.siteMetadata.empressPath : "/"}>
              <h1>{data.site.siteMetadata.title}</h1>
            </Link>
          )} />
      </div>
      <PageHeaderMenu styles={PageHeaderStyles} />
    </header>
  );
}