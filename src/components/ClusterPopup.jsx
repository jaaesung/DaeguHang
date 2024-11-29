import React, { useState } from "react";
import "./Popup.css";

const ClusterPopup = ({ selectedCluster, onClusterSelect, onNext }) => {
  const [localCluster, setLocalCluster] = useState(selectedCluster);

  const clusterOptions = [
    { id: "1", name: "Cluster 1", img: "https://via.placeholder.com/150?text=Cluster+1" },
    { id: "2", name: "Cluster 2", img: "https://via.placeholder.com/150?text=Cluster+2" },
    { id: "3", name: "Cluster 3", img: "https://via.placeholder.com/150?text=Cluster+3" },
    { id: "4", name: "Cluster 4", img: "https://via.placeholder.com/150?text=Cluster+4" },
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
    <div className="popup">
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
              className="popup-cluster-image"
            />
            <p className="popup-cluster-label">{cluster.name}</p>
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
