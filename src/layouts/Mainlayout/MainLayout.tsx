import React from "react";
import styles from "./MainLayout.module.css";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </>
  );
};
