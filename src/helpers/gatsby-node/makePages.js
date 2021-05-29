const path = require("path");
const makeSlug = require("../makeSlug.js");

// This makes the pages defined in content\pages
const makePages = ({ createPage, pages }) => {
  if(!pages || !createPage) {
    return null;
  }

  // loop through each page and create the pages
  pages.edges.forEach(({ node }) => {
    const pagePath = `/${makeSlug(node.frontmatter.slug)}`;
    
    createPage({
      path: pagePath,
      component: path.resolve('./src/templates/blog-page.js'),
      context: {
        slug: node.frontmatter.slug,
      }
    });

    // make the redirects to this page
    if(node.frontmatter.redirects) {
      node.frontmatter.redirects.forEach((url) => {
        createPage({
          path: `/${url}`,
          component: path.resolve('./src/templates/redirect-page.js'),
          context: {
            from: `/${url}`,
            to: pagePath,
          }
        });
      });
    }
  });
};

module.exports = makePages;
