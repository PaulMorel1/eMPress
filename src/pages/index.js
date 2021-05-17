import * as React from "react"
import { graphql, Link } from "gatsby";

import PageLayout from "../components/PageLayout";

const IndexPage = (props) => {
  return (
    <PageLayout>
      <div>
        {props.data.posts.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>{node.frontmatter.title}</h3>
            <p>{node.frontmatter.date} - {node.frontmatter.author}</p>
            <p>{node.excerpt}</p>
            <p><Link to={`/post/${node.frontmatter.slug}`}>Read full article</Link></p>
          </div>
        ))}
      </div>
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