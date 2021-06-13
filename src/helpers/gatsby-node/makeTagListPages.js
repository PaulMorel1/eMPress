const path = require("path");
const makeSlug = require("../makeSlug.js");

// Loop through each tag map and create list pages for each
const makeTagListPages = ({ createPage, templatePath, taggedPosts, postsPerPage = 5, empressPath = "" }) => {
  for(let tag in taggedPosts) {
    let totalPosts = taggedPosts[tag].length;
    const numPages = Math.max(Math.ceil(totalPosts / postsPerPage), 1);
    const slug = makeSlug(tag);

    // paginate the posts for this tag
    for(let i = 0; i < numPages; i++) {
      const currentPage = i + 1

      createPage({
        path: i === 0 ? `${empressPath}/tag/${slug}` : `${empressPath}/tag/${slug}/${currentPage}`,
        component: templatePath,
        context: {
          title: `Posts Tagged "${slug}"`,
          posts: {
            edges: taggedPosts[tag].slice(i * postsPerPage, (i + 1) * postsPerPage),
          },
          nextPage: i < numPages - 1 ? `${empressPath}/tag/${slug}/${currentPage + 1}` : null,
          previousPage: i > 1 ? `${empressPath}/tag/${slug}/${currentPage - 1}` : (i === 1 ? `${empressPath}/tag/${slug}` : null),
          fullText: false,
          empressPath: empressPath,
        }
      });
    }
  }
};

module.exports = makeTagListPages;
