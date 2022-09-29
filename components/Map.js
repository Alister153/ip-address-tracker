import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useContext } from "react";
import { address } from "../pages/_app";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function Map() {
  const [location, setlocation] = useContext(address);
  const lat = location ? location.location.lat : 40.8054;
  const lng = location ? location.location.lng : -74.0241;

  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ width: "100%" }}
    >
      <ChangeView center={[lat, lng]} zoom={14} />
      <Marker position={[lat, lng]} draggable={true} animate={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Popup>Hey ! you found me</Popup>
      </Marker>
    </MapContainer>
  );
}
