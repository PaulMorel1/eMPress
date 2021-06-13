import * as React from "react"
import { graphql } from "gatsby";

import PageLayout from "../components/PageLayout";
import BlogPost from "../components/BlogPost";

const BlogPostPage = ({ data }) => {
  const post = data.post;
  const seoDetails = {
    title: post.frontmatter.title,
    description: post.excerpt,
  };

  let empressPath = "";
  if(data.site?.siteMetadata?.empressPath) {
    empressPath = data.site.siteMetadata.empressPath;
  }

  return (
    <PageLayout seo={seoDetails}>
      <BlogPost post={post} fullText={true} empressPath={empressPath} />
    </PageLayout>
  )
};

export default BlogPostPage;

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        empressPath
      }
    }
    post: markdownRemark(
      frontmatter: {
        published: {eq: true}
        slug: { eq: $slug }
      }
    ) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        author
        tags
        slug
        pinned
      }
    }
  }
`;