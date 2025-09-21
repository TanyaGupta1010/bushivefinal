// src/components/MapView.tsx
import React, { FC, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Set default icon options for Leaflet
const DefaultIcon = L.icon({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Create custom icons
const fromIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const toIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Professional bus icon
const busIcon = new L.Icon({
    iconUrl: 'https://api.iconify.design/bi:bus-front-fill.svg?color=%23304159',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

interface MapViewProps {
    userLocation: { lat: number; lng: number; } | null;
    fromLocation: { lat: number; lng: number; } | null;
    toLocation: { lat: number; lng: number; } | null;
    selectedBus: any;
    fromLocationName: string | null;
    toLocationName: string | null;
    buses: any[];
}

const MapInitializer: React.FC<MapViewProps> = ({ userLocation, fromLocation, toLocation, selectedBus, fromLocationName, toLocationName, buses }) => {
    const map = useMap();
    const routeLayerRef = useRef<L.Layer | null>(null);

    useEffect(() => {
        const allMarkers = [userLocation, fromLocation, toLocation, ...buses.map(b => b.currentLocation)].filter(Boolean) as { lat: number; lng: number; }[];

        if (allMarkers.length > 0) {
            const bounds = L.latLngBounds(allMarkers.map(location => L.latLng(location.lat, location.lng)));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map, userLocation, fromLocation, toLocation, buses]);

    useEffect(() => {
        if (routeLayerRef.current) {
            map.removeLayer(routeLayerRef.current);
            routeLayerRef.current = null;
        }

        if (fromLocation && toLocation) {
            const fromLatLng = `${fromLocation.lng},${fromLocation.lat}`;
            const toLatLng = `${toLocation.lng},${toLocation.lat}`;
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${fromLatLng};${toLatLng}?overview=full&geometries=geojson`;

            axios.get(osrmUrl)
                .then(response => {
                    const route = response.data.routes[0];
                    if (route) {
                        const geojson = route.geometry;
                        const routeLayer = L.geoJSON(geojson, {
                            style: () => ({
                                color: '#4CAF50',
                                weight: 5,
                                opacity: 0.8
                            })
                        }).addTo(map);

                        routeLayerRef.current = routeLayer;
                    }
                })
                .catch(error => console.error("Error fetching OSRM route:", error));
        }
    }, [map, fromLocation, toLocation]);

    return (
        <>
            {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]} icon={new L.Icon.Default()}>
                    <Popup>You are here</Popup>
                </Marker>
            )}
            {fromLocation && (
                <Marker position={[fromLocation.lat, fromLocation.lng]} icon={fromIcon as L.Icon}>
                    <Popup>Start: {fromLocationName || 'Your nearest bus stop'}</Popup>
                </Marker>
            )}
            {toLocation && (
                <Marker position={[toLocation.lat, toLocation.lng]} icon={toIcon as L.Icon}>
                    <Popup>End: {toLocationName || 'Destination'}</Popup>
                </Marker>
            )}

            {buses.map(bus => (
                <Marker 
                    key={bus.id} 
                    position={[bus.currentLocation.lat, bus.currentLocation.lng]} 
                    icon={busIcon}
                >
                    <Popup>
                        <div>
                            <strong>Bus:</strong> {bus.busNumber} <br />
                            <strong>Route:</strong> {bus.route} <br />
                            <strong>ETA:</strong> {bus.eta} <br />
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

const MapView: FC<MapViewProps> = (props) => {
    const defaultCenter = [28.55, 77.30];
    const containerStyle = {
        width: '100%',
        height: '400px',
        borderRadius: '8px'
    };

    return (
        <MapContainer
            center={defaultCenter as L.LatLngTuple}
            zoom={14}
            scrollWheelZoom={true}
            style={containerStyle}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapInitializer {...props} />
        </MapContainer>
    );
};

export default MapView;