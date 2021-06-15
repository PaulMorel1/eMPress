import React from "react";
import { useStaticQuery, graphql } from 'gatsby';

// Global styles, which can be overwritten by the theme
import "../styles/Global.css";

import * as PageLayoutStyles from "./PageLayout.module.css";
import PageHeader from "./PageHeader";
import HeroHeader from "./HeroHeader";
import PageFooter from "./PageFooter";
import Seo from "./Seo";
import Themes from "../styles/themes/themes"; // This is needed to pick up the theme css.

export default function PageLayout(props) {
  // Fetch site meta data including theme
  const { site } = useStaticQuery(
    graphql`
      query ThemeQuery {
        site {
          siteMetadata {
            theme
            header {
              type
            }
          }
        }
      }
    `,
  );

  const theme = site.siteMetadata.theme || "default";

  return (
    <div className={[PageLayoutStyles.outerContainer, theme].join(' ')}>
      <Seo {...props.seo} />
      {site.siteMetadata.header?.type !== "hero" && <PageHeader />}
      {site.siteMetadata.header?.type === "hero" && <HeroHeader />}
      <div className='contentContainer'>
        <main>
          {props.children}
        </main>
      </div>
      <PageFooter />
    </div>
  );
}