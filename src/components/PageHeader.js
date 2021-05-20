import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import "../styles/Global.css";
import * as PageHeaderStyles from "./PageHeader.module.css";
import PageHeaderMenu from "./PageHeaderMenu.js";

/**
 * See reference by Emma Bostian at 
 * https://itnext.io/reading-data-from-a-json-file-with-gatsby-graphql-572b18ab98a
 */
export default function PageHeader() {
  return (
    <header className={['containerPadded', PageHeaderStyles.container].join(' ')}>
      <div>
        <StaticQuery
          query={graphql`
            query {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={data => (
            <Link to="/">
              <h1>{data.site.siteMetadata.title}</h1>
            </Link>
          )} />
      </div>
      <PageHeaderMenu />
    </header>
  );
}