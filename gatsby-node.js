const path = require("path");

/**
 * Add a field to each markdown file to indicate which 
 * collection it belongs to. Posts or pages?
 * 
 * See https://georgenance.com/dont-use-frontmatter-markdown-files-gatsby
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // get the parent directory
    const parent = getNode(node.parent);
    let collection = parent.sourceInstanceName;

    // add the collection field
    createNodeField({
      node,
      name: 'collection',
      value: collection,
    });
  }
};

exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions;

  // graphql function call returns a Promise :D
  // fetch all markdown pages
  const result = await graphql(`
    {
      pages: allMarkdownRemark(
        filter: { 
          frontmatter: {
            published: {eq: true} }, 
            fields: { collection: {eq: "pages"}
          }
        }
      ) {
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
      posts: allMarkdownRemark(
        filter: { 
          frontmatter: {
            published: {eq: true} 
          }, 
          fields: { 
            collection: {eq: "posts"}
          }
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
              author
              slug
              tags
            }
            excerpt
          }
        }
      }
    }
  `);

  // loop through each page and create the pages
  result.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: `${node.frontmatter.slug}`,
      component: path.resolve('./src/templates/blog-page.js'),
      context: {
        slug: node.frontmatter.slug,
      }
    });
  });

  // This will be our list of posts with a given tag
  let taggedPosts = [];

  // loop through each post and create the posts
  result.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: `post/${node.frontmatter.slug}`,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.frontmatter.slug,
      }
    });

    // Store each tag in a hash. This may not be scalable.
    node.frontmatter.tags.forEach((tag) => {
      if(!taggedPosts[tag]) {
        taggedPosts[tag] = [{ node }];
      } else {
        taggedPosts[tag].push({ node });
      }
    });
  });

  // Loop through each tag map and create list pages for each
  for(let tag in taggedPosts) {
    createPage({
      path: `tag/${tag}`,
      component: path.resolve('./src/templates/post-list-page.js'),
      context: {
        tag: tag,
        posts: {
          edges: taggedPosts[tag],
        }
      }
    });    
  }
};