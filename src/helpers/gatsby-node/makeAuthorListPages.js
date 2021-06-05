const path = require("path");
const makeSlug = require("../makeSlug.js");

// Loop through each author map and create list pages for each
const makeAuthorListPages = ({ createPage, templatePath, authorPosts, postsPerPage = 5 }) => {
  for(let author in authorPosts) {
    let totalPosts = authorPosts[author].length;
    const numPages = Math.max(Math.ceil(totalPosts / postsPerPage), 1);
    const slug = makeSlug(author);

    // paginate the posts for this author
    for(let i = 0; i < numPages; i++) {
      const currentPage = i + 1
      const pathPrefix = `/author/${slug}`;

      createPage({
        path: i === 0 ? pathPrefix : `${pathPrefix}/${currentPage}`,
        component: templatePath,
        context: {
          title: `Posts Written by "${author}"`,
          posts: {
            edges: authorPosts[author].slice(i * postsPerPage, (i + 1) * postsPerPage),
          },
          nextPage: i < numPages - 1 ? `${pathPrefix}/${currentPage + 1}` : null,
          previousPage: i > 1 ? `${pathPrefix}/${currentPage - 1}` : (i === 1 ? pathPrefix : null),
          fullText: false,
        }
      });
    }   
  }
};

module.exports = makeAuthorListPages;
