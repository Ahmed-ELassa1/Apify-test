import React from "react";
import "./LoadingCard.css";
import { Skeleton } from "antd";
function LoadingCard() {
  return (
    <div className="product-loading-card-container">
      <Skeleton
        active
        avatar={{
          shape: "square",
          size: "large",
          className: "product-skeleton-avatar",
        }}
        title={{ width: "100%" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "10px",
          gap: "8px",
        }}
        paragraph={{ rows: 3 }}
      />
    </div>
  );
}

export default LoadingCard;
