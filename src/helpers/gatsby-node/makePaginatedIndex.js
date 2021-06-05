const path = require("path");

// This method loops through each post and paginates them from the homepage in date order
const makePaginatedIndex = ({ createPage, templatePath, posts, postsPerPage = 5 }) => {
  // calculate the number of pages
  let allPosts = posts.edges;
  let totalPosts = allPosts.length;
  const numPages = Math.max(Math.ceil(totalPosts / postsPerPage), 1)

  // for each page, create a list page with the posts that belong on that page
  for(let i = 0; i < numPages; i++) {
    const currentPage = i + 1

    createPage({
      path: i === 0 ? `/` : `/posts/${currentPage}`,
      component: templatePath,
      context: {
        title: null,
        posts: {
          edges: allPosts.slice(i * postsPerPage, (i + 1) * postsPerPage),
        },
        nextPage: i < numPages - 1 ? `/posts/${currentPage + 1}` : null,
        previousPage: i > 1 ? `/posts/${currentPage - 1}` : (i === 1 ? `/` : null),
        fullText: true,
      }
    });
  }
};

module.exports = makePaginatedIndex;
