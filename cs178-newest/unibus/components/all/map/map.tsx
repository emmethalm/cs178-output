import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { routes } from './route_coords';  

const stops = [
  { stop_id: "5036", stop_code: "5036", stop_name: "1 Western Ave", stop_lat: 42.364114, stop_lon: -71.119075 },
  { stop_id: "58381", stop_code: "58381", stop_name: "784 Memorial Drive", stop_lat: 42.359703, stop_lon: -71.114945 },
  { stop_id: "63189", stop_code: "63189", stop_name: "Barry's Corner (Northbound)", stop_lat: 42.363958424, stop_lon: -71.127741708 },
  { stop_id: "63190", stop_code: "63190", stop_name: "Barry's Corner (Southbound)", stop_lat: 42.363936034, stop_lon: -71.127861727 },
  { stop_id: "132600", stop_code: "132600", stop_name: "Cambridge Common", stop_lat: 42.376994673, stop_lon: -71.122417866 },
  { stop_id: "5041", stop_code: "5041", stop_name: "Harvard Square (Northbound)", stop_lat: 42.372722, stop_lon: -71.119965 },
  { stop_id: "58344", stop_code: "58344", stop_name: "Harvard Square (Southbound)", stop_lat: 42.373378883, stop_lon: -71.119734232 },
  { stop_id: "5040", stop_code: "5040", stop_name: "Kennedy School (Northbound)", stop_lat: 42.371524, stop_lon: -71.120985 },
  { stop_id: "5054", stop_code: "5054", stop_name: "Kennedy School (Southbound)", stop_lat: 42.371203, stop_lon: -71.121339 },
  { stop_id: "5045", stop_code: "5045", stop_name: "Lamont Library", stop_lat: 42.37288, stop_lon: -71.115008 },
  { stop_id: "5042", stop_code: "5042", stop_name: "Law School (WCC)", stop_lat: 42.377977084, stop_lon: -71.119937392 },
  { stop_id: "6854", stop_code: "6854", stop_name: "Leverett House", stop_lat: 42.370083645, stop_lon: -71.116713434 },
  { stop_id: "5050", stop_code: "5050", stop_name: "Mass and Garden", stop_lat: 42.375187466, stop_lon: -71.119467061 },
  { stop_id: "5046", stop_code: "5046", stop_name: "Mather House", stop_lat: 42.368758709, stop_lon: -71.115333438 },
  { stop_id: "5043", stop_code: "5043", stop_name: "Maxwell Dworkin", stop_lat: 42.378933, stop_lon: -71.11663 },
  { stop_id: "5044", stop_code: "5044", stop_name: "Memorial Hall", stop_lat: 42.37645186, stop_lon: -71.114392997 },
  { stop_id: "5049", stop_code: "5049", stop_name: "Quad", stop_lat: 42.381867, stop_lon: -71.125325 },
  { stop_id: "23509", stop_code: "23509", stop_name: "Radcliffe Yard", stop_lat: 42.3765, stop_lon: -71.12212 },
  { stop_id: "6248", stop_code: "6248", stop_name: "Science Center", stop_lat: 42.376901687, stop_lon: -71.115974486 },
  { stop_id: "58343", stop_code: "58343", stop_name: "SEC", stop_lat: 42.363328644, stop_lon: -71.125392617 },
  { stop_id: "154627", stop_code: "154627", stop_name: "Sever Gate", stop_lat: 42.374634042, stop_lon: -71.114510008 },
  { stop_id: "5039", stop_code: "5039", stop_name: "Stadium (Northbound)", stop_lat: 42.367121429, stop_lon: -71.124887448 },
  { stop_id: "23930", stop_code: "23930", stop_name: "Stadium (Southbound)", stop_lat: 42.367024629, stop_lon: -71.125015193 },
  { stop_id: "5047", stop_code: "5047", stop_name: "The Inn", stop_lat: 42.372127, stop_lon: -71.115427 },
  { stop_id: "5048", stop_code: "5048", stop_name: "Widener Gate", stop_lat: 42.372843815, stop_lon: -71.116972399 },
  { stop_id: "5051", stop_code: "5051", stop_name: "Winthrop House", stop_lat: 42.371468397, stop_lon: -71.117267311 }
];

const MapComponent = () => {
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    }, (error) => {
      console.error("Error obtaining geolocation", error);
    });
  }, []);

  if (!position[0] && !position[1]) {
    return null;
  }

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution='Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
      />
      <CircleMarker center={position} radius={5} fillColor="red" color="red" weight={1}>
        <Popup>
          You are here!
        </Popup>
      </CircleMarker>
      {routes.map(route => (
        <Polyline key={route.id} positions={route.path} color={route.color} />
      ))}
      {stops.map((stop, index) => (
        <CircleMarker key={index} center={[stop.stop_lat, stop.stop_lon]} radius={5} fillColor="blue" color="blue" weight={1}>
          <Popup>{stop.stop_name}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;