import * as React from "react"
import { Link } from "gatsby";

import PageLayout from "../components/PageLayout";
import PostList from "../components/PostList";

const PostListPage = ({ data, classes , pageContext}) => {
  return (
    <PageLayout>
      {pageContext.title && <h2>{pageContext.title}</h2>}
      <PostList posts={pageContext.posts} fullText={pageContext.fullText} />
      {pageContext.previousPage &&
        <Link to={pageContext.previousPage}>Previous</Link>
      }
      {pageContext.nextPage &&
        <Link to={pageContext.nextPage}>Next</Link>
      }
    </PageLayout>
  )
}

export default PostListPage
