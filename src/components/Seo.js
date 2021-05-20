import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ description, title, twitterHandle, imageUrl }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            twitterHandle
          }
        }
      }
    `,
  );

  let metaTags = [
    {
      name: 'description',
      content: description || site.siteMetadata.description
    },
    {
      property: 'og:title',
      content: title || site.siteMetadata.title,
    },
    {
      property: 'og:description',
      content: description || site.siteMetadata.description,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:title',
      content: title || site.siteMetadata.title,
    },
    {
      name: 'twitter:creator',
      content: twitterHandle || site.siteMetadata.twitterHandle,
    },
    {
      name: 'twitter:site',
      content: site.siteMetadata.siteUrl,
    }
  ];

  // if an image url was passed in, then add the og tag for it
  if(imageUrl) {
    metaTags.push({
      property: 'og:image',
      content: imageUrl,
    })
  }
  
  return (
    <Helmet
      title={title}
      titleTemplate={`%s - ${site.siteMetadata.title}`}
      defaultTitle={site.siteMetadata.title}
      htmlAttributes={{
        lang: 'en',
      }}
      meta={metaTags}
    />
  );
};

export default Seo;