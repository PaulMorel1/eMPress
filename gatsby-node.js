const path = require("path");
const makeSlug = require("./src/helpers/makeSlug.js");
const makePages = require("./src/helpers/gatsby-node/makePages.js");
const makeTagListPages = require("./src/helpers/gatsby-node/makeTagListPages.js");
const makeAuthorListPages = require("./src/helpers/gatsby-node/makeAuthorListPages.js");
const makePaginatedIndex = require("./src/helpers/gatsby-node/makePaginatedIndex.js");

/**
 * Add a field to each markdown file to indicate which 
 * collection it belongs to. Posts or pages or something else?
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
              redirects
            }
            excerpt
          }
        }
      }
      posts: allMarkdownRemark(
        sort: { 
          fields: [frontmatter___pinned, frontmatter___date], 
          order: [ASC, DESC] 
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
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
              author
              slug
              tags
              redirects
              pinned
            }
            html
            excerpt
          }
        }
      }
    }
  `);

  makePages({ createPage, pages: result.data.pages });

  // These lists will be used for list pages
  let taggedPosts = [];
  let authorPosts = [];

  // variables for pagination
  const postsPerPage = 5;

  // loop through each post and create the post pages
  result.data.posts.edges.forEach(({ node }) => {
    const postPath = `/post/${makeSlug(node.frontmatter.slug)}`;
    
    // make the page for the post itself
    createPage({
      path: postPath,
      component: path.resolve('./src/templates/blog-post-page.js'),
      context: {
        slug: node.frontmatter.slug,
      }
    });

    // make the pages that will be redirected to this post
    node.frontmatter.redirects?.forEach((url) => {
      createPage({
        path: `/${url}`,
        component: path.resolve('./src/templates/redirect-page.js'),
        context: {
          from: `/${url}`,
          to: postPath,
        }
      });
    });

    // Store each tag in a hash. This may not be scalable.
    node.frontmatter.tags?.forEach((tag) => {
      if(!taggedPosts[tag]) {
        taggedPosts[tag] = [{ node }];
      } else {
        taggedPosts[tag].push({ node });
      }
    });

    // store each post under the author name
    if(node.frontmatter.author) {
      if(!authorPosts[node.frontmatter.author]) {
        authorPosts[node.frontmatter.author] = [{ node }];
      } else {
        authorPosts[node.frontmatter.author].push({ node });
      }
    }

    // Store each pinned post in a tag list named "pinned"
    if(node.frontmatter.pinned) {
      if(!taggedPosts["pinned"]) {
        taggedPosts["pinned"] = [{ node }];
      } else {
        taggedPosts["pinned"].push({ node });
      }
    }
  });

  makePaginatedIndex({ createPage, posts: result.data.posts, postsPerPage });

  makeTagListPages({ createPage, taggedPosts, postsPerPage });

  makeAuthorListPages({ createPage, authorPosts, postsPerPage });
};
