import React from "react";
import "./DetailPage.css";
import Sidebar from "../../../components/detail/component/sidebar/Sidebar";
import Recommendation from "../../../components/detail/component/recommendation/Recommendation";
import MainContent from "../../../components/detail/component/content/MainContent";
import Information from "../../../components/detail/component/information/Information";

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
