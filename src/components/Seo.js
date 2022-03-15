import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ description, title, twitterHandle, image, blogPost }) => {
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

  // list of meta tags that will be rendered
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
  if(image) {
    metaTags.push({
      property: 'og:image',
      content: image,
    });
  }

  if(blogPost) {
    // make the url for this post
    metaTags.push({
      property: 'og:url',
      content: `${site.siteMetadata.siteUrl}/post/${blogPost.frontmatter.slug}`,
    });
  }

  // define the BLogPostingSchema markup inline
  const BlogPostingSchema = (blogPost) => {
    if(!blogPost) {
      return '';
    }

    const authorNameSplit = blogPost.frontmatter.author.split(" ");
    const authorFirstName = authorNameSplit.length > 0 ? authorNameSplit[0] : '';
    const authorLastName = authorNameSplit.length > 1 ? authorNameSplit[authorNameSplit.length - 1] : '';

    return <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${site.siteMetadata.siteUrl}/post/${blogPost.frontmatter.slug}`
        },
        headline: blogPost.frontmatter.title,
        description: blogPost.excerpt,
        author: {
          "@type": "Person",
          givenName: authorFirstName,
          familyName: authorLastName
        },
        datePublished: blogPost.frontmatter.date,
        image: image,
      })}
    </script>;
  };
  
  return (
    <Helmet
      title={title}
      titleTemplate={`%s - ${site.siteMetadata.title}`}
      defaultTitle={site.siteMetadata.title}
      htmlAttributes={{
        lang: 'en',
      }}
      meta={metaTags}
    >
      <link rel="icon" href='/static/images/favicon.ico' />
      {BlogPostingSchema(blogPost)}
    </Helmet>
  );
};

export default Seo;