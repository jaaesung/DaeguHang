import React, { useState } from "react";
import "./Popup.css";

const ClusterPopup = ({ selectedCluster, onClusterSelect, onNext }) => {
  const [localCluster, setLocalCluster] = useState(selectedCluster);

  const clusterOptions = [
    { id: "1", name: "Cluster 0", img: "/images/클러스터0.png" },
    { id: "2", name: "Cluster 1", img: "/images/클러스터1.png" },
    { id: "3", name: "Cluster 2", img: "/images/클러스터2.png" },
    { id: "4", name: "Cluster 3", img: "/images/클러스터3.png" },
  ];

  const handleClusterClick = (clusterId) => {
    setLocalCluster(clusterId);
  };

  const handleNext = () => {
    if (localCluster) {
      onClusterSelect(localCluster);
      onNext();
    }
  };

  return (
    <div className="popup popup-large">
      <h2 className="popup-title">클러스터를 선택하세요</h2>
      <div className="popup-cluster-grid">
        {clusterOptions.map((cluster) => (
          <div
            key={cluster.id}
            className={`popup-cluster-card ${
              localCluster === cluster.id ? "selected" : ""
            }`}
            onClick={() => handleClusterClick(cluster.id)}
          >
            <img
              src={cluster.img}
              alt={cluster.name}
              className="popup-cluster-image expanded" // 이미지 크기를 확장
            />
          </div>
        ))}
      </div>
      <button
        className="popup-next"
        onClick={handleNext}
        disabled={!localCluster} // 클러스터가 선택되지 않으면 비활성화
      >
        다음
      </button>
    </div>
  );
};

export default ClusterPopup;
