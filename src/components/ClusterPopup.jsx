import React, { useState } from "react";
import "./Popup.css";

const ClusterPopup = ({ selectedCluster, onClusterSelect, onNext }) => {
  const [localCluster, setLocalCluster] = useState(selectedCluster);

  const handleSelectCluster = (cluster) => setLocalCluster(cluster);

  const clusterOptions = [
    { id: "1", name: "Cluster 1", img: "cluster1.png" },
    { id: "2", name: "Cluster 2", img: "cluster2.png" },
    { id: "3", name: "Cluster 3", img: "cluster3.png" },
    { id: "4", name: "Cluster 4", img: "cluster4.png" },
  ];

  return (
    <div className="popup">
      <h2 className="popup-title">클러스터 선택</h2>

      <div className="popup-cluster-grid">
        {clusterOptions.map((cluster) => (
          <button
            key={cluster.id}
            onClick={() => handleSelectCluster(cluster.id)}
            className={`popup-cluster-button ${localCluster === cluster.id ? "selected" : ""}`}
          >
            <img src={cluster.img} alt={cluster.name} />
            <span>{cluster.name}</span>
          </button>
        ))}
      </div>

      <button
        className="popup-next"
        onClick={() => {
          onClusterSelect(localCluster);
          onNext();
        }}
        disabled={!localCluster} // 클러스터가 선택되지 않으면 비활성화
      >
        다음
      </button>
    </div>
  );
};

export default ClusterPopup;
