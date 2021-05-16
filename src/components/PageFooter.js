import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import "../styles/Global.css";
import * as PageFooterStyles from "./PageFooter.module.css";

/**
 * See reference by Emma Bostian at 
 * https://itnext.io/reading-data-from-a-json-file-with-gatsby-graphql-572b18ab98a
 */
export default function PageHeader() {
  return (
    <footer className={['containerPadded', PageFooterStyles.container].join(' ')}>
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
            {makeFooterMenuItems(data)}
          </ul>
        )}/>
    </footer>
  );
}

function makeFooterMenuItems(data) {
  const footerMenuItems = [];
  data.allFooterMenuItemsJson.edges.forEach(item =>
    footerMenuItems.push(<li className={PageFooterStyles.navigationLink} key={item.node.label}><Link to={item.node.path}>{item.node.label}</Link></li>)
  );
  return footerMenuItems;
}