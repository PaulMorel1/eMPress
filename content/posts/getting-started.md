---
title: "Getting Started"
slug: "getting-started"
date: "2021-05-24"
author: "Evan X. Merz"
tags: 
  - tutorial
  - Introduction
published: true
---

This post will walk you through the process of setting up your blog for the first time. This may take a little work, but at the end you will have a blazing fast blog that you can host for as close to free as possible.

1. Sign up for [GitHub](https://www.github.com). You don't actually need to use GitHub unless you want to use the included GitHub Actions deployment.
2. Fork the repository at [https://github.com/PaulMorel1/eMPress](https://github.com/PaulMorel1/eMPress). This makes your own copy of it.
3. Sign up for AWS.
4. [Set up an S3 bucket for your site](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html). The key thing about the setup process is to make the bucket public and set it up for website hosting.
5. Set up a CloudFront distribution for your S3 bucket.
6. Set up a new IAM user in AWS that will be used to upload to S3. Give it full control of your S3 bucket. Get the access key id and secret and set your repository secrets on GitHub that are needed for the action to run successfully.
7. Download SourceTree or another git client and set up your git project locally.
8. Download a markdown editor and write a post. Save it into the content/posts folder of your project.
9. Commit the new post and push it to GitHub.