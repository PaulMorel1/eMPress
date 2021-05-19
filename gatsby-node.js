const path = require("path");

/**
 * Add a field to each markdown file to indicate which 
 * collection it belongs to. Posts or pages?
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
            }
            excerpt
          }
        }
      }
      posts: allMarkdownRemark(
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
            }
            excerpt
          }
        }
      }
    }
  `);

  // loop through each page and create the pages
  result.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve('./src/templates/blog-page.js'),
      context: {
        slug: node.frontmatter.slug,
      }
    });
  });

  // These lists will be used for list pages
  let taggedPosts = [];
  let authorPosts = [];

  // loop through each post and create the posts
  result.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: `/post/${node.frontmatter.slug}`,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.frontmatter.slug,
      }
    });

    // Store each tag in a hash. This may not be scalable.
    node.frontmatter.tags.forEach((tag) => {
      if(!taggedPosts[tag]) {
        taggedPosts[tag] = [{ node }];
      } else {
        taggedPosts[tag].push({ node });
      }
    });

    // store each post under the author name
    if(!authorPosts[node.frontmatter.author]) {
      authorPosts[node.frontmatter.author] = [{ node }];
    } else {
      authorPosts[node.frontmatter.author].push({ node });
    }
  });

  // variables for pagination
  let postsPerPage = 5;

  // Loop through each tag map and create list pages for each
  for(let tag in taggedPosts) {
    let totalPosts = taggedPosts[tag].length;
    const numPages = Math.max(Math.ceil(totalPosts / postsPerPage), 1)

    // paginate the posts for this tag
    for(let i = 0; i < numPages; i++) {
      const currentPage = i + 1

      createPage({
        path: i === 0 ? `/tag/${tag}` : `/tag/${tag}/${currentPage}`,
        component: path.resolve('./src/templates/post-list-page.js'),
        context: {
          title: `Posts Tagged "${tag}"`,
          posts: {
            edges: taggedPosts[tag].slice(i * postsPerPage, (i+1) * postsPerPage),
          },
          nextPage: i < numPages - 1 ? `/tag/${tag}/${currentPage + 1}` : null,
          previousPage: i > 1 ? `/tag/${tag}/${currentPage - 1}` : (i === 1 ? `/tag/${tag}` : null),
        }
      });
    }

  }

  // Loop through each author map and create list pages for each
  for(let author in authorPosts) {
    createPage({
      path: `/author/${encodeURI(author)}`,
      component: path.resolve('./src/templates/post-list-page.js'),
      context: {
        title: `Posts Written by "${author}"`,
        posts: {
          edges: authorPosts[author],
        }
      }
    });    
  }
};