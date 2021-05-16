const path = require("path");

exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions;

  // graphql function call returns a Promise :D
  // fetch all markdown pages
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: {published: {eq: true}}}) {
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
  `);

  // loop through each post
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `post/${node.frontmatter.slug}`,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.frontmatter.slug,
      }
    });
  });
};