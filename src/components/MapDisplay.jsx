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

      // Clear existing markers if any
      if (window.markers) {
        window.markers.forEach((marker) => marker.setMap(null));
      }

      // Create bounds for auto-fit
      const bounds = new window.naver.maps.LatLngBounds();

      // Add markers for each schedule item
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

        // Extend map bounds
        bounds.extend(position);

        // Attach click event to navigate to Naver Maps search
        window.naver.maps.Event.addListener(marker, "click", () => {
          const searchUrl = `https://map.naver.com/v5/search/${encodeURIComponent(
            item.name
          )}`;
          window.open(searchUrl, "_blank"); // Open the URL in a new tab
        });

        return marker;
      });

      // Adjust map to fit all markers
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
