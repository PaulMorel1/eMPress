import React from "react";

import "../styles/Global.css";
import * as PageLayoutStyles from "./PageLayout.module.css";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import Seo from "./Seo";

export default function PageLayout(props) {
  return (
    <div className={PageLayoutStyles.outerContainer}>
      <Seo {...props.seo} />
      <PageHeader />
      <div className='contentContainer'>
        <main>
          {props.children}
        </main>
      </div>
      <PageFooter />
    </div>
  );
}