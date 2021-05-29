const path = require("path");
const makeSlug = require("../makeSlug.js");

// This makes the pages defined in content\pages
const makePages = ({ createPage, pages }) => {
  if(!pages || !createPage) {
    return null;
  }

  // loop through each page and create the pages
  pages.edges.forEach(({ node }) => {
    createPage({
      path: `/${makeSlug(node.frontmatter.slug)}`,
      component: path.resolve('./src/templates/blog-page.js'),
      context: {
        slug: node.frontmatter.slug,
      }
    });
  });
};

module.exports = makePages;
