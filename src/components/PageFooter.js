import React from "react";
import { Link } from "gatsby";
import "../styles/Global.css";
import * as PageFooterStyles from "./PageFooter.module.css";

export default function PageHeader() {
  return (
    <footer className={['containerPadded', PageFooterStyles.container].join(' ')}>
      <ul className={PageFooterStyles.navigationLinks}>
        <li className={PageFooterStyles.navigationLink}>
          <Link to="/">Home</Link>
        </li>
        <li className={PageFooterStyles.navigationLink}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </footer>
  );
}