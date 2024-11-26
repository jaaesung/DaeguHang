import React, { useEffect } from "react";

const MapDisplay = ({ scheduleItems, hoveredItemIndex }) => {
  useEffect(() => {
    if (typeof window.naver !== "undefined") {
      const mapOptions = {
        center: new window.naver.maps.LatLng(35.87, 128.59),
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
      window.markers = scheduleItems.map((item, index) => {
        const position = new window.naver.maps.LatLng(
          item.latitude,
          item.longitude
        );
        const marker = new window.naver.maps.Marker({
          position,
          map: map,
          title: item.name,
          icon: {
            url:
              hoveredItemIndex === index
                ? "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png"
                : "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
            size: new window.naver.maps.Size(
              hoveredItemIndex === index ? 40 : 20,
              hoveredItemIndex === index ? 40 : 20
            ),
            scaledSize: new window.naver.maps.Size(
              hoveredItemIndex === index ? 40 : 20,
              hoveredItemIndex === index ? 40 : 20
            ),
          },
        });

        // Extend map bounds
        bounds.extend(position);

        // Attach click event to navigate to the provided URL
        window.naver.maps.Event.addListener(marker, "click", () => {
          if (item.searchUrl) {
            console.log("Navigating to URL:", item.searchUrl);
            window.open(item.searchUrl, "_blank"); // Open the provided URL in a new tab
          } else {
            console.error("Search URL is missing for:", item);
            alert("이 장소의 검색 URL이 제공되지 않았습니다.");
          }
        });

        return marker;
      });

      // Adjust map to fit all markers or move to added marker
      if (scheduleItems.length > 0) {
        if (scheduleItems.length === 1) {
          map.setCenter(bounds.getCenter());
          map.setZoom(Math.max(10, mapOptions.zoom));
        } else {
          map.fitBounds(bounds);
        }
      } else {
        map.setCenter(new window.naver.maps.LatLng(35.87, 128.59));
        map.setZoom(13);
      }
    }
  }, [scheduleItems, hoveredItemIndex]);

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
