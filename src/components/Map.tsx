import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MapProps {
  projects?: Array<{
    id: string;
    name: string;
    coordinates: [number, number];
    carbonUptake: number;
    area: number;
    status: string;
  }>;
}

const Map: React.FC<MapProps> = ({ projects = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        projection: 'globe' as any,
        zoom: 2,
        center: [0, 20],
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add markers for purchased projects
      projects.forEach((project) => {
        if (!map.current) return;
        
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.cssText = `
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
            <h3 class="font-semibold text-sm">${project.name}</h3>
            <p class="text-xs text-gray-600">Carbon Uptake: ${project.carbonUptake} tons CO₂</p>
            <p class="text-xs text-gray-600">Area: ${project.area} hectares</p>
            <p class="text-xs text-gray-600">Status: ${project.status}</p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(project.coordinates)
          .setPopup(popup)
          .addTo(map.current);
      });

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, projects]);

  if (!isMapInitialized) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-4">
          <h3 className="text-lg font-semibold text-center">Map Configuration</h3>
          <p className="text-sm text-muted-foreground text-center">
            Enter your Mapbox public token to view purchased land projects on the map.
          </p>
          <div className="space-y-2">
            <Label htmlFor="mapboxToken">Mapbox Public Token</Label>
            <Input
              id="mapboxToken"
              type="text"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGJidGtlb..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Get your token from{' '}
            <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
    </div>
  );
};

export default Map;