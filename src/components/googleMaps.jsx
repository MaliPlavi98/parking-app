"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyBXnq-LAt-7AHWU8vprqMGXreqPqPMu07s",
      version: "weekly",
    });

    loader.load().then((google) => {
      const center = { lat: 43.3045808, lng: 17.0141438 };

      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 18,
      });

      new google.maps.Marker({
        position: center,
        map,
        title: "Požara 2, Makarska",
      });
    });
  }, []);

  return (
    <div className="h-96 w-full rounded-xl shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default MapComponent;