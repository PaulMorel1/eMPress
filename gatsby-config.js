module.exports = {
  siteMetadata: {
    title: "Empress Blog",
    description: "Gatsby blog starter for a low cost, full featured blog.",
    author: "Evan X. Merz",
    siteUrl: "https://www.empressblog.org",
    twitterHandle: "@EvanXMerz",
    theme: "light",
    empressPath: "", // change to /blog to host your blog at /blog
    header: {
      type: "normal", // change this to "hero" to use the hero banner header
      desktopHeroImage: "david-clode-13PjNBaDMcg-unsplash.jpg",
      mobileHeroImage: "david-clode-13PjNBaDMcg-unsplash.jpg",
    }
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              include: ["featured"],
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: { maxWidth: 1024 },
          }
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/posts`,
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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "authors",
        path: `${__dirname}/content/authors`,
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-MXFPMHX87J", // Google Analytics Measurement ID. Replace this one with your own.
        ],
      },
    },
  ],
};
