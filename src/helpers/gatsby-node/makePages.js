const path = require("path");
const makeSlug = require("../makeSlug.js");

// This makes the pages defined in content\pages
const makePages = ({ createPage, templatePath, redirectTemplatePath, pages }) => {
  if(!pages || !createPage) {
    return null;
  }

  // loop through each page and create the pages
  pages.edges.forEach(({ node }) => {
    const pagePath = `/${makeSlug(node.frontmatter.slug)}`;
    
    createPage({
      path: pagePath,
      component: templatePath,
      context: {
        slug: node.frontmatter.slug,
      }
    });

    // make the redirects to this page
    if(node.frontmatter.redirects) {
      node.frontmatter.redirects.forEach((url) => {
        createPage({
          path: `/${url}`,
          component: redirectTemplatePath,
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
