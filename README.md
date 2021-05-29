# Empress

Full featured Gatsby blog starter that allows you to run a fast static blog as cheaply as possible.

Created by Evan X. Merz.

## About

This is essentially a feature complete static blog starter based on the Gatsby tutorial. So if you finished the Gatsby tutorial and you think Gatsby is great, but you don't want to waste time re-inventing basic features like tags, then this might be the right starter for you.

The goal is a blog for the 21st century that has all the core features of a static blog, without any bloat.

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

## Features

Empress is a fully featured Gatsby blog starter.

- Tags
- Menus
- Themes
- Pinned posts
- Deployment to AWS (S3/CloudFront)
- Redirects
- TODO: Google Analytics

## Development

It's a minimalist gatsby project, so you can run it using the same npm commands you'd use to run any Node.js project.

```
npm install
npm run dev
```

## Build

```
npm run build
```

## Deploy on AWS using GitHub Actions

If you are using the built-in GitHub Actions integration, then just commit your new stuff and push to master on GitHub. Make sure you go through the setup on AWS and GitHub. You must create a public S3 bucket and a CloudFront distribution then save secret keys into your repo settings on GitHub.

## Deploy using Gatsby Cloud

Deploy this starter with one click on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/):

[<img src="https://www.gatsbyjs.com/deploynow.svg" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/PaulMorel1/eMPress)


## License

CC BY-NC 3.0: https://creativecommons.org/licenses/by-nc/3.0/