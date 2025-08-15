import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { FeatureCollection, Point } from 'geojson';

interface MapProps {
  projects?: Array<{
    id: string;
    name: string;
    coordinates: [number, number]; // [lng, lat]
    carbonUptake: number;
    area: number;
    status: string;
  }>;
}

const Map: React.FC<MapProps> = ({ projects = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken] = useState('pk.eyJ1IjoiaW1lbGRhYSIsImEiOiJjbWR4eTc3d2gyZ3FnMmtxMm5oZHRhZXZrIn0.begkUCZrspQjnqZKVDh6cA');

  useEffect(() => {
    if (!mapContainer.current || map.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    // Inisialisasi Map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [106.8272, -6.1751], // Jakarta
      zoom: 4,
      projection: 'mercator',
    });

    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');

    map.current.on('load', () => {
      projects.forEach((project) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.style.cssText = `
          background-color: #10b981;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm text-gray-600">${project.name}</h3>
            <p class="text-xs text-gray-600">Carbon Uptake: ${project.carbonUptake} tons CO₂</p>
            <p class="text-xs text-gray-600">Status: Paid </p>
          </div>
        `);

        new mapboxgl.Marker(markerElement)
          .setLngLat(project.coordinates)
          .setPopup(popup)
          .addTo(map.current!);

        // Circle Layer
        const circleId = `circle-${project.id}`;
        const radiusInMeters = 2000;

        const geojson: FeatureCollection<Point> = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: project.coordinates,
              },
              properties: {},
            },
          ],
        };

        if (!map.current.getSource(circleId)) {
          map.current.addSource(circleId, {
            type: 'geojson',
            data: geojson,
          });

          map.current.addLayer({
            id: circleId,
            type: 'circle',
            source: circleId,
            paint: {
              'circle-radius': {
                stops: [
                  [0, 0],
                  [20, radiusInMeters / 2],
                ],
                base: 2,
              },
              'circle-color': '#10b981',
              'circle-opacity': 0.2,
            },
          });
        }
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken, projects]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
    </div>
  );
};

export default Map;
