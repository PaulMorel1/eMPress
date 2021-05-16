import React from "react";
import "../styles/Global.css";
import * as PageLayoutStyles from "./PageLayout.module.css";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

export default function PageLayout(props) {
  return (
    <div className={PageLayoutStyles.pageContainer}>
      <PageHeader title={props.title} />
      <main>
        {props.children}
      </main>
      <PageFooter />      
    </div>
  );
}