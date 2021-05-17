import * as React from "react"
import { graphql } from "gatsby";

import PageLayout from "../components/PageLayout";
import PostList from "../components/PostList";

const IndexPage = (props) => {
  return (
    <PageLayout>
      <PostList posts={props.data.posts} />
    </PageLayout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      sort: { 
        fields: [frontmatter___date], order: DESC 
      }, 
      filter: { 
        frontmatter: {
          published: {eq: true} 
        }, 
        fields: { 
          collection: {eq: "posts"}
        }
      }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            author
            slug
          }
          excerpt
        }
      }
    }
  }
`;