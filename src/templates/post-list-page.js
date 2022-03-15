import * as React from "react"
import { Link } from "gatsby";

import PageLayout from "../components/PageLayout";
import PostList from "../components/PostList";
import Author from "../components/Author.js";
import { navigationLink } from "../components/PageFooter.module.css";

const PostListPage = ({ pageContext }) => {
  const seoDetails = {
    title: pageContext.title,
  };

  return (
    <PageLayout seo={seoDetails}>
      {pageContext.author && 
        <Author author={pageContext.author} empressPath={pageContext.empressPath} />
      }
      {pageContext.title && <h2>{pageContext.title}</h2>}
      <PostList posts={pageContext.posts} fullText={pageContext.fullText} empressPath={pageContext.empressPath} />
      {pageContext.previousPage &&
        <Link to={pageContext.previousPage} className={navigationLink}>Previous</Link>
      }
      {pageContext.nextPage &&
        <Link to={pageContext.nextPage} className={navigationLink}>Next</Link>
      }
    </PageLayout>
  )
}

export default PostListPage
