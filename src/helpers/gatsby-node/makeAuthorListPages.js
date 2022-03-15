const path = require("path");
const makeSlug = require("../makeSlug.js");

// Loop through each author map and create list pages for each
const makeAuthorListPages = ({ createPage, templatePath, authorPosts, authors, postsPerPage = 5, empressPath = "" }) => {
  for(let authorName in authorPosts) {
    const slug = makeSlug(authorName);
    const author = authors[slug];
    let totalPosts = authorPosts[slug].length;
    const numPages = Math.max(Math.ceil(totalPosts / postsPerPage), 1);


    // paginate the posts for this author
    for(let i = 0; i < numPages; i++) {
      const currentPage = i + 1
      const pathPrefix = `${empressPath}/author/${slug}`;

      createPage({
        path: i === 0 ? pathPrefix : `${pathPrefix}/${currentPage}`,
        component: templatePath,
        context: {
          title: `Posts Written by "${authorName}"`,
          posts: {
            edges: authorPosts[slug].slice(i * postsPerPage, (i + 1) * postsPerPage),
          },
          nextPage: i < numPages - 1 ? `${pathPrefix}/${currentPage + 1}` : null,
          previousPage: i > 1 ? `${pathPrefix}/${currentPage - 1}` : (i === 1 ? pathPrefix : null),
          fullText: false,
          empressPath: empressPath,
          author: author,
        }
      });
    }   
  }
};

module.exports = makeAuthorListPages;
