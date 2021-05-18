import * as React from "react"

import PageLayout from "../components/PageLayout";
import PostList from "../components/PostList";

const PostListPage = ({ data, classes , pageContext}) => {
  return (
    <PageLayout>
      <PostList posts={pageContext.posts} />
    </PageLayout>
  )
}

export default PostListPage
