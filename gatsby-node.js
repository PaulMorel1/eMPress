const fs = require("fs");

const makeSlug = require("./src/helpers/makeSlug.js");
const makePages = require("./src/helpers/gatsby-node/makePages.js");
const makeTagListPages = require("./src/helpers/gatsby-node/makeTagListPages.js");
const makeAuthorListPages = require("./src/helpers/gatsby-node/makeAuthorListPages.js");
const makePaginatedIndex = require("./src/helpers/gatsby-node/makePaginatedIndex.js");

// Ensure that the required directories exist
exports.onPreBootstrap = ({ reporter }) => {
  const requiredPaths = ["content", "content/posts", "content/pages", "content/menus", "static", "static/images"];

  requiredPaths.forEach(path => {
    if(!fs.existsSync(path)) {
      reporter.info(`creating directory ${path}...`);
      fs.mkdirSync(path);
    }
  });
};

// Set up schemas
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type SiteSiteMetadata implements Node {
      title: String!
      description: String
      author: String
      siteUrl: String
      twitterHandle: String
      theme: String
      headerType: String
      desktopHeroImage: String
      mobileHeroImage: String
    }
  `;

  createTypes(typeDefs);
}

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

  if(result.data.posts.edges.length === 0) {
    console.error("No posts found!");
  }

  // These lists will be used for list pages
  let taggedPosts = [];
  let authorPosts = [];

  // variables for pagination
  const postsPerPage = 5;

  console.log(`Making ${result.data.posts.edges.length} posts...`);

  // loop through each post and create the post pages
  result.data.posts.edges.forEach(({ node }) => {
    const postPath = `/post/${makeSlug(node.frontmatter.slug)}`;
    
    // make the page for the post itself
    createPage({
      path: postPath,
      component: require.resolve('./src/templates/blog-post-page.js'),
      context: {
        slug: node.frontmatter.slug,
      }
    });

    // make the pages that will be redirected to this post
    if(node.frontmatter.redirects) {
      node.frontmatter.redirects.forEach((url) => {
        createPage({
          path: `/${url}`,
          component: require.resolve('./src/templates/redirect-page.js'),
          context: {
            from: `/${url}`,
            to: postPath,
          }
        });
      });
    }

    // Store each tag in a hash. This may not be scalable.
    if(node.frontmatter.tags) {
      node.frontmatter.tags.forEach((tag) => {
        if(!taggedPosts[tag]) {
          taggedPosts[tag] = [{ node }];
        } else {
          taggedPosts[tag].push({ node });
        }
      });
    }

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

  console.log(`Making ${result.data.pages.edges.length} pages...`);

  makePages({ 
    createPage, 
    templatePath: require.resolve('./src/templates/blog-page.js'), 
    redirectTemplatePath: require.resolve('./src/templates/redirect-page.js'), 
    pages: result.data.pages
  });

  console.log(`Paginating the home page to ${result.data.posts.edges.length / postsPerPage} pages...`);

  makePaginatedIndex({ 
    createPage, 
    templatePath: require.resolve('./src/templates/post-list-page.js'),
    posts: result.data.posts, 
    postsPerPage
  });

  console.log(`Making ${taggedPosts.length} tag list pages...`);

  makeTagListPages({ 
    createPage, 
    templatePath: require.resolve('./src/templates/post-list-page.js'),
    taggedPosts, 
    postsPerPage
  });

  console.log(`Making ${authorPosts.length} author list pages...`);

  makeAuthorListPages({ 
    createPage, 
    templatePath: require.resolve('./src/templates/post-list-page.js'),
    authorPosts, 
    postsPerPage
  });
};
