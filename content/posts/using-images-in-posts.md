---
title: "Using Images in Posts"
slug: "using-images-in-posts"
date: "2021-05-22"
author: "Evan X. Merz"
published: true
featuredImage: ../images/butterfly-david-clode-unsplash.jpg
tags: 
  - images
  - markdown
  - tutorial
  - help
---

There are two ways to add images to posts in Empress. One way is to add a featuredImage to your post. To do so, simply enter the path to the image in the featuredImage field on a post.

```
featuredImage: ../images/butterfly-david-clode-unsplash.jpg
```

The featuredImage appears above the text of a post.

Using images within posts on a Gatsby blog can be a bit confusing if you are coming from a system such as WordPress. In Empress, you must save your images into "/static/images" within your project.

To use an image in the post, you use standard image markdown: 

```
![Monarch butterfly](../../images/david-clode-13PjNBaDMcg-unsplash.jpg)
```

![Monarch butterfly](../../images/david-clode-13PjNBaDMcg-unsplash.jpg)

