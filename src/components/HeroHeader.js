import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";

import * as HeroHeaderStyles from "./HeroHeader.module.css";
import PageHeaderMenu from "./PageHeaderMenu.js";

/**
 * See reference by Emma Bostian at 
 * https://itnext.io/reading-data-from-a-json-file-with-gatsby-graphql-572b18ab98a
 */
export default function HeroHeader() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            desktopHeroImage
            mobileHeroImage
          }
        }
      }
    `,
  );

  return (
    <header className={[HeroHeaderStyles.container].join(' ')}>
      <img src={`/images/${site.siteMetadata.desktopHeroImage}`} className={HeroHeaderStyles.heroImage} />
      <div className={HeroHeaderStyles.titleContainer}>
        <Link to="/">
          <h1>{site.siteMetadata.title}</h1>
        </Link>
      </div>
      <div className={[HeroHeaderStyles.menuContainer].join(' ')}>
        <PageHeaderMenu styles={HeroHeaderStyles} />
      </div>
    </header>
  );
}