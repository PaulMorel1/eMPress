import * as React from "react"
import { Link, graphql } from "gatsby";

import PageLayout from "../components/PageLayout";

const BlogPage = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <PageLayout>
      <div>
        <h3>{post.frontmatter.title}</h3>
        <p>{post.frontmatter.date} - <Link to={`/author/${encodeURI(post.frontmatter.author)}`}>{post.frontmatter.author}</Link></p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </PageLayout>
  )
};

export default BlogPage;

export const query = graphql`
  query($slug: String!) {
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