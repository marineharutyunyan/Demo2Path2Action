import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { venues } from "@/data/venues";
import { MAPBOX_CONFIG } from "@/lib/mapbox";

interface VenueMapProps {
  hoveredVenueId: number | null;
  onMarkerHover: (id: number | null) => void;
  language: "en" | "arm";
}

export const VenueMap = ({ hoveredVenueId, onMarkerHover, language }: VenueMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Map<number, mapboxgl.Marker>>(new Map());
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_CONFIG.publicToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [44.5, 40.18],
      zoom: 11.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {``
      venues.forEach((venue) => {
        const el = document.createElement("div");
        el.className = "venue-marker";
        el.dataset.venueId = String(venue.id);
        el.innerHTML = `
          <div class="marker-pin" style="
            width: 36px;
            height: 36px;
            background: hsl(var(--primary));
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            cursor: pointer;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-weight: bold;
              font-size: 14px;
            ">${venue.id}</span>
          </div>
        `;

        el.addEventListener("mouseenter", () => onMarkerHover(venue.id));
        el.addEventListener("mouseleave", () => onMarkerHover(null));

        const marker = new mapboxgl.Marker(el)
          .setLngLat(venue.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div style="padding: 8px;">
                <strong>${language === "en" ? venue.name : venue.nameArm}</strong>
                <p style="margin: 4px 0 0; font-size: 12px; color: #666;">
                  ${language === "en" ? venue.address : venue.addressArm}
                </p>
              </div>
            `)
          )
          .addTo(map.current!);

        markers.current.set(venue.id, marker);
      });

      setIsMapReady(true);
    });

    return () => {
      map.current?.remove();
    };
  }, [language, onMarkerHover]);

  useEffect(() => {
    if (!isMapReady) return;

    markers.current.forEach((marker, id) => {
      const el = marker.getElement();
      const pin = el.querySelector(".marker-pin") as HTMLElement;
      if (pin) {
        if (id === hoveredVenueId) {
          pin.style.transform = "rotate(-45deg) scale(1.3)";
          pin.style.background = "hsl(var(--accent))";
          pin.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
        } else {
          pin.style.transform = "rotate(-45deg) scale(1)";
          pin.style.background = "hsl(var(--primary))";
          pin.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
        }
      }
    });

    if (hoveredVenueId && map.current) {
      const venue = venues.find((v) => v.id === hoveredVenueId);
      if (venue) {
        map.current.easeTo({
          center: venue.coordinates,
          duration: 500,
        });
      }
    }
  }, [hoveredVenueId, isMapReady]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg">
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};
