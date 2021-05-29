import * as React from "react"
import Helmet from 'react-helmet';

// This creates an html redirect, which is worse than a 301 redirect,
// but better than a js redirect.
const RedirectPage = ({ pageContext }) => {
  let metaTags = [
    {
      "http-equiv": "refresh",
      content: `0;url=${pageContext.to}`,
    }
  ];

  if(!pageContext.allowIndexing) {
    metaTags.push({
      "name": "robots",
      content: "noindex",
    });
  }

  return (
    <Helmet
      meta={metaTags}
    />
  )
};

export default RedirectPage;
