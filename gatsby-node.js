const fs = require("fs");

const makeSlug = require("./src/helpers/makeSlug.js");
const makePages = require("./src/helpers/gatsby-node/makePages.js");
const makeTagListPages = require("./src/helpers/gatsby-node/makeTagListPages.js");
const makeAuthorListPages = require("./src/helpers/gatsby-node/makeAuthorListPages.js");
const makePaginatedIndex = require("./src/helpers/gatsby-node/makePaginatedIndex.js");

// Ensure that the required directories exist
exports.onPreBootstrap = ({ reporter }) => {
  const requiredPaths = ["content", "content/authors", "content/posts", "content/pages", "content/menus", "content/images", "static", "static/images"];

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
      header: SiteSiteMetadataHeader
      empressPath: String
    }

    type SiteSiteMetadataHeader {
      type: String
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

  // if the node is of type MarkdownRemark...
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
      site {
        siteMetadata {
          empressPath
        }
      }
      empressPages: allMarkdownRemark(
        filter: { 
          frontmatter: {
            published: {eq: true} 
          }, 
          fields: { 
            collection: {eq: "pages"}
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
              featuredImage {
                publicURL
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            excerpt
          }
        }
      }
      empressPosts: allMarkdownRemark(
        sort: { 
          fields: [frontmatter___date, frontmatter___pinned], 
          order: [DESC, DESC] 
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
              featuredImage {
                publicURL
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            html
            excerpt
          }
        }
      }
      empressAuthors: allMarkdownRemark(
        filter: { 
          fields: { collection: {eq: "authors"} }
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              featuredImage {
                publicURL
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            excerpt
            html
          }
        }
      }
    }
  `);

  if(result.data.empressPosts.edges.length === 0) {
    console.error("No posts found!");
  }

  let empressPath = "";
  if(result.data.site && result.data.site.siteMetadata && result.data.site.siteMetadata.empressPath) {
    empressPath = result.data.site.siteMetadata.empressPath;
  }

  // These lists will be used for making various pages
  let taggedPosts = [];
  let authorPosts = [];
  let authors = {};

  // variables for pagination
  const postsPerPage = 5;

  console.log(`Making ${result.data.empressPosts.edges.length} posts...`);

  // loop through each author and store the author data in a hash
  result.data.empressAuthors.edges.forEach(({ node }) => {
    authors[node.frontmatter.slug] = node;
  });

  // loop through each post and create the post pages
  result.data.empressPosts.edges.forEach(({ node }) => {
    const postPath = `${empressPath}/post/${makeSlug(node.frontmatter.slug)}`;
    
    // make the page for the post itself
    createPage({
      path: postPath,
      component: require.resolve('./src/templates/blog-post-page.js'),
      context: {
        slug: node.frontmatter.slug,
        author: authors[makeSlug(node.frontmatter.author)]
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
        const tagKey = tag.toLowerCase();

        if(!taggedPosts[tagKey] || !taggedPosts[tagKey].push) {
          taggedPosts[tagKey] = [{ node }];
        } else {
          taggedPosts[tagKey].push({ node });
        }
      });
    }

    // store each post under the author name
    if(node.frontmatter.author) {
      const authorSlug = makeSlug(node.frontmatter.author);
      if(!authorPosts[authorSlug]) {
        authorPosts[authorSlug] = [{ node }];
      } else {
        authorPosts[authorSlug].push({ node });
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

  console.log(`Making ${result.data.empressPages.edges.length} pages...`);

  makePages({ 
    createPage, 
    templatePath: require.resolve('./src/templates/blog-page.js'), 
    redirectTemplatePath: require.resolve('./src/templates/redirect-page.js'), 
    pages: result.data.empressPages,
    empressPath: empressPath
  });

  console.log(`Paginating the home page to ${Math.ceil(result.data.empressPosts.edges.length / postsPerPage)} pages...`);

  makePaginatedIndex({ 
    createPage, 
    templatePath: require.resolve('./src/templates/post-list-page.js'),
    posts: result.data.empressPosts, 
    postsPerPage,
    empressPath: empressPath
  });

  console.log(`Making ${taggedPosts.length} tag list pages...`);

  makeTagListPages({ 
    createPage, 
    templatePath: require.resolve('./src/templates/post-list-page.js'),
    taggedPosts, 
    postsPerPage,
    empressPath: empressPath
  });

  console.log(`Making ${authorPosts.length} author list pages...`);

  makeAuthorListPages({ 
    createPage, 
    templatePath: require.resolve('./src/templates/post-list-page.js'),
    authorPosts, 
    postsPerPage,
    empressPath,
    authors,
  });
};
