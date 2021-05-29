---
title: "About Empress Blog"
slug: "about-empress-blog"
redirects:
  - "about"
date: "2021-05-16"
author: "Evan X. Merz"
published: true
---

Empress is a Free Open Source blog based on Gatsby. It's a full featured extension of the code you write in the Gatsby tutorial. I've extended those patterns and added tags, authors, and all sorts of other blog features that I want for my own static blog.

Download the source code and get started at [https://github.com/PaulMorel1/eMPress](https://github.com/PaulMorel1/eMPress).

The name is supposed to mean a "Modern" or "Minimalist" take on WordPress (M-Press), but that's only because I started creating this when I was frustrated with WordPress. WordPress continues to rely on obsolete technology that was central to the web when it was created, such as FTP. So I started this project with the goal of creating a blog similar to WordPress but without any obsolete technology (as of 2021) interfering in the code.

About a week in, I realized that that goal was sort of misguided. I don't want a "modern WordPress"; I want a blog based on technologies that are familiar to me in 2021, regardless of what is in WordPress.

Maybe that difference is subtle, but here's the TLDR:

- Free and Open Source.
- Fully featured static blog.
- Minimalist. There is absolutely no bloat in the code nor in package.json. I've rigorously avoided adding any packages beyond the bare minimum. This means you can add whatever you want without worrying about broken dependency graphs which have prevented me from using other similar projects.
- No reliance on tools from the 1990s. No FTP. No PHP.
- Can be hosted for as cheap as possible on AWS. Most of the time hosting this will be free. I don't think it's possible to host a blog more cheaply.
- Can be automatically deployed using GitHub Actions.

## Who is Empress for?

Tech-savvy bloggers. If you know a little bit about AWS, then it's time to stop paying the markup charged by hosting companies such as Netlify. Use Empress to run a fast static blog as cheaply as possible.