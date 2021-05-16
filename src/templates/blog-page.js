import * as React from "react"
import { graphql } from "gatsby";

import PageLayout from "../components/PageLayout";

const BlogPage = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <PageLayout title={data.site.siteMetadata.title}>
      <div>
        <h3>{post.frontmatter.title}</h3>
        <p>{post.frontmatter.date} - {post.frontmatter.author}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </PageLayout>
  )
};

export default BlogPage;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      frontmatter: {
        published: {eq: true}
        slug: { eq: $slug }
      }
    ) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        author
      }
    }
  }
`;