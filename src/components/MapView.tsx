
import React, { FC, useState, useEffect, memo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const googleMapsApiKey = "AIzaSyB8ZB_c0LNB15k5wASFdtF6E-xr4t4TOEc"; // ⚠️ Replace with your actual API key
const libraries = ['places']; // Include any necessary libraries

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem',
};

// Define the shape of the bus data
interface Bus {
  id: number;
  currentLocation: string;
  route: string;
  // Add other properties if needed
}

interface MapViewProps {
  selectedBus: Bus;
}

const defaultCenter = {
  lat: 9.9312,
  lng: 76.2673, // Default center, e.g., Kochi, Kerala, India
};

const MapView: FC<MapViewProps> = ({ selectedBus }) => {
  const [center, setCenter] = useState(defaultCenter);

  // This is a mock function to get coordinates from a location string.
  // In a real application, you'd use a Geocoding API or store coordinates in your bus data.
  const getCoordinatesForLocation = (location: string) => {
    switch (location) {
      case 'Near City Mall':
        return { lat: 9.9816, lng: 76.2999 };
      case 'Tech Park Junction':
        return { lat: 9.9918, lng: 76.3211 };
      case 'Railway Station':
        return { lat: 9.9753, lng: 76.2891 };
      default:
        return defaultCenter;
    }
  };

  useEffect(() => {
    if (selectedBus) {
      const newCenter = getCoordinatesForLocation(selectedBus.currentLocation);
      setCenter(newCenter);
    }
  }, [selectedBus]);

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={libraries as any}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(MapView);