import React, { useState, useEffect } from "react";
import "./Information.css";
import detailData from "../../../../assets/data/detail/index.json";

const Information: React.FC = () => {
  const [activeTab, setActiveTab] = useState("detail");
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    // Load the detail data from the JSON file
    const detailInfo = detailData.data.find((item) => item.id === "1");
    setDetail(detailInfo);
  }, []);

  return (
    <div className="information">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "detail" ? "active" : ""}`}
          onClick={() => setActiveTab("detail")}
        >
          Thông tin chi tiết
        </button>
        <button
          className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          Bình luận
        </button>
      </div>

      {activeTab === "detail" && detail && (
        <div className="tab-content">
          <div dangerouslySetInnerHTML={{ __html: detail.html }} />
        </div>
      )}

      {activeTab === "comments" && (
        <div className="tab-content">
          <h2>Bình luận</h2>
          <p>Chưa có bình luận nào cho sản phẩm này.</p>
        </div>
      )}
    </div>
  );
};

export default Information;
