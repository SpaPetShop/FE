import React from "react";
import "./DetailPage.css";
import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/content/MainContent";
import Recommendation from "./components/recommendation/Recommendation";
import Information from "./components/information/Information";

const DetailPage: React.FC = () => (
  <div className="detail-page">
    <Sidebar />
    <div className="main-content-area">
      <MainContent />
      <Information />
      <Recommendation />
    </div>
  </div>
);

export default DetailPage;
