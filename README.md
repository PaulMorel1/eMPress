# Empress

## Description

Empress is a feature complete static blog starter based on the Gatsby tutorial. So if you finished the Gatsby tutorial and you think Gatsby is great, but you don't want to waste time re-inventing basic features like tags, then this might be the right starter for you.

The goal is a blog for the 21st century that has all the core features of a static blog, without any bloat.

### Features

Empress is a fully featured Gatsby blog starter.

- Tags
- Menus
- Themes
- Pinned posts
- Deployment to S3/CloudFront via GitHub Actions
- Redirects
- Hero banner
- Google Analytics
- BlogPosting schema tags (SEO)

### But why no SASS? Styled Components? Typography?

When I tried to set up a Gatsby blog using other starters,
I found that I couldn't upgrade to the latest version of
major dependencies, such as Gatsby, due to a broken web of
dependencies. For this reason I wanted to keep this blog
as vanilla as possible.

You can add any libraries that you like.

## Requirements

To use it out-of-the-box as a blog, you need
the following things.

- a free GitHub account
- a free AWS account
- knowledge of git and markdown

## How to install

Fork this repository. Pull to your local computer.

### Or try the theme

Gatsby now suggests that you use "themes" rather than starters. Empress is also available as a "theme" here: https://github.com/PaulMorel1/gatsby-theme-empress

## Development

It's a minimalist gatsby project, so you can run it using the same npm commands you'd use to run any Node.js project.

```
npm install
npm run dev
```

## Build

To test a production build locally, use the following commands.

```
npm run build
npm run serve
```

## Deploy on AWS using GitHub Actions

If you are using the built-in GitHub Actions integration, then just commit your new stuff and push to master on GitHub. Make sure you go through the setup on AWS and GitHub. You must create a public S3 bucket and a CloudFront distribution then save secret keys into your repo settings on GitHub.

### Deploy using Gatsby Cloud

Deploy this starter with one click on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/):

[<img src="https://www.gatsbyjs.com/deploynow.svg" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/PaulMorel1/eMPress)

## How do I make a new theme?

See `src\styles\themes\dark.css` for example.

1. Copy `dark.css` into a new file.
2. Update the css file. Add the new rules for your theme. The class name at the top is the name of your theme.
3. Modify `src\styles\themes\themes.js`. Add the import for your new theme.
4. Modify `gatsby-config.js`. Update `siteMetadata.theme` to match your new theme name. So if your theme name is `marks-dark-theme` then you should set theme to `marks-dark-theme`.

## How do I set the hero image?

1. Set `headerType` to `hero` in  `gatsby-config.js`.
2. Then set the fields `desktopHeroImage` and `mobileHeroImage` to the filenames of the images in `/static/images`.

## How do I configure Google Analytics?

1. Update the `trackingIds` field in `gatsby-config.js`. You must have signed up for Google Analytics already. Like everything else in an Empress Blog, it is free.

## Why not use yarn?

I'm trying for the fewest dependencies possible here. NPM is a requirement. Yarn would be an additional package. Add yarn to your own fork if you like.

## License

CC BY-NC 3.0: https://creativecommons.org/licenses/by-nc/3.0/