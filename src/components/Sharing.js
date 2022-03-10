import React from "react";
import * as SharingStyles from "./Sharing.module.css";

export default function Sharing() {
  /*
    This uses the clipboard.writeText API, which is supported by the latest version
    of most browsers, but not older versions.

    See https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
  */
  const handleCopyClick = (e) => {
    navigator.clipboard.writeText(window.location.href).then(function() {
      console.log(`Copied ${window.location.href}!`);
    }, function() {
      console.error(`Unable to copy to clipboard!`);
    });
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const handleTweetClick = (e) => {
    window.open("https://twitter.com/share?url="+encodeURIComponent(window.location.href));

    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div className={SharingStyles.shareContainer}>
      <span className={SharingStyles.shareTitle}>
        Share: 
      </span>
      <a href="#" onClick={handleCopyClick}>
        <img 
          src="/images/copy.webp"
          className={SharingStyles.shareIcon}
          />
      </a>
      <a href="#" onClick={handleTweetClick}>
        <img 
          src="/images/twitter.webp"
          className={SharingStyles.shareIcon}
          />
      </a>
    </div>
  );
}
