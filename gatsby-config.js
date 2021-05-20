module.exports = {
  siteMetadata: {
    title: "Empress Blog",
    description: "Gatsby blog starter for a low cost, full featured blog.",
    author: "Evan X. Merz",
    siteUrl: "https://www.empress.blog",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/posts/`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/content/pages/`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "menus",
        path: `${__dirname}/content/menus/`,
      }
    },
  ],
};
