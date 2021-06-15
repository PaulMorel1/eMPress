import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";

import * as HeroHeaderStyles from "./HeroHeader.module.css";
import PageHeaderMenu from "./PageHeaderMenu.js";

/**
 * See reference by Emma Bostian at 
 * https://itnext.io/reading-data-from-a-json-file-with-gatsby-graphql-572b18ab98a
 * 
 * TODO: I'd like this to use GatsbyImage or StaticImage without making the config
 *       any more complex.
 */
export default function HeroHeader() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            empressPath
            header {
              desktopHeroImage
              mobileHeroImage
            }
            
          }
        }
      }
    `,
  );

  let empressPath = "/";
  if(site.siteMetadata?.empressPath) {
    empressPath = site.siteMetadata.empressPath;
  }

  return (
    <header className={[HeroHeaderStyles.container].join(' ')}>
      <img 
        src={`/images/${site.siteMetadata.header?.desktopHeroImage}`}
        className={HeroHeaderStyles.desktopHeroImage}
        alt={`Banner for ${site.siteMetadata.title}`}
      />
      <img
        src={`/images/${site.siteMetadata.header?.mobileHeroImage}`}
        className={HeroHeaderStyles.mobileHeroImage}
        alt={`Banner for ${site.siteMetadata.title}`}
      />
      <div className={HeroHeaderStyles.titleContainer}>
        <Link to={empressPath}>
          <h1>{site.siteMetadata.title}</h1>
        </Link>
      </div>
      <div className={[HeroHeaderStyles.menuContainer].join(' ')}>
        <PageHeaderMenu styles={HeroHeaderStyles} />
      </div>
    </header>
  );
}