import React, { useState } from "react";
import "./Popup.css";

const ClusterPopup = ({ onClusterSelect, onNext }) => {
  const clusters = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/150?text=Cluster+1",
      label: "클러스터 1",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/150?text=Cluster+2",
      label: "클러스터 2",
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/150?text=Cluster+3",
      label: "클러스터 3",
    },
    {
      id: 4,
      imageUrl: "https://via.placeholder.com/150?text=Cluster+4",
      label: "클러스터 4",
    },
  ];

  const [selectedCluster, setSelectedCluster] = useState(null);

  const handleClusterClick = (clusterId) => {
    setSelectedCluster(clusterId);
  };

  const handleNext = () => {
    if (selectedCluster !== null) {
      onClusterSelect(selectedCluster);
      onNext();
    }
  };

  return (
    <div className="popup">
      <h2 className="popup-title">클러스터를 선택하세요</h2>
      <div className="popup-cluster-grid">
        {clusters.map((cluster) => (
          <div
            key={cluster.id}
            className={`popup-cluster-card ${
              selectedCluster === cluster.id ? "selected" : ""
            }`}
            onClick={() => handleClusterClick(cluster.id)}
          >
            <img
              src={cluster.imageUrl}
              alt={cluster.label}
              className="popup-cluster-image"
            />
            <p className="popup-cluster-label">{cluster.label}</p>
          </div>
        ))}
      </div>
      <button
        className="popup-next"
        onClick={handleNext}
        disabled={selectedCluster === null}
      >
        다음
      </button>
    </div>
  );
};

export default ClusterPopup;
