import React from "react";
import { Link } from "gatsby";
import "../styles/Global.css";
import * as PageHeaderStyles from "./PageHeader.module.css";

export default function PageHeader(props) {
    // TODO: This should take all 'menu' pages as a prop and list them all
  return (
    <header className={['containerPadded', PageHeaderStyles.container].join(' ')}>
      <div>
        <Link to="/">
          <h3>{props.title}</h3>
        </Link>
      </div>
      <div>
        <ul className={PageHeaderStyles.navigationLinks}>
          <li className={PageHeaderStyles.navigationLink}><Link to="/">Home</Link></li>
          <li className={PageHeaderStyles.navigationLink}><Link to="/about-empress-blog-platform">About</Link></li>
        </ul>
      </div>
    </header>
  );
}