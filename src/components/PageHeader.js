import React from "react";
import { Link } from "gatsby";
import "../styles/Global.css";
import * as PageHeaderStyles from "./PageHeader.module.css";

export default function PageHeader() {
  return (
    <header className={['containerPadded', PageHeaderStyles.container].join(' ')}>
      <div>
        <Link to="/">
          <h3>eMPress Blog</h3>
        </Link>
      </div>
      <div>
        <ul className={PageHeaderStyles.navigationLinks}>
          <li className={PageHeaderStyles.navigationLink}><Link to="/">Home</Link></li>
          <li className={PageHeaderStyles.navigationLink}><Link to="/about">About</Link></li>
        </ul>
      </div>
    </header>
  );
}