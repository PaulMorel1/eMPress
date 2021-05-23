import React from "react";

import "../styles/Global.css";
import * as PageLayoutStyles from "./PageLayout.module.css";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import Seo from "./Seo";

export default function PageLayout(props) {
  return (
    <div className={PageLayoutStyles.pageContainer}>
      <div className={PageLayoutStyles.innerContainer}>
        <Seo {...props.seo} />
        <PageHeader />
        <main>
          {props.children}
        </main>
        <PageFooter />
      </div>
    </div>
  );
}