import React from "react";
import "../styles/Global.css";
import * as PageLayoutStyles from "./PageLayout.module.css";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

export default function PageLayout({ children }) {
  return (
    <div className={PageLayoutStyles.pageContainer}>
      <PageHeader />
      <main>
        {children}
      </main>
      <PageFooter />      
    </div>
  );
}