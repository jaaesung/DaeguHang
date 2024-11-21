import React, { useEffect } from "react";

const MapDisplay = ({ scheduleItems }) => {
  useEffect(() => {
    if (typeof window.naver !== "undefined") {
      const mapOptions = {
        center: new window.naver.maps.LatLng(
          35.85349263951054,
          128.56529586628727
        ),
        zoom: 12,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      if (window.markers) {
        window.markers.forEach((marker) => marker.setMap(null));
      }

      const bounds = new window.naver.maps.LatLngBounds();
      window.markers = scheduleItems.map((item) => {
        const position = new window.naver.maps.LatLng(
          item.latitude,
          item.longitude
        );
        const marker = new window.naver.maps.Marker({
          position,
          map: map,
          title: item.name,
        });

        bounds.extend(position);
        return marker;
      });

      if (scheduleItems.length > 0) {
        map.fitBounds(bounds);
      } else {
        map.setCenter(new window.naver.maps.LatLng(37.5665, 126.978));
        map.setZoom(12);
      }
    }
  }, [scheduleItems]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default MapDisplay;
