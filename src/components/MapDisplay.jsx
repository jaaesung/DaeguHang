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

        // Create a custom marker with dynamic size and color
        const marker = new window.naver.maps.Marker({
          position,
          map: map,
          icon: {
            content: `
              <div style="
                background-color: ${
                  hoveredItemIndex === index ? "#ff5c5c" : "#5c85ff"
                };
                color: white;
                font-size: ${hoveredItemIndex === index ? "18px" : "12px"};
                font-weight: bold;
                width: ${hoveredItemIndex === index ? "70px" : "40px"};
                height: ${hoveredItemIndex === index ? "70px" : "40px"};
                line-height: ${hoveredItemIndex === index ? "70px" : "40px"};
                text-align: center;
                border-radius: 50%;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                transform: translate(-50%, -50%);
              ">
                ${index + 1}
              </div>
            `,
            anchor: new window.naver.maps.Point(20, 20),
          },
        });

        // Extend map bounds
        bounds.extend(position);

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
