import * as React from "react"
import { graphql } from "gatsby";

import PageLayout from "../components/PageLayout";
import makeTagLinks from "../helpers/makeTagLinks";

const BlogPost = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <PageLayout>
      <div>
        <h3>{post.frontmatter.title}</h3>
        <p>{post.frontmatter.date} - {post.frontmatter.author}</p>
        {post.frontmatter.tags && 
          <p>
            {makeTagLinks({ tags: post.frontmatter.tags })}
          </p>
        }
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </PageLayout>
  )
};

export default BlogPost;

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
        tags
      }
    }
  }
`;