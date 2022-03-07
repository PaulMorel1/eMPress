import * as React from "react"
import { graphql } from "gatsby";

import PageLayout from "../components/PageLayout";
import BlogPost from "../components/BlogPost";

const BlogPage = ({ data }) => {
  const page = data.page;
  const seoDetails = {
    title: page.frontmatter.title,
    description: page.excerpt,
    blogPost: page,
  };

  let empressPath = "";
  if(data.site?.siteMetadata?.empressPath) {
    empressPath = data.site.siteMetadata.empressPath;
  }

  return (
    <PageLayout seo={seoDetails}>
      <BlogPost post={page} fullText={true} showMeta={false} type='page' empressPath={empressPath} />
    </PageLayout>
  )
};

export default BlogPage;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        empressPath
      }
    }
    page: markdownRemark(
      frontmatter: {
        published: {eq: true}
        slug: { eq: $slug }
      }
    ) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        author
        slug
      }
    }
  }
`;